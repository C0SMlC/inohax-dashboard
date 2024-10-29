// projectActions.js
import connectToDatabase from "./db";
import Project from "./dataModel";

export async function getProjects() {
  try {
    await connectToDatabase();

    // Get all projects from MongoDB
    const projectsInfo = await Project.find({}).exec();

    // Keep the original MongoDB documents for later use
    const mongoProjects = projectsInfo;

    console.log("Data from mongo: ", projectsInfo);

    const projectIds = projectsInfo
      .map((project) => {
        if (!project.projectLink) return null;

        try {
          const url = new URL(project.projectLink.trim());
          const id = url.searchParams.get("id");

          const pathSegments = url.pathname.split("/");
          const type = pathSegments[pathSegments.length - 1];

          return {
            id,
            type,
            originalUrl: project.projectLink.trim(), // Store the original URL for later lookup
          };
        } catch {
          console.error(`Invalid URL: ${project.projectLink}`);
          return null;
        }
      })
      .filter((id) => id !== null);

    return { projectIds, mongoProjects };
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}
