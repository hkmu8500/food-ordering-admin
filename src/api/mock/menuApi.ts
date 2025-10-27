import { menuItems } from "./data/menu";
import API_BASE_URL from "@/utils/constant";
import mock from "@/lib/mockAdapter";

// GET /api/menu - Get all menu items
mock.onGet(`${API_BASE_URL}/menu`).reply(() => {
  console.log("Getting all menu items");
  return [
    200,
    {
      success: true,
      message: "Menu items retrieved successfully",
      data: menuItems,
    },
  ];
});

// GET /api/menu/:id - Get menu item by ID
mock.onGet(new RegExp(`${API_BASE_URL}/menu/.*`)).reply((config) => {
  const id = config.url?.split("/").pop();
  const item = menuItems.find((item) => item.id === Number(id));

  if (item) {
    console.log("Getting menu item:", item);
    return [
      200,
      {
        success: true,
        message: "Menu item retrieved successfully",
        data: [item],
      },
    ];
  }

  return [
    404,
    {
      detail: [
        {
          loc: [undefined, "id"],
          msg: "Menu item not found",
          type: "value_error",
        },
      ],
    },
  ];
});
