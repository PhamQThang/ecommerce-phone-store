// app/admin/purchase-orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import PurchaseOrderTable from "@/components/admin/purchaseOrder/PurchaseOrderTable";
import PurchaseOrderForm from "@/components/admin/purchaseOrder/PurchaseOrderForm";
import PurchaseOrderDetailModal from "@/components/admin/purchaseOrder/PurchaseOrderDetailModal";
import { toast } from "sonner";
import {
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrder,
  deletePurchaseOrder,
} from "@/api/admin/purchaseOrderApi";
import { PurchaseOrder } from "@/types/types";

export default function PurchaseOrderManagement() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isPurchaseOrderFormOpen, setIsPurchaseOrderFormOpen] = useState(false);
  const [isPurchaseOrderDetailModalOpen, setIsPurchaseOrderDetailModalOpen] =
    useState(false);
  const [editingPurchaseOrder, setEditingPurchaseOrder] =
    useState<PurchaseOrder | null>(null);
  const [viewingPurchaseOrder, setViewingPurchaseOrder] =
    useState<PurchaseOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Hàm lấy danh sách đơn nhập hàng
  const fetchPurchaseOrders = async (page: number) => {
    setLoading(true);
    try {
      const response = await getPurchaseOrders({ page, limit });
      if (page === 1) {
        setPurchaseOrders(response.data);
      } else {
        setPurchaseOrders((prev) => [...prev, ...response.data]);
      }
      setHasNextPage(response.hasNextPage);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Lấy danh sách đơn nhập hàng thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseOrders(page);
  }, [page]);

  // Mở form để thêm đơn nhập hàng mới
  const handleAddNewPurchaseOrder = () => {
    setEditingPurchaseOrder(null);
    setIsPurchaseOrderFormOpen(true);
  };

  // Mở form để sửa đơn nhập hàng
  const handleEditPurchaseOrder = async (id: string) => {
    try {
      const purchaseOrder = await getPurchaseOrderById(id);
      setEditingPurchaseOrder(purchaseOrder);
      setIsPurchaseOrderFormOpen(true);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Lấy thông tin đơn nhập hàng thất bại",
      });
    }
  };

  // Mở modal để xem chi tiết đơn nhập hàng
  const handleViewPurchaseOrder = async (id: string) => {
    try {
      const purchaseOrder = await getPurchaseOrderById(id);
      setViewingPurchaseOrder(purchaseOrder);
      setIsPurchaseOrderDetailModalOpen(true);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Lấy thông tin đơn nhập hàng thất bại",
      });
    }
  };

  // Xóa đơn nhập hàng
  const handleDeletePurchaseOrder = async (id: string) => {
    try {
      await deletePurchaseOrder(id);
      setPurchaseOrders(purchaseOrders.filter((po) => po.id !== id));
      toast.success("Xóa đơn nhập hàng thành công");
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Xóa đơn nhập hàng thất bại",
      });
    }
  };

  // Xử lý submit form
  const handlePurchaseOrderSubmit = async (data: Partial<PurchaseOrder>) => {
    try {
      if (editingPurchaseOrder) {
        // Cập nhật đơn nhập hàng
        const updatedPurchaseOrder = await updatePurchaseOrder(
          editingPurchaseOrder.id,
          {
            productIdentities: [],
            supplier: { id: data.supplier?.id || "" },
          }
        );
        setPurchaseOrders(
          purchaseOrders.map((po) =>
            po.id === updatedPurchaseOrder.id ? updatedPurchaseOrder : po
          )
        );
        toast.success("Cập nhật đơn nhập hàng thành công");
      } else {
        // Thêm đơn nhập hàng mới
        setPurchaseOrders([...purchaseOrders, data as PurchaseOrder]);
        toast.success("Thêm đơn nhập hàng thành công");
      }
      setIsPurchaseOrderFormOpen(false);
      setPage(1);
      setPurchaseOrders([]);
      fetchPurchaseOrders(1);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Thao tác thất bại",
      });
    }
  };

  // Tải thêm đơn nhập hàng
  const handleLoadMorePurchaseOrders = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Quản lý đơn nhập hàng
      </h1>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách đơn nhập hàng</h2>
          <Button onClick={handleAddNewPurchaseOrder}>
            Thêm đơn nhập hàng
          </Button>
        </div>
        {purchaseOrders.length === 0 && !loading ? (
          <p className="text-gray-500">Chưa có đơn nhập hàng nào.</p>
        ) : (
          <PurchaseOrderTable
            purchaseOrders={purchaseOrders}
            onEdit={handleEditPurchaseOrder}
            onDelete={handleDeletePurchaseOrder}
            onView={handleViewPurchaseOrder}
          />
        )}
        {hasNextPage && (
          <div className="mt-4 flex justify-center">
            <Button onClick={handleLoadMorePurchaseOrders} disabled={loading}>
              {loading ? "Đang tải..." : "Tải thêm đơn nhập hàng"}
            </Button>
          </div>
        )}
      </div>

      <PurchaseOrderForm
        open={isPurchaseOrderFormOpen}
        onOpenChange={setIsPurchaseOrderFormOpen}
        editingPurchaseOrder={editingPurchaseOrder}
        onSubmit={handlePurchaseOrderSubmit}
      />
      <PurchaseOrderDetailModal
        open={isPurchaseOrderDetailModalOpen}
        onOpenChange={setIsPurchaseOrderDetailModalOpen}
        purchaseOrder={viewingPurchaseOrder}
      />
    </div>
  );
}
