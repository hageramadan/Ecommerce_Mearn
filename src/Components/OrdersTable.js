function OrdersTable({ orders, onViewDetails, onUpdateStatus }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">ORDER ID</th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">CUSTOMER</th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">DATE</th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">STATUS</th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">TOTAL</th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b hover:bg-gray-100 transition duration-150`}>
              <td className="py-4 px-6 text-gray-800 font-medium">#{order._id?.slice(-4) || '100' + (index + 1)}</td>
              <td className="py-4 px-6 text-gray-700">{order?.Userid?.userName || "Unknown Customer"}</td>
              <td className="py-4 px-6 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="py-4 px-6">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === 'complete' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                </span>
              </td>
              <td className="py-4 px-6 text-gray-800 font-semibold">${order.totalPrice}</td>
              <td className="py-4 px-6">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onViewDetails(order)}
                    className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition duration-200"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onUpdateStatus(order)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition duration-200"
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;