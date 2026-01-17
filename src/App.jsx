import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";

import SidebarLayout from "./components/SidebarLayout";
import { Toaster } from "react-hot-toast";

import AdminMessages from "./pages/AdminMessages";




function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />

        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/projects" element={<PublicProjects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} /> */}

          {/* ADMIN / PRIVATE */}
          <Route
            element={
              <PrivateRoute>
                <SidebarLayout />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/projects" element={<Projects />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/edit-project/:id" element={<EditProject />} />



<Route path="/projects" element={<Projects />} />
<Route path="/edit-project/:id" element={<EditProject />} />

<Route path="/messages" element={<AdminMessages />} />

          </Route>

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
