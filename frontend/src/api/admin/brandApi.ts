// api/admin/brandApi.ts
import axiosInstance from "../config/axiosConfig";
import {
  Brand,
  GetBrandsResponse,
  BrandRequest,
  PaginationParams,
} from "@/types/types";

export const getBrands = async (
  params: PaginationParams
): Promise<GetBrandsResponse> => {
  const response = await axiosInstance.get("/api/v1/brands", { params });
  return response.data;
};

export const createBrand = async (data: BrandRequest): Promise<Brand> => {
  const response = await axiosInstance.post("/api/v1/brands", data);
  return response.data;
};

export const updateBrand = async (
  id: string,
  data: BrandRequest
): Promise<Brand> => {
  const response = await axiosInstance.patch(`/api/v1/brands/${id}`, data);
  return response.data;
};

export const deleteBrand = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/v1/brands/${id}`);
};
