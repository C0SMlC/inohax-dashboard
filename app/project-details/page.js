import ProjectGrid from "@/components/ProjectGrid";
import Loading from "../loading";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Project Teams</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<Loading />}>
          <ProjectGrid />
        </Suspense>
      </main>
    </div>
  );
}
