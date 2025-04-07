// api/admin/colorApi.ts
import axiosInstance from "../config/axiosConfig";
import {
  Color,
  GetColorsResponse,
  ColorRequest,
  PaginationParams,
} from "@/types/types";

export const getColors = async (
  params: PaginationParams
): Promise<GetColorsResponse> => {
  try {
    const response = await axiosInstance.get("/api/v1/colors", { params });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Lấy danh sách màu thất bại"
    );
  }
};

export const createColor = async (data: ColorRequest): Promise<Color> => {
  try {
    const response = await axiosInstance.post("/api/v1/colors", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Tạo màu thất bại");
  }
};

export const updateColor = async (
  id: string,
  data: ColorRequest
): Promise<Color> => {
  try {
    const response = await axiosInstance.patch(`/api/v1/colors/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Cập nhật màu thất bại");
  }
};

export const deleteColor = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/v1/colors/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Xóa màu thất bại");
  }
};
