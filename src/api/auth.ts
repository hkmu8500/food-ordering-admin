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
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    const response = await axiosInstance.post<SignupResponse>(
      "/auth/signup",
      data,
      {
        params: {
          user_name: data.userName,
        },
      }
    );
    return response.data;
  },

  login: async (data: SignupRequest): Promise<SignupResponse> => {
    const response = await axiosInstance.post<SignupResponse>(
      "/auth/login",
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
