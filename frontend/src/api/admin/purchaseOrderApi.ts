import axiosInstance from "../config/axiosConfig";
import {
  GetPurchaseOrdersResponse,
  PaginationParams,
  ProductIdentity,
  ProductIdentityRequest,
  PurchaseOrder,
  PurchaseOrderRequest,
} from "@/types/types";

export const createProductIdentity = async (
  data: ProductIdentityRequest
): Promise<ProductIdentity> => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/product-identities",
      data
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Tạo ProductIdentity thất bại"
    );
  }
};

export const getPurchaseOrders = async (
  params: PaginationParams
): Promise<GetPurchaseOrdersResponse> => {
  try {
    const response = await axiosInstance.get("/api/v1/purchase-orders", {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Lấy danh sách đơn nhập hàng thất bại"
    );
  }
};

// API tạo đơn nhập hàng
export const createPurchaseOrder = async (
  data: PurchaseOrderRequest
): Promise<PurchaseOrder> => {
  try {
    const response = await axiosInstance.post("/api/v1/purchase-orders", data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Tạo đơn nhập hàng thất bại"
    );
  }
};

export const getPurchaseOrderById = async (
  id: string
): Promise<PurchaseOrder> => {
  try {
    const response = await axiosInstance.get(`/api/v1/purchase-orders/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Lấy thông tin đơn nhập hàng thất bại"
    );
  }
};

// API cập nhật đơn nhập hàng
export const updatePurchaseOrder = async (
  id: string,
  data: PurchaseOrderRequest
): Promise<PurchaseOrder> => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/purchase-orders/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Cập nhật đơn nhập hàng thất bại"
    );
  }
};

// API xóa đơn nhập hàng
export const deletePurchaseOrder = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/v1/purchase-orders/${id}`);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Xóa đơn nhập hàng thất bại"
    );
  }
};
