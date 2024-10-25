// utils/mockDataGenerator.js
const projectTypes = [
  "Mobile Application",
  "Web Platform",
  "Enterprise Software",
  "Data Analytics Dashboard",
  "AI/ML Solution",
  "IoT System",
  "Blockchain Platform",
  "Cloud Infrastructure",
  "Security Solution",
  "E-commerce Platform",
];

const technologies = [
  "React",
  "Node.js",
  "Python",
  "TensorFlow",
  "AWS",
  "Docker",
  "Kubernetes",
  "MongoDB",
  "PostgreSQL",
  "GraphQL",
];

const companies = [
  "TechCorp",
  "InnovateSoft",
  "DataFlow",
  "CloudScale",
  "DevForge",
  "ByteWorks",
  "NetPrime",
  "CodeCraft",
  "SystemsPlus",
  "AppSphere",
];

const generateProjectDescription = (index, domain, tech) => `
Project Overview:
${
  companies[Math.floor(Math.random() * companies.length)]
} is developing a cutting-edge ${domain} solution 
using ${tech} technology. This initiative aims to revolutionize how businesses handle their operations.

Key Objectives:
• Implement scalable architecture for handling large-scale data
• Develop intuitive user interfaces for improved user experience
• Integrate with existing enterprise systems
• Ensure robust security measures

Technical Stack:
- Frontend: ${technologies[Math.floor(Math.random() * technologies.length)]}
- Backend: ${technologies[Math.floor(Math.random() * technologies.length)]}
- Database: ${technologies[Math.floor(Math.random() * technologies.length)]}
- DevOps: ${technologies[Math.floor(Math.random() * technologies.length)]}

Current Status:
Phase ${Math.floor(Math.random() * 3) + 1} of development
Progress: ${Math.floor(Math.random() * 30) + 70}% complete
`;

const firstNames = [
  "James",
  "Emma",
  "Michael",
  "Sophia",
  "William",
  "Olivia",
  "Alexander",
  "Isabella",
  "Daniel",
  "Ava",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
];

export const generateDetailedMockData = (count = 12) => {
  return Array.from({ length: count }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const projectType =
      projectTypes[Math.floor(Math.random() * projectTypes.length)];
    const mainTech =
      technologies[Math.floor(Math.random() * technologies.length)];

    return {
      id: index + 1,
      teamName: `Team ${String.fromCharCode(65 + index)}`,
      teamLeaderName: `${firstName} ${lastName}`,
      teamLeaderEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${companies[
        Math.floor(Math.random() * companies.length)
      ].toLowerCase()}.com`,
      teamLeaderPhone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${
        Math.floor(Math.random() * 900) + 100
      }-${Math.floor(Math.random() * 9000) + 1000}`,
      projectDomain: projectType,
      projectTitle: `${mainTech} ${projectType} Development`,
      postTitle: `Innovative ${projectType} Solution using ${mainTech}`,
      postDescription: generateProjectDescription(index, projectType, mainTech),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}${lastName}`,
      startDate: new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      targetCompletion: new Date(
        2024,
        Math.floor(Math.random() * 12) + 6,
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      teamSize: Math.floor(Math.random() * 8) + 3,
      budget: `$${Math.floor(Math.random() * 900) + 100}k`,
      priority: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
      status: ["Planning", "In Progress", "Testing", "Review", "Completed"][
        Math.floor(Math.random() * 5)
      ],
    };
  });
};
