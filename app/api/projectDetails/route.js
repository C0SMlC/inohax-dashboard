// route.js
import { NextResponse } from "next/server";
import { getProjects } from "../../lib/projectActions";
import { query } from "../../../utils/hasura";
import { getTypeSpecificQuery } from "./query/query";

export async function GET() {
  try {
    // Get projects with MongoDB data
    let { projectIds, mongoProjects } = await getProjects();
    console.log("Project Details:", projectIds);
    console.log("MongoDB Projects:", mongoProjects);

    // Create a map of project URLs to MongoDB data for easy lookup
    const mongoProjectMap = new Map(
      mongoProjects.map((project) => [
        project.projectLink.trim(),
        {
          teamName: project.teamName,
          teamLeaderName: project.teamLeaderName,
          projectDomain: project.projectDomain,
        },
      ])
    );

    // Filter out unwanted types and null IDs
    const validProjects = projectIds.filter(
      (project) =>
        project &&
        project.id &&
        (project.type === "idea" || project.type === "post")
    );

    // Group projects by type
    const groupedProjects = {};
    validProjects.forEach((project) => {
      if (!groupedProjects[project.type]) {
        groupedProjects[project.type] = [];
      }
      groupedProjects[project.type].push({
        id: parseInt(project.id),
        originalUrl: project.originalUrl, // We'll need this to look up MongoDB data
      });
    });

    console.log("Grouped Projects:", groupedProjects);

    // Fetch data for each type and merge with MongoDB data
    const results = await Promise.all(
      Object.entries(groupedProjects).map(async ([type, projects]) => {
        const queryString = getTypeSpecificQuery(type);
        const cleanedIds = projects.map((p) => p.id).filter((id) => id);

        console.log(`Fetching ${type} with ids:`, cleanedIds);

        const data = await query(queryString, { ids: cleanedIds });
        console.log(`${type} response:`, data);

        // Extract the correct data based on type
        let items;
        if (data.result?.data) {
          items =
            type === "post" ? data.result.data.project : data.result.data.idea;
        } else {
          items = type === "post" ? data.data.project : data.data.idea;
        }

        // Merge Hasura data with MongoDB data
        const mergedItems =
          items?.map((item) => {
            // Find the original URL for this item
            const projectInfo = projects.find((p) => p.id === item.id);
            const mongoData = projectInfo
              ? mongoProjectMap.get(projectInfo.originalUrl)
              : null;

            return {
              ...item,
              ...(mongoData || {}), // Merge MongoDB data if available
            };
          }) || [];

        return {
          type,
          items: mergedItems,
        };
      })
    );

    console.log("Final results:", results);

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
