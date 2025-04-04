import {
  GetProductsResponse,
  PaginationParams,
  Product,
  ProductRequest,
  UploadFileResponse,
} from "@/types/types";
import axiosInstance from "../config/axiosConfig";

// API lấy danh sách sản phẩm
export const getProducts = async (
  params: PaginationParams
): Promise<GetProductsResponse> => {
  try {
    const response = await axiosInstance.get("/api/v1/products", {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Lấy danh sách sản phẩm thất bại"
    );
  }
};

// API tạo sản phẩm mới
export const createProduct = async (data: ProductRequest): Promise<Product> => {
  try {
    const response = await axiosInstance.post("/api/v1/products", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Tạo sản phẩm thất bại");
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axiosInstance.get(`/api/v1/products/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Lấy thông tin sản phẩm thất bại"
    );
  }
};

// API cập nhật sản phẩm
export const updateProduct = async (
  id: string,
  data: ProductRequest
): Promise<Product> => {
  try {
    const response = await axiosInstance.patch(`/api/v1/products/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Cập nhật sản phẩm thất bại"
    );
  }
};

// API xóa sản phẩm
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/v1/products/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Xóa sản phẩm thất bại");
  }
};

// API Upload file
export const uploadFile = async (file: File): Promise<UploadFileResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post(
      "/api/v1/files/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Upload file thất bại");
  }
};
