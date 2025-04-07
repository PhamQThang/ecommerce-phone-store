// api/admin/supplierApi.ts
import axiosInstance from "../config/axiosConfig";
import {
  Supplier,
  GetSuppliersResponse,
  SupplierRequest,
  PaginationParams,
} from "@/types/types";

// API lấy danh sách nhà cung cấp
export const getSuppliers = async (
  params: PaginationParams
): Promise<GetSuppliersResponse> => {
  try {
    const response = await axiosInstance.get("/api/v1/suppliers", { params });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Lấy danh sách nhà cung cấp thất bại"
    );
  }
};

// API tạo nhà cung cấp mới
export const createSupplier = async (
  data: SupplierRequest
): Promise<Supplier> => {
  try {
    const response = await axiosInstance.post("/api/v1/suppliers", data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Tạo nhà cung cấp thất bại"
    );
  }
};

// API cập nhật nhà cung cấp
export const updateSupplier = async (
  id: string,
  data: SupplierRequest
): Promise<Supplier> => {
  try {
    const response = await axiosInstance.patch(`/api/v1/suppliers/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Cập nhật nhà cung cấp thất bại"
    );
  }
};

// API xóa nhà cung cấp
export const deleteSupplier = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/v1/suppliers/${id}`);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Xóa nhà cung cấp thất bại"
    );
  }
};
