// /admin/orders/page.tsx
"use client";

import { useState } from "react";
import { Order, OrderDetail } from "@/types/types";
import { Customer } from "@/types/types";
import { Product } from "@/types/types";
import OrderTable from "@/components/admin/orders/OrderTable";
import OrderForm from "@/components/admin/orders/OrderForm";
import OrderDetailModal from "@/components/admin/orders/OrderDetailModal";
import { toast } from "sonner";
import {
  mockCustomers,
  mockOrderDetails,
  mockOrders,
  mockProducts,
} from "@/data/_mockData";

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [orderDetails, setOrderDetails] =
    useState<OrderDetail[]>(mockOrderDetails);
  const [customers] = useState<Customer[]>(mockCustomers);
  const [products] = useState<Product[]>(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  const handleView = (order: Order) => {
    setViewingOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleCancel = (id: number) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: "Cancelled",
              updatedAt: new Date().toISOString(),
            }
          : order
      )
    );
    toast("Hủy đơn hàng thành công");
  };

  const handleSubmit = (data: Partial<Order>) => {
    if (editingOrder) {
      const updatedOrder = {
        ...editingOrder,
        receiver_name: data.receiver_name,
        receiver_phone: data.receiver_phone,
        receiver_address: data.receiver_address,
        updatedAt: new Date().toISOString(),
      };
      setOrders(
        orders.map((order) =>
          order.id === updatedOrder.id
            ? {
                ...updatedOrder,
                receiver_name: data.receiver_name || editingOrder.receiver_name,
                receiver_phone:
                  data.receiver_phone || editingOrder.receiver_phone,
                receiver_address:
                  data.receiver_address || editingOrder.receiver_address,
              }
            : order
        )
      );
      toast("Cập nhật thông tin giao hàng thành công");
    }
    setIsModalOpen(false);
    setEditingOrder(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Quản lý đơn hàng
      </h1>
      <OrderTable
        orders={orders}
        customers={customers}
        onView={handleView}
        onEdit={handleEdit}
        onCancel={handleCancel}
      />
      <OrderForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingOrder={editingOrder}
        onSubmit={handleSubmit}
      />
      <OrderDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        order={viewingOrder}
        orderDetails={orderDetails}
        customers={customers}
        products={products}
      />
    </div>
  );
}
