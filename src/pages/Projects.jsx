import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/api/projects");
        setProjects(res.data.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-500">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>

        <button
          onClick={() => navigate("/add-project")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No projects found
        </p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-3">Title</th>
              <th>Image</th>
              <th>Status</th>
              <th>Featured</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Title */}
                <td className="py-4 font-medium">
                  {project.title}
                </td>

                {/* Image */}
                <td>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-10 w-10 rounded object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No image
                    </span>
                  )}
                </td>

                {/* Status */}
                <td className="capitalize">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      project.status === "live"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>

                {/* Featured */}
                <td>
                  {project.featured ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Featured
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                      No
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="text-right space-x-4">
                  <button
                    onClick={() =>
                      navigate(`/edit-project/${project._id}`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
