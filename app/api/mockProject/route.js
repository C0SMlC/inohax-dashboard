// app/api/projects/route.js
import { NextResponse } from "next/server";

const projectDomains = [
  "Web Development",
  "Mobile App",
  "Machine Learning",
  "Blockchain",
  "IoT",
  "Cloud Computing",
  "DevOps",
  "Data Analytics",
];

const teamNames = [
  "Alpha Squad",
  "Beta Builders",
  "Code Ninjas",
  "Delta Force",
  "Echo Team",
  "Future Forge",
  "Galaxy Coders",
  "Hack Masters",
  "Innovation Hub",
  "Jupyter Kings",
];

const generateMockData = () => {
  const mockProjects = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    teamName: teamNames[Math.floor(Math.random() * teamNames.length)],
    teamLeaderName: `John Doe ${index + 1}`,
    teamLeaderEmail: `leader${index + 1}@example.com`,
    teamLeaderPhone: `+1 (555) ${String(
      Math.floor(Math.random() * 900) + 100
    )}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    projectDomain:
      projectDomains[Math.floor(Math.random() * projectDomains.length)],
    projectTitle: `Project ${String.fromCharCode(65 + index)} Initiative`,
    postTitle: `Innovative Solution for ${String.fromCharCode(
      65 + index
    )} Problem`,
    postDescription: `This is a detailed description of Project ${String.fromCharCode(
      65 + index
    )}. 
    Our team is working on solving complex problems in the domain of ${
      projectDomains[Math.floor(Math.random() * projectDomains.length)]
    }.
    
    Key Features:
    - Feature 1: Advanced implementation of core functionality
    - Feature 2: Integration with cutting-edge technologies
    - Feature 3: Scalable and maintainable architecture
    
    Current Progress:
    We have completed 75% of the planned milestones and are on track for delivery.`,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${index}`,
  }));

  return mockProjects;
};

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    const mockProjects = generateMockData();
    return NextResponse.json({ projects: mockProjects });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
