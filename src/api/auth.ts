import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types/menu";

export interface SignupRequest {
  userName: string;
}

export interface UserData {
  id: number;
  name: string;
}

type SignupResponse = ApiResponse<UserData>;

export const authApi = {
  login: async (data: SignupRequest): Promise<SignupResponse> => {
    const response = await axiosInstance.post<SignupResponse>(
      "/admin/auth/login",
      data,
      {
        params: {
          user_name: data.userName,
        },
      }
    );
    return response.data;
  },
};
