export default function ProjectCard({ project, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {project.teamName.charAt(0)}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {project.teamName}
            </h2>
          </div>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              project.type === "idea"
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {project.type.toUpperCase()}
          </span>
        </div>
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">Project Title</p>
          <p className="text-gray-900">{project.title}</p>
        </div>
      </div>
    </div>
  );
}
