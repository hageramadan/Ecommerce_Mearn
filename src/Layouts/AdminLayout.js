import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  CubeIcon,
  Squares2X2Icon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Dashboard from "../Pages/Admin/Dashboard"; 

function AdminLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "dashboard", icon: <HomeIcon className="w-5 h-5 mr-2" /> },
    { name: "Products", path: "products", icon: <CubeIcon className="w-5 h-5 mr-2" /> },
    { name: "Categories", path: "categories", icon: <Squares2X2Icon className="w-5 h-5 mr-2" /> },
    { name: "Orders", path: "orders", icon: <ClipboardDocumentListIcon className="w-5 h-5 mr-2" /> },
  ];



  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-800 text-white min-h-screen p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2 rounded hover:bg-gray-700 ${
                  location.pathname.includes(item.path) ? "bg-gray-700" : ""
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile navbar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-gray-800 text-white flex items-center justify-between px-4 py-3 shadow-md z-20">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button onClick={() => setOpen(!open)} className="focus:outline-none">
          {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      {open && (
        <aside className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-full p-6 z-30 transform animate-slide-in shadow-lg">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-4 py-2 rounded hover:bg-gray-700 ${
                    location.pathname.includes(item.path) ? "bg-gray-700" : ""
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Main content */}
      <main className="flex-grow mt-16 lg:mt-0">
        {/* Navbar فوق المحتوى */}
        <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {location.pathname === "/admin" || location.pathname.includes("dashboard")
              ? "Dashboard"
              : navItems.find((item) => location.pathname.includes(item.path))?.name}
          </h1>
          <div className="flex items-center space-x-3">
            <span className="hidden sm:block text-gray-600">Admin</span>
            <UserCircleIcon className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        {/* Content area */}
        <div className="p-6">
          {/* لو الرابط /admin نعرض Dashboard */}
          {location.pathname === "/admin" || location.pathname.includes("dashboard") ? (
            <Dashboard />
          ) : (
            <Outlet />
          )}
        </div>
      </main>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default AdminLayout;
