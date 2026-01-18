// export default function Dashboard() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow">
//           <p className="text-gray-500">Total Projects</p>
//           <h2 className="text-3xl font-bold">0</h2>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow">
//           <p className="text-gray-500">Featured Projects</p>
//           <h2 className="text-3xl font-bold">0</h2>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow">
//           <p className="text-gray-500">Status</p>
//           <h2 className="text-2xl font-bold text-green-600">Live</h2>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Dashboard() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await api.get("/api/projects");
        const projects = res.data.data || [];

        setTotalProjects(projects.length);
        setFeaturedProjects(
          projects.filter((p) => p.featured).length
        );
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="text-gray-400 py-20 text-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* TOTAL PROJECTS */}
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-500 mb-2">Total Projects</p>
          <h2 className="text-4xl font-bold">
            {totalProjects}
          </h2>
        </div>

        {/* FEATURED PROJECTS */}
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-500 mb-2">Featured Projects</p>
          <h2 className="text-4xl font-bold">
            {featuredProjects}
          </h2>
        </div>

        {/* STATUS */}
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-500 mb-2">Status</p>
          <h2 className="text-3xl font-bold text-green-600">
            Live
          </h2>
        </div>
      </div>
    </div>
  );
}
