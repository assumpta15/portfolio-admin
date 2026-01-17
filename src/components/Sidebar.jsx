import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  PlusCircle,
  LogOut,
  Menu,
  X,
   MessageCircle,
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

import api from "../utils/api";


export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
const { theme, toggleTheme } = useContext(ThemeContext);


const [unread, setUnread] = useState(0);

useEffect(() => {
  api.get("/admin/messages/unread-count")
    .then(res => setUnread(res.data.count))
    .catch(err => console.log(err));
}, []);


  const linkBase =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition";

  const linkStyle = ({ isActive }) =>
    `${linkBase} ${
      isActive
        ? "bg-gray-800 text-white"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50 top-0 left-0
          bg-black text-white min-h-screen p-4
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          {!collapsed && (
            <h1 className="text-xl font-bold">Admin Panel</h1>
          )}

          <div className="flex items-center gap-2">
            {/* Collapse (desktop) */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block p-2 rounded hover:bg-gray-800"
            >
              <Menu size={20} />
            </button>

            {/* Close (mobile) */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-2 rounded hover:bg-gray-800"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" onClick={() => setMobileOpen(false)} className={linkStyle}>
            <LayoutDashboard size={20} />
            {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink to="/projects" onClick={() => setMobileOpen(false)} className={linkStyle}>
            <Folder size={20} />
            {!collapsed && "Projects"}
          </NavLink>

          <NavLink to="/add-project" onClick={() => setMobileOpen(false)} className={linkStyle}>
            <PlusCircle size={20} />
            {!collapsed && "Add Project"}
          </NavLink>

{/* 
          <NavLink to="/messages" onClick={() => setMobileOpen(false)} className={linkStyle}>
          <MessageCircle size={20} />
   {!collapsed && "Messages"}
</NavLink> */}

<NavLink
  to="/messages"
  onClick={() => setMobileOpen(false)}
  className={({ isActive }) =>
    `flex items-center justify-between px-4 py-3 rounded-lg transition
     ${
       isActive
         ? "bg-gray-800 text-white"
         : "text-gray-400 hover:bg-gray-800 hover:text-white"
     }`
  }
>
  <div className="flex items-center gap-3">
    <MessageCircle size={20} />
    {!collapsed && "Messages"}
  </div>

  {!collapsed && unread > 0 && (
    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
      {unread}
    </span>
  )}
</NavLink>


        </nav>


<button
  onClick={toggleTheme}
  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800"
>
  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
  {!collapsed && (theme === "dark" ? "Light Mode" : "Dark Mode")}
</button>

        {/* Spacer */}
        <div className="flex-1 mt-6" />

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-3 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-lg mt-6 transition"
        >
          <LogOut size={20} />
          {!collapsed && "Logout"}
        </button>
      </aside>
    </>
  );
}
