"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModel";

export default function ProjectGrid() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const response = await fetch("/api/mockProject");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data.projects);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}