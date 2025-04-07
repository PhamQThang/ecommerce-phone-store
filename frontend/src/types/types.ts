// types/types.ts
// Brand Types
export interface Brand {
  id: string;
  name: string;
  slug: string;
  models: ProductModel[]; // Array of model IDs
  createdAt: string;
  updatedAt: string;
}

export interface GetBrandsResponse {
  data: Brand[];
  hasNextPage: boolean;
}

export interface BrandRequest {
  name: string;
  slug: string;
  models?: ProductModel[];
}

// Product Model Types
export interface ProductModel {
  id: string;
  code: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  brand?: {
    id: string;
    name: string;
  };
}

export interface Color {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductModelsResponse {
  data: ProductModel[];
  hasNextPage: boolean;
}

export interface ProductModelCreateRequest {
  code: string;
  name: string;
  description?: string;
  brand?: { id: string };
}

export interface ProductModelUpdateRequest {
  code?: string;
  name?: string;
  description?: string;
  brand?: { id: string };
}

export interface GetProductsResponse {
  data: Product[];
  hasNextPage: boolean;
}

export interface ProductRequest {
  model: { id: string };
  basePrice: number;
  screenSize: number;
  pin: number;
  screenTechnology: string;
  chipset: string;
  os: string;
  identities: any[];
  images: any[];
  storage: number;
  ram: number;
  slug: string;
  name: string;
}

export interface UploadFileResponse {
  file: {
    id: string;
    path: string;
  };
}

export interface SupplierRequest {
  name: string;
  address: string;
  phoneNumber: string;
}

export interface GetSuppliersResponse {
  data: Supplier[];
  hasNextPage: boolean;
}

export interface ColorRequest {
  name: string;
}

export interface GetColorsResponse {
  data: Color[];
  hasNextPage: boolean;
}

// Common Types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ListResponse<T> {
  data: T[];
  hasNextPage: boolean;
  total?: number;
}

// Form Types
export interface BrandFormValues {
  name: string;
  slug: string;
  models?: ProductModel[];
}

export interface ProductModelFormValues {
  code: string;
  name: string;
  description?: string;
  brand: {
    id: string;
    name: string;
  };
}

export interface Cart {
  id: string;
  userId: string;
  items: any[]; // Có thể thay đổi tùy theo cấu trúc items của bạn
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  screenSize: number;
  pin: number;
  screenTechnology: string;
  chipset: string;
  os: string;
  identities: any[] | null;
  status: string;
  quantity: number;
  colors: any[];
  images: any[];
  storage: number;
  ram: number;
  model: ProductModel;
  createdAt: string;
  updatedAt: string;
}
/////////////////////////
export interface Category {
  id: number;
  name: string;
  description?: string;
  parent_id?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImportOrder {
  id: number;
  supplier_id: number;
  total_amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImportOrderDetail {
  id: number;
  import_order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  customer_id: number;
  total_amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  receiver_name: string; // Họ tên người nhận
  receiver_phone: string; // Số điện thoại người nhận
  receiver_address: string; // Địa chỉ người nhận
}

export interface OrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Promotion {
  id: number;
  name: string;
  type: "product" | "category" | "order" | "quantity"; // Loại khuyến mãi
  discount_type: "percent" | "fixed"; // Kiểu giảm giá
  discount_value: number; // Giá trị giảm (%, hoặc số tiền cố định)
  start_date: string; // Thời gian bắt đầu
  end_date: string; // Thời gian kết thúc
  quantity_limit?: number; // Số lượng tối đa áp dụng
  target_id?: number; // ID của sản phẩm/danh mục (nếu có)
  min_order_value?: number; // Giá trị đơn hàng tối thiểu (nếu type là order)
  min_quantity?: number; // Số lượng tối thiểu (nếu type là quantity)
  createdAt: string;
  updatedAt: string;
}
