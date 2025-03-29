// /admin/import-orders/page.tsx
"use client";

import { useState } from "react";
import { ImportOrder, ImportOrderDetail } from "@/types/types";
import { Supplier } from "@/types/types";
import { Product } from "@/types/types";
import { Button } from "@/components/ui/button";
import ImportOrderTable from "@/components/admin/importOrder/ImportOrderTable";
import ImportOrderForm from "@/components/admin/importOrder/ImportOrderForm";
import ImportOrderDetailModal from "@/components/admin/importOrder/ImportOrderDetailModal";
import { toast } from "sonner";
import {
  mockImportOrderDetails,
  mockImportOrders,
  mockProducts,
  mockSuppliers,
} from "@/data/_mockData";

export default function ImportOrderManagement() {
  const [importOrders, setImportOrders] =
    useState<ImportOrder[]>(mockImportOrders);
  const [importOrderDetails, setImportOrderDetails] = useState<
    ImportOrderDetail[]
  >(mockImportOrderDetails);
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [products] = useState<Product[]>(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingImportOrder, setEditingImportOrder] =
    useState<ImportOrder | null>(null);
  const [editingImportOrderDetails, setEditingImportOrderDetails] = useState<
    ImportOrderDetail[]
  >([]);
  const [viewingImportOrder, setViewingImportOrder] =
    useState<ImportOrder | null>(null);

  const handleView = (importOrder: ImportOrder) => {
    setViewingImportOrder(importOrder);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (importOrder: ImportOrder) => {
    const details = importOrderDetails.filter(
      (detail) => detail.import_order_id === importOrder.id
    );
    setEditingImportOrder(importOrder);
    setEditingImportOrderDetails(details);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setImportOrders(importOrders.filter((order) => order.id !== id));
    setImportOrderDetails(
      importOrderDetails.filter((detail) => detail.import_order_id !== id)
    );
    toast("Xóa đơn nhập hàng thành công");
  };

  const handleSubmit = (data: {
    importOrder: Partial<ImportOrder>;
    details: ImportOrderDetail[];
  }) => {
    if (editingImportOrder) {
      const updatedImportOrder = {
        ...editingImportOrder,
        ...data.importOrder,
        updatedAt: new Date().toISOString(),
      };
      setImportOrders(
        importOrders.map((order) =>
          order.id === updatedImportOrder.id ? updatedImportOrder : order
        )
      );

      // Cập nhật chi tiết đơn nhập
      const updatedDetails = data.details.map((detail, index) => ({
        ...detail,
        id:
          editingImportOrderDetails[index]?.id ||
          importOrderDetails.length + index + 1,
        import_order_id: updatedImportOrder.id,
        updatedAt: new Date().toISOString(),
      }));
      setImportOrderDetails([
        ...importOrderDetails.filter(
          (detail) => detail.import_order_id !== updatedImportOrder.id
        ),
        ...updatedDetails,
      ]);
      toast("Cập nhật đơn nhập hàng thành công");
    } else {
      const newImportOrder: ImportOrder = {
        id: importOrders.length + 1,
        ...data.importOrder,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as ImportOrder;
      setImportOrders([...importOrders, newImportOrder]);

      // Thêm chi tiết đơn nhập
      const newDetails = data.details.map((detail, index) => ({
        ...detail,
        id: importOrderDetails.length + index + 1,
        import_order_id: newImportOrder.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      setImportOrderDetails([...importOrderDetails, ...newDetails]);
      toast("Thêm đơn nhập hàng thành công");
    }
    setIsModalOpen(false);
    setEditingImportOrder(null);
    setEditingImportOrderDetails([]);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Quản lý nhập hàng
      </h1>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Thêm đơn nhập hàng
      </Button>
      <ImportOrderTable
        importOrders={importOrders}
        suppliers={suppliers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ImportOrderForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        suppliers={suppliers}
        products={products}
        editingImportOrder={editingImportOrder}
        editingImportOrderDetails={editingImportOrderDetails}
        onSubmit={handleSubmit}
      />
      <ImportOrderDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        importOrder={viewingImportOrder}
        importOrderDetails={importOrderDetails}
        suppliers={suppliers}
        products={products}
      />
    </div>
  );
}
