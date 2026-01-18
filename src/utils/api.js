


// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("adminToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;



// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Attach token automatically
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }


  
//   return req;
// });

// export default API;










// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Attach token automatically
// API.interceptors.request.use(
//   (req) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       req.headers.Authorization = `Bearer ${token}`;
//     }

//     return req;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default API;



import axios from "axios";



const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});



/* 🔐 Attach token to every request */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken"); // 👈 EXACT KEY
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

