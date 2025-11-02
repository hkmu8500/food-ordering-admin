import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ordersApi } from "@/api/order";
import type { Order } from "@/api/order";

export default function OrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: ordersApi.getOrders,
  });

  const {
    mutate: updateStatus,
    isPending: isUpdatingStatus,
    error: updateError,
  } = useMutation({
    mutationFn: (args: { orderId: string; status: string }) =>
      ordersApi.updateOrderStatus(args.orderId, args.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-600",
    completed: "bg-emerald-600",
    canceled: "bg-red-600",
  };

  const statusLabels: Record<string, string> = {
    pending: "Pending",
    completed: "Completed",
    canceled: "Cancelled",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8 flex items-center justify-center">
        <div className="text-white text-lg">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    // console.error("Error loading orders:", error.message);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8">
        <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg">
          Error loading orders
        </div>
      </div>
    );
  }

  if (updateError) {
    console.error("Error updating order status:", updateError);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Orders Management
            </h1>
            <p className="text-slate-400 mt-2">
              Total orders:{" "}
              <span className="font-semibold">{orders.length}</span>
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition cursor-pointer flex items-center gap-2"
          >
            ← Back
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No orders found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700 border-b border-slate-600">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                      Items
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: Order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-600 hover:bg-slate-700/50 transition"
                    >
                      <td className="px-4 py-3 text-sm text-white font-mono">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">
                        {order.userName}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">
                        {order.items.length} item(s)
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-white">
                        ${order.totalPrice}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`${
                            statusColors[order.status]
                          } text-white text-xs font-semibold px-2 py-1 rounded`}
                        >
                          {statusLabels[order.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedOrderId(order.id)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Detail Modal */}
        {selectedOrderId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg shadow-2xl max-w-md w-full border border-slate-700 p-6">
              {(() => {
                const order = orders.find(
                  (o: Order) => o.id === selectedOrderId
                );
                return (
                  <>
                    <h2 className="text-xl font-bold text-white mb-4">
                      Order Details
                    </h2>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-slate-400 text-sm">Order ID</p>
                        <p className="text-white font-mono">{order?.id}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Customer</p>
                        <p className="text-white">{order?.userName}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm mb-2">Items</p>
                        <div className="space-y-1">
                          {order?.items.map((item, idx) => (
                            <p key={idx} className="text-slate-300 text-sm">
                              {item.quantity}x {item.name} - ${item.price}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Total Price</p>
                        <p className="text-white font-bold text-lg">
                          ${order?.totalPrice}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm mb-2">
                          Update Status
                        </p>
                        <select
                          value={order?.status || "pending"}
                          onChange={(e) =>
                            updateStatus({
                              orderId: selectedOrderId,
                              status: e.target.value,
                            })
                          }
                          disabled={isUpdatingStatus}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg cursor-pointer disabled:opacity-50"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedOrderId(null)}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
