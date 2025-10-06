import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import Spinner from "../../Components/spinner";
import OrdersTable from "../../Components//OrdersTable";
import OrderDetailsModal from "../../Components/OrderDetailsModal";
import UpdateStatusModal from "../../Components/UpdateStatusModal";
import AddOrderModal from "../../Components/AddOrderModal";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("http://localhost:3000/orders/my-orders"
      );
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error fetching orders", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return;
    try {
      const res = await axiosInstance.put(
        `http://localhost:3000/orders/${selectedOrder._id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === selectedOrder._id ? res.data.order : o))
      );
      setSelectedOrder(null);
      setNewStatus("");
    } catch (err) {
      console.error(
        "Error updating order status",
        err.response?.data || err.message
      );
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrderDetails(order);
    setShowDetailsModal(true);
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Customer Orders</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Manage and track customer orders</p>
          
        </div>
      </div>

      <OrdersTable 
        orders={orders}
        onViewDetails={handleViewDetails}
        onUpdateStatus={setSelectedOrder}
      />

      <OrderDetailsModal
        isOpen={showDetailsModal}
        order={selectedOrderDetails}
        onClose={() => setShowDetailsModal(false)}
      />

      <UpdateStatusModal
        isOpen={!!selectedOrder}
        order={selectedOrder}
        newStatus={newStatus}
        onStatusChange={setNewStatus}
        onUpdate={handleUpdateStatus}
        onClose={() => setSelectedOrder(null)}
      />

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