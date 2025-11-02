import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authApi } from "../api/auth";
import { useAuthStore } from "../stores/useAuthStore";
import axios from "axios";

export default function AuthPage() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      const { id, name } = data.data;
      setAuth(id, name);
      navigate("/");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setError(
          error.response?.data?.detail[0].msg ||
            "Login failed. Please try again."
        );
      } else {
        setError("Login failed. Please try again.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userName.trim()) {
      setError("Please enter your user name");
      return;
    }

    login({ userName });
  };

  const isPending = isLoginPending;

  useEffect(() => {
    if (useAuthStore.getState().isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-8 border border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-400">{"Welcome back"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              User Name
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder-slate-500"
              placeholder="Please enter your user name"
              disabled={isPending}
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? "Processing..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
