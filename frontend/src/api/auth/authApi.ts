import axiosInstance from "../config/axiosConfig";

interface LoginRequest {
  email: string;
  password: string;
}

interface Photo {
  id: string;
  path: string;
}

interface Role {
  id: number;
  name: string;
}

interface Status {
  id: number;
  name: string;
}

interface User {
  phoneNumber: string;
  id: number;
  email: string;
  provider: string;
  socialId: string;
  firstName: string;
  lastName: string;
  photo: Photo;
  role: Role;
  status: Status;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface AuthResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface RegisterResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/email/login", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Đăng nhập thất bại");
  }
};

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/auth/email/register",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 422) {
      if (error.response.data.errors?.email === "emailAlreadyExists") {
        throw new Error("Email đã tồn tại");
      }
    }
    throw new Error(error.message || "Đăng ký thất bại");
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post("/api/v1/auth/logout");
  } catch (error: any) {
    throw new Error(error.message || "Đăng xuất thất bại");
  }
};
