import type { ApiResponse } from "@/types/menu";
import axiosInstance from "@/lib/axios";

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: OrderItem[];
  totalPrice: string;
  status: "pending" | "completed" | "canceled";
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  menuId: string;
  name: string;
  quantity: number;
  price: string;
}

export const ordersApi = {
  /**
   * GET /api/admin/orders
   * Get all orders
   * @returns Promise<Order[]>
   */
  getOrders: async (): Promise<Order[]> => {
    const response = await axiosInstance.get<ApiResponse<Order[]>>(
      "/admin/orders"
    );
    return response.data.data;
  },

  /**
   * GET /api/admin/orders/:id
   * Get order details by ID
   * @param orderId - Order ID
   * @returns Promise<Order>
   */
  getOrderById: async (orderId: string): Promise<Order> => {
    const response = await axiosInstance.get<ApiResponse<Order>>(
      `/admin/orders/${orderId}`
    );
    return response.data.data;
  },

  /**
   * POST /api/admin/orders/:id/status
   * Update order status
   * @param orderId - Order ID
   * @param status - New status
   * @returns Promise<Order>
   */
  updateOrderStatus: async (
    orderId: string,
    status: string
  ): Promise<Order> => {
    const response = await axiosInstance.post<ApiResponse<Order>>(
      `/admin/orders/${orderId}/status`,
      { status },
      {
        params: { status },
      }
    );
    return response.data.data;
  },

  /**
   * DELETE /api/admin/orders/:id
   * Delete an order by ID
   * @param orderId - Order ID
   * @returns Promise<Order>
   */
  deleteOrder: async (orderId: string): Promise<Order> => {
    const response = await axiosInstance.delete<ApiResponse<Order>>(
      `/admin/orders/${orderId}`
    );
    return response.data.data;
  },
};
