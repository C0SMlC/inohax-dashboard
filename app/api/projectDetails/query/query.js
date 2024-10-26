// /app/api/projects/query/query.js
const getIdeaQuery = `
  query getIdeasQuery($ids: [Int!]) {
    idea(where: { id: { _in: $ids } }) {
      id
      title
      description
    }
  }
`;

const getPostQuery = `
  query getPostsQuery($ids: [Int!]) {
    project(where: { id: { _in: $ids } }) {
      id
      title
      description
    }
  }
`;

// Function to get the appropriate query based on type
const getTypeSpecificQuery = (type) => {
  return type === "idea" ? getIdeaQuery : getPostQuery; // Default to idea query if type not found
};

export { getTypeSpecificQuery };
