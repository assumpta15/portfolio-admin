import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function SidebarLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="flex-1 p-6">
        {/* Mobile Top Bar */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded bg-black text-white"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* 🔑 CONTENT WRAPPER (THIS FIXES EVERYTHING) */}
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
