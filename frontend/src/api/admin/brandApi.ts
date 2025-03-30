// api/admin/brandApi.ts
import axiosInstance from "../config/axiosConfig";

export interface Brand {
  models: string[];
  slug: string;
  name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetBrandsResponse {
  data: Brand[];
  hasNextPage: boolean;
}

export interface GetBrandsParams {
  page: number;
  limit: number;
}

export interface BrandRequest {
  models: string[];
  slug: string;
  name: string;
}

export const getBrands = async (
  params: GetBrandsParams
): Promise<GetBrandsResponse> => {
  try {
    const response = await axiosInstance.get("/api/v1/brands", {
      params: {
        page: params.page,
        limit: params.limit,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Lấy danh sách brands thất bại");
  }
};

export const createBrand = async (data: BrandRequest): Promise<Brand> => {
  try {
    const response = await axiosInstance.post("/api/v1/brands", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Tạo brand thất bại");
  }
};

export const updateBrand = async (
  id: string,
  data: BrandRequest
): Promise<Brand> => {
  try {
    const response = await axiosInstance.patch(`/api/v1/brands/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Cập nhật brand thất bại");
  }
};

export const deleteBrand = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/v1/brands/${id}`);
  } catch (error: any) {
    throw new Error(error.message || "Xóa brand thất bại");
  }
};
