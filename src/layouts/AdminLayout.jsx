import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        <nav className="space-y-4">
          <Link to="/dashboard" className="block hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/projects" className="block hover:text-gray-300">
            Projects
          </Link>
          <Link to="/add-project" className="block hover:text-gray-300">
            Add Project
          </Link>
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
