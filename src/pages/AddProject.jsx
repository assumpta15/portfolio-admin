// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";

// export default function AddProject() {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [featured, setFeatured] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [image, setImage] = useState(null);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await api.post("/projects", {
//         title,
//         description,
//         featured,
//       });

//       navigate("/projects");
//     } catch (err) {
//       console.error("Add project failed", err);
//       alert("Failed to add project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Add Project</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow max-w-xl"
//       >
//         <input
//           type="text"
//           placeholder="Project title"
//           className="w-full p-3 mb-4 border rounded"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

// <input
//   type="file"
//   accept="image/*"
//   onChange={(e) => setImage(e.target.files[0])}
// />

//         <textarea
//           placeholder="Project description"
//           className="w-full p-3 mb-4 border rounded"
//           rows="4"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />

//         <label className="flex items-center gap-2 mb-6">
//           <input
//             type="checkbox"
//             checked={featured}
//             onChange={(e) => setFeatured(e.target.checked)}
//           />
//           Featured
//         </label>

//         <button
//           disabled={loading}
//           className="bg-black text-white px-6 py-3 rounded"
//         >
//           {loading ? "Saving..." : "Save"}
//         </button>
//       </form>
//     </div>
//   );
// }







// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// export default function AddProject() {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [featured, setFeatured] = useState(false);
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("featured", featured);
//     if (image) formData.append("image", image);

//     await api.post("/projects", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     navigate("/projects");
//   } catch (err) {
//     console.error(err);
//     alert("Failed to add project");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Add Project</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow max-w-xl"
//       >
//         <input
//           type="text"
//           placeholder="Project title"
//           className="w-full p-3 mb-4 border rounded"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         {/* IMAGE INPUT */}
//         <input
//           type="file"
//           accept="image/*"
//           className="w-full mb-4"
//           onChange={(e) => setImage(e.target.files[0])}
//         />

//         <textarea
//           placeholder="Project description"
//           className="w-full p-3 mb-4 border rounded"
//           rows="4"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />

//         <label className="flex items-center gap-2 mb-6">
//           <input
//             type="checkbox"
//             checked={featured}
//             onChange={(e) => setFeatured(e.target.checked)}
//           />
//           Featured
//         </label>

//         <button
//           disabled={loading}
//           className="bg-black text-white px-6 py-3 rounded disabled:opacity-50"
//         >
//           {loading ? "Saving..." : "Save"}
//         </button>
//       </form>
//     </div>
//   );
// }




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// export default function AddProject() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: "",
//     techStack: "",
//     liveUrl: "",
//     githubUrl: "",
//     featured: false,
//     status: "live",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         ...formData,
//         techStack: formData.techStack
//           .split(",")
//           .map((tech) => tech.trim())
//           .filter(Boolean),
//       };

//       await api.post("/projects", payload);

//       toast.success("Project added successfully");
//       navigate("/projects");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add project");
//     }
//   };

//   return (
//     <div className="max-w-3xl bg-white p-8 rounded-xl shadow">
//       <h1 className="text-2xl font-bold mb-6">Add Project</h1>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <input
//           type="text"
//           name="title"
//           placeholder="Project title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           className="input"
//         />

//         <textarea
//           name="description"
//           placeholder="Project description"
//           value={formData.description}
//           onChange={handleChange}
//           rows="4"
//           required
//           className="input"
//         />

//         {/* <input
//           type="text"
//           name="image"
//           placeholder="Image URL"
//           value={formData.image}
//           onChange={handleChange}
//           required
//           className="input"
//         /> */}

//         <input
//   type="file"
//   accept="image/*"
//   onChange={(e) => setImage(e.target.files[0])}
// />


//         <input
//           type="text"
//           name="techStack"
//           placeholder="Tech stack (comma separated)"
//           value={formData.techStack}
//           onChange={handleChange}
//           className="input"
//         />

//         <input
//           type="text"
//           name="liveUrl"
//           placeholder="Live site URL"
//           value={formData.liveUrl}
//           onChange={handleChange}
//           className="input"
//         />

//         <input
//           type="text"
//           name="githubUrl"
//           placeholder="GitHub repo URL"
//           value={formData.githubUrl}
//           onChange={handleChange}
//           className="input"
//         />

//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="featured"
//             checked={formData.featured}
//             onChange={handleChange}
//           />
//           <label>Featured project</label>
//         </div>

//         <button
//           type="submit"
//           className="px-6 py-3 bg-black text-white rounded-lg"
//         >
//           Save Project
//         </button>
//       </form>
//     </div>
//   );
// }







import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function AddProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });

  const [imageFile, setImageFile] = useState(null); // ✅ correct

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

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

      // ✅ FIXED HERE
      if (imageFile) {
        data.append("image", imageFile);
      }

      await api.post("/projects", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Project added successfully");
      navigate("/projects");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add project");
    }
  };

  return (
    <div className="max-w-3xl bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Add Project</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="input"
          placeholder="Project title"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="input"
          placeholder="Project description"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />

        <input
          name="techStack"
          value={formData.techStack}
          onChange={handleChange}
          className="input"
          placeholder="Tech stack (comma separated)"
        />

        <input
          name="liveUrl"
          value={formData.liveUrl}
          onChange={handleChange}
          className="input"
          placeholder="Live URL"
        />

        <input
          name="githubUrl"
          value={formData.githubUrl}
          onChange={handleChange}
          className="input"
          placeholder="GitHub URL"
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
          Save Project
        </button>
      </form>
    </div>
  );
}
