"use client";

export default function ProjectModal({ project, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                {project.avatar ? (
                  <img
                    src={project.avatar}
                    alt={project.teamName}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-blue-600">
                    {project.teamName.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {project.teamName}
                </h2>
                <p className="text-gray-500">{project.projectDomain}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 text-lg font-semibold mb-2">
                Team Leader
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800 font-medium">
                  {project.teamLeaderName}
                </p>
                <p className="text-gray-600">{project.teamLeaderEmail}</p>
                <p className="text-gray-600">{project.teamLeaderPhone}</p>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 text-lg font-semibold mb-2">
                Team Member Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800 font-medium">
                  {project.teamLeaderName}
                </p>
                <p className="text-gray-600">{project.teamLeaderEmail}</p>
                <p className="text-gray-600">{project.teamLeaderPhone}</p>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 text-lg font-semibold mb-2">
                Project Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-gray-800 font-medium mb-2">
                  {project.title}
                </h4>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
