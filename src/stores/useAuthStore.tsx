import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  userId: number | null;
  userName: string | null;
  isAuthenticated: boolean;
  setAuth: (userId: number, userName: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userId: null,
      userName: null,
      isAuthenticated: false,

      setAuth: (userId, userName) => {
        set({ userId, userName, isAuthenticated: true });
      },

      logout: () => {
        set({ userId: null, userName: null, isAuthenticated: false });
      },

      checkAuth: () => {
        const { userId, userName } = get();
        // If both userId and userName exist, consider the user authenticated
        if (userId && userName) {
          set({ isAuthenticated: true });
        } else {
          set({ isAuthenticated: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // When the data is rehydrated from localStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Automatically check and set authentication status
          state.checkAuth();
        }
      },
    }
  )
);
