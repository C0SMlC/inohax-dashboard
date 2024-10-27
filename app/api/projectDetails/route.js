import { NextResponse } from "next/server";
import { getProjects } from "../../lib/projectActions";
import { query } from "../../../utils/hasura";
import { getTypeSpecificQuery } from "./query/query";

// Helper function to normalize URLs for consistent comparison
const normalizeUrl = (url) => {
  if (!url) return "";
  return url.trim().replace(/\s+/g, "").toLowerCase();
};

export async function GET() {
  try {
    let { projectIds, mongoProjects } = await getProjects();

    console.log(
      "Full MongoDB projects data:",
      mongoProjects.map((p) => ({
        projectLink: p.projectLink,
        teamMembers: p.teamMembers,
        teamName: p.teamName,
      }))
    );

    // Create a map of normalized project URLs to MongoDB data
    const mongoProjectMap = new Map(
      mongoProjects.map((project) => {
        // First, verify we have all the data
        console.log("Processing MongoDB project:", {
          projectLink: project.projectLink,
          teamMembersCount: Array.isArray(project.teamMembers)
            ? project.teamMembers.length
            : 0,
          teamMembers: project.teamMembers,
        });

        const normalizedUrl = normalizeUrl(project.projectLink);

        // Create the data object with all fields, including team members
        const projectData = {
          teamName: project.teamName || "",
          teamLeaderName: project.teamLeaderName || "",
          projectDomain: project.projectDomain || "",
          teamLeaderEmail: project.teamLeaderEmail || "",
          teamLeaderPhone: project.teamLeaderPhone || "",
          teamMembers: Array.isArray(project.teamMembers)
            ? project.teamMembers
            : [],
        };

        console.log("Mapped data for URL", normalizedUrl, ":", {
          ...projectData,
          teamMembersCount: projectData.teamMembers.length,
        });

        return [normalizedUrl, projectData];
      })
    );

    // Filter and group projects
    const validProjects = projectIds.filter(
      (project) =>
        project?.id && (project.type === "idea" || project.type === "post")
    );

    const groupedProjects = validProjects.reduce((acc, project) => {
      if (!acc[project.type]) {
        acc[project.type] = [];
      }
      acc[project.type].push({
        id: parseInt(project.id),
        originalUrl: project.originalUrl,
      });
      return acc;
    }, {});

    // Fetch and merge data
    const results = await Promise.all(
      Object.entries(groupedProjects).map(async ([type, projects]) => {
        const queryString = getTypeSpecificQuery(type);
        const cleanedIds = projects.map((p) => p.id).filter(Boolean);

        const data = await query(queryString, { ids: cleanedIds });
        const items =
          data.result?.data?.[type === "post" ? "project" : "idea"] ||
          data.data?.[type === "post" ? "project" : "idea"] ||
          [];

        // Merge with MongoDB data
        const mergedItems = items.map((item) => {
          const projectInfo = projects.find((p) => p.id === item.id);
          const normalizedOriginalUrl = normalizeUrl(projectInfo?.originalUrl);

          console.log("URL matching attempt:", {
            id: item.id,
            originalUrl: projectInfo?.originalUrl,
            normalizedUrl: normalizedOriginalUrl,
            availableUrls: [...mongoProjectMap.keys()],
          });

          const mongoData = mongoProjectMap.get(normalizedOriginalUrl);

          if (mongoData) {
            console.log(`Found matching MongoDB data for ID ${item.id}:`, {
              teamName: mongoData.teamName,
              teamMembersCount: mongoData.teamMembers.length,
              teamMembers: mongoData.teamMembers,
            });
          } else {
            console.log(`No MongoDB data found for ID ${item.id}`);
          }

          const mergedItem = {
            ...item,
            ...(mongoData || {}),
          };

          // Verify the merged data
          console.log("Final merged result for ID", item.id, ":", {
            teamName: mergedItem.teamName,
            teamMembersCount: Array.isArray(mergedItem.teamMembers)
              ? mergedItem.teamMembers.length
              : 0,
            hasTeamMembers: Boolean(mergedItem.teamMembers?.length),
          });

          return mergedItem;
        });

        return {
          type,
          items: mergedItems,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: results,
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
