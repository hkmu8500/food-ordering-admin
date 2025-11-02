import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import OrdersPage from "./pages/OrderPage";

// Mock APIs in development mode
if (import.meta.env.DEV) {
  import("./api/mock/authApi");
}

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <OrdersPage />
      </ProtectedRoute>
    ),
  },
]);

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
