



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ CONTROLLED STATE (IMPORTANT)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH PROJECT
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        const project = res.data.data;

        setFormData({
          title: project.title || "",
          description: project.description || "",
          techStack: project.techStack?.join(", ") || "",
          liveUrl: project.liveUrl || "",
          githubUrl: project.githubUrl || "",
          featured: project.featured || false,
          image: project.image || "",
        });

        setLoading(false);
      } catch (error) {
        toast.error("Failed to load project", error);
        navigate("/projects");
      }
    };

    fetchProject();
  }, [id, navigate]);

  // ✅ HANDLE INPUTS
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append(
        "techStack",
        JSON.stringify(
          formData.techStack
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        )
      );
      data.append("liveUrl", formData.liveUrl);
      data.append("githubUrl", formData.githubUrl);
      data.append("featured", formData.featured);

      // ✅ ONLY SEND IMAGE IF USER SELECTS ONE
      if (imageFile) {
        data.append("image", imageFile);
      }

      await api.put(`/projects/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Project updated successfully");
      navigate("/projects");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  if (loading) return null;

  return (
    <div className="max-w-3xl bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input"
          rows="4"
          required
        />

        {/* ✅ CURRENT IMAGE PREVIEW */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Current"
            className="h-32 rounded"
          />
        )}

        {/* ✅ OPTIONAL NEW IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <input
          name="techStack"
          value={formData.techStack}
          onChange={handleChange}
          className="input"
        />

        <input
          name="liveUrl"
          value={formData.liveUrl}
          onChange={handleChange}
          className="input"
        />

        <input
          name="githubUrl"
          value={formData.githubUrl}
          onChange={handleChange}
          className="input"
        />

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured project
        </label>

        <button className="px-6 py-3 bg-black text-white rounded-lg">
          Update Project
        </button>
      </form>
    </div>
  );
}
