import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getCategories } from "../../api/category/categoryApi";

const Dashboard = () => {
  const [productsData, setProductsData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const categories = data.data || data;
        setCategoriesCount(categories.length);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const generateData = () => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const newProductsData = months.map((m) => ({
        name: m,
        Products: Math.floor(Math.random() * 100) + 20,
      }));
      const newRevenueData = [
        { name: "Completed", value: Math.floor(Math.random() * 9000) + 1000 },
        { name: "Pending", value: Math.floor(Math.random() * 2000) + 200 },
      ];
      setProductsData(newProductsData);
      setRevenueData(newRevenueData);
      setTotalProducts(newProductsData.reduce((a, b) => a + b.Products, 0));
      setTotalRevenue(newRevenueData.reduce((a, b) => a + b.value, 0));
    };
    generateData();
    const interval = setInterval(generateData, 5000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ["#4ade80", "#facc15"];
  const cardStyle =
    "bg-white p-6 rounded-xl shadow-lg flex flex-col items-center transition-transform hover:scale-105";

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={cardStyle}>
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-gray-400 uppercase text-sm">Products</span>
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
              New
            </span>
          </div>
          <span className="text-3xl font-bold animate-pulse">{totalProducts}</span>
          <div className="w-full h-20 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productsData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="Products" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={cardStyle}>
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-gray-400 uppercase text-sm">Categories</span>
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
              {categoriesCount}
            </span>
          </div>
          <span className="text-3xl font-bold mt-2">{categoriesCount}</span>
        </div>

        <div className={cardStyle}>
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-gray-400 uppercase text-sm">Orders</span>
            <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
              75
            </span>
          </div>
          <span className="text-3xl font-bold mt-2">75</span>
        </div>

        <div className={cardStyle}>
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-gray-400 uppercase text-sm">Revenue</span>
            <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-0.5 rounded-full">
              Total
            </span>
          </div>
          <span className="text-3xl font-bold mt-2 animate-pulse">${totalRevenue}</span>
          <div className="w-full h-20 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  dataKey="value"
                  innerRadius={20}
                  outerRadius={30}
                  paddingAngle={3}
                  label={false}
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border-b p-3 text-gray-500 text-sm">Order ID</th>
              <th className="border-b p-3 text-gray-500 text-sm">Customer</th>
              <th className="border-b p-3 text-gray-500 text-sm">Total</th>
              <th className="border-b p-3 text-gray-500 text-sm">Status</th>
              <th className="border-b p-3 text-gray-500 text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "#1023", customer: "John Doe", total: "$250", status: "Completed" },
              { id: "#1024", customer: "Jane Smith", total: "$120", status: "Pending" },
            ].map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-300">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.total}</td>
                <td className={`p-3 font-semibold ${order.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                  {order.status}
                </td>
                <td className="p-3">
                  <button className="text-blue-600 hover:underline text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
