import { NextResponse } from "next/server";
import { getProjects } from "../../lib/projectActions";
import { query } from "../../../utils/hasura";
import { getTypeSpecificQuery } from "./query/query";

const normalizeUrl = (url) => {
  if (!url) return "";
  return url.trim().replace(/\s+/g, "").toLowerCase();
};

export async function GET() {
  try {
    let { projectIds, mongoProjects } = await getProjects();

    // Create MongoDB data map
    const mongoProjectMap = new Map(
      mongoProjects.map((project) => [
        normalizeUrl(project.projectLink),
        {
          teamName: project.teamName || "",
          teamLeaderName: project.teamLeaderName || "",
          projectDomain: project.projectDomain || "",
          teamLeaderEmail: project.teamLeaderEmail || "",
          teamLeaderPhone: project.teamLeaderPhone || "",
          teamMembers: Array.isArray(project.teamMembers)
            ? project.teamMembers
            : [],
        },
      ])
    );

    // Filter valid projects and group by type
    const validProjects = projectIds.filter(
      (project) =>
        project?.id && (project.type === "idea" || project.type === "post")
    );

    // Group by type while preserving all valid URLs
    const groupedProjects = validProjects.reduce((acc, project) => {
      const type = project.type === "idea" ? "idea" : "post";
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push({
        id: parseInt(project.id),
        originalUrl: project.originalUrl,
      });
      return acc;
    }, {});

    // Fetch and merge data for each type
    const results = await Promise.all(
      Object.entries(groupedProjects).map(async ([type, projects]) => {
        const queryString = getTypeSpecificQuery(type);
        const cleanedIds = projects.map((p) => p.id).filter(Boolean);

        // Execute GraphQL query
        const data = await query(queryString, { ids: cleanedIds });

        // Extract items ensuring we check both possible data paths
        const items =
          data.result?.data?.[type === "post" ? "project" : "idea"] ||
          data.data?.[type === "post" ? "project" : "idea"] ||
          [];

        // Merge with MongoDB data
        const mergedItems = items.map((item) => {
          const projectInfo = projects.find((p) => p.id === item.id);
          const normalizedOriginalUrl = normalizeUrl(projectInfo?.originalUrl);
          const mongoData = mongoProjectMap.get(normalizedOriginalUrl);

          console.log(`Processing item ID ${item.id}:`, {
            hasMongoData: !!mongoData,
            originalUrl: projectInfo?.originalUrl,
            normalizedUrl: normalizedOriginalUrl,
          });

          return {
            ...item,
            ...(mongoData || {}),
            type, // Add type to help with frontend rendering
          };
        });

        return {
          type,
          items: mergedItems.filter((item) => item.teamName), // Only return items with team data
        };
      })
    );

    // Filter out empty result sets
    const filteredResults = results.filter((result) => result.items.length > 0);

    return NextResponse.json({
      success: true,
      data: filteredResults,
    });
  } catch (error) {
    console.error("Error in project details API:", error);
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
