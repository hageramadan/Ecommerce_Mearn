import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import Spinner from "../../Components/spinner";
import OrdersTable from "../../Components//OrdersTable";
import OrderDetailsModal from "../../Components/OrderDetailsModal";
import UpdateStatusModal from "../../Components/UpdateStatusModal";
import AddOrderModal from "../../Components/AddOrderModal";

function Orders() {
  // State to store all orders
  const [orders, setOrders] = useState([]);

  // State to track loading while fetching data
  const [loading, setLoading] = useState(false);

  // State to store the selected order for updating status
  const [selectedOrder, setSelectedOrder] = useState(null);

  // State to store the new status value
  const [newStatus, setNewStatus] = useState("");

  // State to control showing the order details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // State to store the order data for details modal
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // State to control showing the add order modal
  const [showAddModal, setShowAddModal] = useState(false);

  // Get token from localStorage for authorization
  const token = localStorage.getItem("token");

  // Fetch all orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true); // start loading
      const res = await axiosInstance.get("http://localhost:3000/orders/all");
      setOrders(res.data.orders || []); // save orders in state
    } catch (err) {
      console.error("Error fetching orders", err.response?.data || err.message);
    } finally {
      setLoading(false); // stop loading
    }
  };

  // Run once on component mount to fetch orders
  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status API call
  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return;
    try {
      const res = await axiosInstance.put(
        `http://localhost:3000/orders/${selectedOrder._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // update order in local state after success
      setOrders((prev) =>
        prev.map((o) => (o._id === selectedOrder._id ? res.data.order : o))
      );
      setSelectedOrder(null); // close modal
      setNewStatus(""); // reset status
    } catch (err) {
      console.error("Error updating order status", err.response?.data || err.message);
    }
  };

  // Open details modal with selected order data
  const handleViewDetails = (order) => {
    setSelectedOrderDetails(order);
    setShowDetailsModal(true);
  };

  // Show spinner while loading data
  if (loading) return <Spinner />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Customer Orders</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>
      </div>

      {/* Orders table */}
      <OrdersTable 
        orders={orders}
        onViewDetails={handleViewDetails}
        onUpdateStatus={setSelectedOrder}
      />

      {/* Modal for order details */}
      <OrderDetailsModal
        isOpen={showDetailsModal}
        order={selectedOrderDetails}
        onClose={() => setShowDetailsModal(false)}
      />

      {/* Modal for updating order status */}
      <UpdateStatusModal
        isOpen={!!selectedOrder}
        order={selectedOrder}
        newStatus={newStatus}
        onStatusChange={setNewStatus}
        onUpdate={handleUpdateStatus}
        onClose={() => setSelectedOrder(null)}
      />

      {/* Modal for adding new order */}
      <AddOrderModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onOrderAdded={fetchOrders}
        token={token}
      />
    </div>
  );
}

export default Orders;
