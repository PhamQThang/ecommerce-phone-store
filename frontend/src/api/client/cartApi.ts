import { Cart } from "@/types/types";
import axiosInstance from "../config/axiosConfig";

// API lấy giỏ hàng hiện tại
export const getCurrentCart = async (): Promise<Cart | null> => {
  try {
    const response = await axiosInstance.get("/api/v1/carts/current");
    return response.data;
  } catch (error: any) {
    if (error?.status === 422 && error?.errors?.cartId === "cartEmpty") {
      return null;
    }
    throw new Error(error.response?.data?.message || "Lấy giỏ hàng thất bại");
  }
};

// API tạo giỏ hàng mới
export const createCart = async (): Promise<Cart> => {
  try {
    const response = await axiosInstance.post("/api/v1/carts");
    console.log("POST CART: ", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Tạo giỏ hàng thất bại");
  }
};
