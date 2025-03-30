// api/admin/productModelApi.ts
import axiosInstance from "../config/axiosConfig";
import {
  ProductModel,
  GetProductModelsResponse,
  GetProductModelsParams,
  ProductModelCreateRequest,
  ProductModelUpdateRequest,
} from "@/types/types";

export const getProductModels = async (
  params: GetProductModelsParams
): Promise<GetProductModelsResponse> => {
  const response = await axiosInstance.get("/api/v1/product-models", {
    params,
  });
  return response.data;
};

export const createProductModel = async (
  data: ProductModelCreateRequest
): Promise<ProductModel> => {
  const response = await axiosInstance.post("/api/v1/product-models", data);
  return response.data;
};

export const updateProductModel = async (
  id: string,
  data: ProductModelUpdateRequest
): Promise<ProductModel> => {
  const response = await axiosInstance.patch(
    `/api/v1/product-models/${id}`,
    data
  );
  return response.data;
};

export const deleteProductModel = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/v1/product-models/${id}`);
};
