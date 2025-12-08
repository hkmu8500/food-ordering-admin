import API_BASE_URL from "@/utils/constant";
import mock from "@/lib/mockAdapter";

// In-memory user storage
const mockUsers: { id: number; name: string }[] = [
  { id: 1, name: "admin" },
  { id: 2, name: "TestUser2" },
];

// Mock user login API
mock.onPost(`${API_BASE_URL}/admin/auth/login`).reply((config) => {
  try {
    const userName = config.params.user_name;
    console.log("🔐 Attempting login for user:", userName);
    if (!userName || userName.trim().length === 0) {
      return [
        400,
        {
          detail: [
            {
              loc: [undefined, "user_name"],
              msg: "Username is required",
              type: "value_error",
            },
          ],
        },
      ];
    }

    const user = Object.values(mockUsers).find(
      (user) => user.name.toLowerCase() === userName.toLowerCase()
    );

    if (!user) {
      return [
        404,
        {
          detail: [
            {
              loc: [undefined, "user_name"],
              msg: "User not found, please register",
              type: "value_error",
            },
          ],
        },
      ];
    }

    console.log("✅ Login successful:", user);

    return [200, { success: true, message: "Login successful", data: user }];
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Login failed:", error.message);
    } else {
      console.error("❌ Login failed:", error);
    }
    return [
      500,
      {
        detail: [
          {
            loc: [undefined, "internal"],
            msg: "Internal server error",
            type: "internal_server_error",
          },
        ],
      },
    ];
  }
});

export default mock;
