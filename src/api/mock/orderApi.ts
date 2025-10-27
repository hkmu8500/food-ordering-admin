import { mockOrders } from "@/api/mock/data/order";
import API_BASE_URL from "@/utils/constant";
import mock from "@/lib/mockAdapter";
import type { Order } from "@/api/order";

const orders = JSON.parse(JSON.stringify(mockOrders)) as Order[]; // Deep copy

// GET /api/orders - Get all orders
mock.onGet(`${API_BASE_URL}/orders`).reply(() => {
  console.log("Getting all orders");
  return [
    200,
    {
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    },
  ];
});

// GET /api/orders/:id - Get order by ID
mock.onGet(new RegExp(`${API_BASE_URL}/orders/(?!.*/)`)).reply((config) => {
  const id = config.url?.split("/").pop();
  const order = orders.find((order: Order) => order.id === id);

  if (order) {
    console.log("Getting order:", order);
    return [
      200,
      {
        success: true,
        message: "Order retrieved successfully",
        data: order,
      },
    ];
  }

  return [
    404,
    {
      detail: [
        {
          loc: [undefined, "id"],
          msg: "Order not found",
          type: "value_error",
        },
      ],
    },
  ];
});

// PATCH /api/orders/:id - Update order status
mock.onPatch(new RegExp(`${API_BASE_URL}/orders/.*`)).reply((config) => {
  const id = config.url?.split("/").pop();
  const orderIndex = orders.findIndex((order: Order) => order.id === id);

  if (orderIndex !== -1) {
    const requestData = JSON.parse(config.data);
    orders[orderIndex].status = requestData.status;
    orders[orderIndex].updatedAt = new Date().toISOString();

    console.log("Order updated:", orders[orderIndex]);
    return [
      200,
      {
        success: true,
        message: "Order updated successfully",
        data: orders[orderIndex],
      },
    ];
  }

  return [
    404,
    {
      detail: [
        {
          loc: [undefined, "id"],
          msg: "Order not found",
          type: "value_error",
        },
      ],
    },
  ];
});

// DELETE /api/orders/:id - Delete order
mock.onDelete(new RegExp(`${API_BASE_URL}/orders/.*`)).reply((config) => {
  const id = config.url?.split("/").pop();
  const orderIndex = orders.findIndex((order: Order) => order.id === id);

  if (orderIndex !== -1) {
    const deletedOrder = orders.splice(orderIndex, 1);
    console.log("Order deleted:", deletedOrder[0]);
    return [
      200,
      {
        success: true,
        message: "Order deleted successfully",
        data: deletedOrder[0],
      },
    ];
  }

  return [
    404,
    {
      detail: [
        {
          loc: [undefined, "id"],
          msg: "Order not found",
          type: "value_error",
        },
      ],
    },
  ];
});
