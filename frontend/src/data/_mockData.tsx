// _mockData.tsx
import { Category } from "@/types/types";
import { Supplier } from "@/types/types";
import { Product } from "@/types/types";
import { ImportOrder, ImportOrderDetail } from "@/types/types";
import { Order, OrderDetail } from "@/types/types";
import { Customer } from "@/types/types";
import { Promotion } from "@/types/types";

// Mock data cho Category
export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Điện thoại",
    description: "Danh mục các loại điện thoại thông minh",
    parent_id: null,
    createdAt: "2025-03-27T12:00:00Z",
    updatedAt: "2025-03-27T12:00:00Z",
  },
  {
    id: 2,
    name: "Phụ kiện",
    description: "Danh mục các loại phụ kiện điện thoại",
    parent_id: null,
    createdAt: "2025-03-27T12:05:00Z",
    updatedAt: "2025-03-27T12:05:00Z",
  },
];

// Mock data cho Supplier
export const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Công ty Apple Việt Nam",
    email: "applevn@gmail.com",
    phoneNumber: "0901234567",
    address: "123 Đường Láng, Hà Nội",
    createdAt: "2025-03-27T12:00:00Z",
    updatedAt: "2025-03-27T12:00:00Z",
  },
  {
    id: 2,
    name: "Công ty Samsung Việt Nam",
    email: "samsungvn@gmail.com",
    phoneNumber: "0909876543",
    address: "456 Nguyễn Trãi, TP.HCM",
    createdAt: "2025-03-27T12:05:00Z",
    updatedAt: "2025-03-27T12:05:00Z",
  },
];

// Mock data cho Product
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 14",
    description: "Điện thoại iPhone 14 mới nhất",
    price: 20000000,
    stock: 50,
    category_id: 1,
    supplier_id: 1,
    createdAt: "2025-03-27T12:10:00Z",
    updatedAt: "2025-03-27T12:10:00Z",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    description: "Điện thoại Samsung Galaxy S23 cao cấp",
    price: 18000000,
    stock: 30,
    category_id: 1,
    supplier_id: 2,
    createdAt: "2025-03-27T12:15:00Z",
    updatedAt: "2025-03-27T12:15:00Z",
  },
];

// Mock data cho ImportOrder
export const mockImportOrders: ImportOrder[] = [
  {
    id: 1,
    supplier_id: 1,
    total_amount: 400000000,
    status: "Completed",
    createdAt: "2025-03-27T12:20:00Z",
    updatedAt: "2025-03-27T12:20:00Z",
  },
  {
    id: 2,
    supplier_id: 2,
    total_amount: 180000000,
    status: "Pending",
    createdAt: "2025-03-27T12:25:00Z",
    updatedAt: "2025-03-27T12:25:00Z",
  },
];

// Mock data cho ImportOrderDetail
export const mockImportOrderDetails: ImportOrderDetail[] = [
  {
    id: 1,
    import_order_id: 1,
    product_id: 1,
    quantity: 20,
    unit_price: 20000000,
    createdAt: "2025-03-27T12:20:00Z",
    updatedAt: "2025-03-27T12:20:00Z",
  },
  {
    id: 2,
    import_order_id: 2,
    product_id: 2,
    quantity: 10,
    unit_price: 18000000,
    createdAt: "2025-03-27T12:25:00Z",
    updatedAt: "2025-03-27T12:25:00Z",
  },
];

// Mock data cho Customer
export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phoneNumber: "0901234567",
    address: "123 Đường Láng, Hà Nội",
    createdAt: "2025-03-27T12:00:00Z",
    updatedAt: "2025-03-27T12:00:00Z",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@gmail.com",
    phoneNumber: "0909876543",
    address: "456 Nguyễn Trãi, TP.HCM",
    createdAt: "2025-03-27T12:05:00Z",
    updatedAt: "2025-03-27T12:05:00Z",
  },
];

// Mock data cho Order
export const mockOrders: Order[] = [
  {
    id: 1,
    customer_id: 1,
    total_amount: 40000000,
    status: "Delivered",
    createdAt: "2025-03-27T12:30:00Z",
    updatedAt: "2025-03-27T12:30:00Z",
    receiver_name: "Nguyễn Văn A",
    receiver_phone: "0901234567",
    receiver_address: "123 Đường Láng, Hà Nội",
  },
  {
    id: 2,
    customer_id: 2,
    total_amount: 18000000,
    status: "Pending",
    createdAt: "2025-03-27T12:35:00Z",
    updatedAt: "2025-03-27T12:35:00Z",
    receiver_name: "Trần Thị B",
    receiver_phone: "0909876543",
    receiver_address: "456 Nguyễn Trãi, TP.HCM",
  },
];

// Mock data cho OrderDetail
export const mockOrderDetails: OrderDetail[] = [
  {
    id: 1,
    order_id: 1,
    product_id: 1,
    quantity: 2,
    unit_price: 20000000,
    createdAt: "2025-03-27T12:30:00Z",
    updatedAt: "2025-03-27T12:30:00Z",
  },
  {
    id: 2,
    order_id: 2,
    product_id: 2,
    quantity: 1,
    unit_price: 18000000,
    createdAt: "2025-03-27T12:35:00Z",
    updatedAt: "2025-03-27T12:35:00Z",
  },
];

// Mock data cho Promotion
export const mockPromotions: Promotion[] = [
  {
    id: 1,
    name: "Giảm giá iPhone 14",
    type: "product",
    discount_type: "percent",
    discount_value: 10,
    start_date: "2025-03-28T00:00:00Z",
    end_date: "2025-03-31T23:59:59Z",
    quantity_limit: 10,
    target_id: 1,
    createdAt: "2025-03-27T12:20:00Z",
    updatedAt: "2025-03-27T12:20:00Z",
  },
  {
    id: 2,
    name: "Giảm giá danh mục Điện thoại",
    type: "category",
    discount_type: "percent",
    discount_value: 15,
    start_date: "2025-03-28T00:00:00Z",
    end_date: "2025-04-01T23:59:59Z",
    target_id: 1,
    createdAt: "2025-03-27T12:25:00Z",
    updatedAt: "2025-03-27T12:25:00Z",
  },
];
