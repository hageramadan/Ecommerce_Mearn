import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex">
      {/* Sidebar بسيط للادمن */}
      <aside className="w-64 bg-[#edf2fa]  min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <ul className="space-y-2">
          <li><Link to="/admin/dashboard" className="hover:underline">Dashboard</Link></li>
          <li><Link to="/admin/products" className="hover:underline">Manage Products</Link></li>
          <li><Link to="/admin/orders" className="hover:underline">Orders</Link></li>
        </ul>
      </aside>

      {/* محتوى الصفحات */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
