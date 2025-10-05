import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <aside className="hidden lg:block w-64 bg-gray-700 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-3">
          {/* <li><Link to="/admin/dashboard" className="hover:underline">Dashboard</Link></li> */}
          <li>
            <Link to="/admin/products" className="hover:underline">
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/categories" className="hover:underline">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="hover:underline">
              Orders
            </Link>
          </li>
        </ul>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 w-full bg-gray-700 text-white flex items-center justify-between px-4 py-3 shadow-md z-20">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button onClick={() => setOpen(!open)} className="focus:outline-none">
          {open ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {open && (
        <aside className="fixed top-0 left-0 w-64 bg-gray-700 text-white h-full p-4 z-30 transform animate-slide-in">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <ul className="space-y-3">
            <li>
              <Link to="/admin/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/products" onClick={() => setOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/admin/categories" onClick={() => setOpen(false)}>
                Categories
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" onClick={() => setOpen(false)}>
                Orders
              </Link>
            </li>
          </ul>
        </aside>
      )}

      <main className="flex-grow p-4 mt-12 lg:mt-0">
        <Outlet />
      </main>

      <style>{`
  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }
`}</style>
    </div>
  );
}

export default AdminLayout;
