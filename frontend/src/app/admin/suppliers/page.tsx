// /admin/suppliers/page.tsx
"use client";

import SupplierDetailModal from "@/components/admin/suppliers/SupplierDetailModal";
import SupplierForm from "@/components/admin/suppliers/SupplierForm";
import SupplierTable from "@/components/admin/suppliers/SupplierTable";
import { Button } from "@/components/ui/button";
import { mockSuppliers } from "@/data/_mockData";
import { Supplier } from "@/types/types";
import { useState } from "react";

import { toast } from "sonner";

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [viewingSupplier, setViewingSupplier] = useState<Supplier | null>(null);

  const handleView = (supplier: Supplier) => {
    setViewingSupplier(supplier);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setSuppliers(suppliers.filter((sup) => sup.id !== id));
    toast("Xóa nhà cung cấp thành công");
  };

  const handleSubmit = (data: Partial<Supplier>) => {
    if (editingSupplier) {
      const updatedSupplier = {
        ...editingSupplier,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setSuppliers(
        suppliers.map((sup) =>
          sup.id === updatedSupplier.id ? updatedSupplier : sup
        )
      );
      toast("Cập nhật nhà cung cấp thành công");
    } else {
      const newSupplier: Supplier = {
        id: suppliers.length + 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Supplier;
      setSuppliers([...suppliers, newSupplier]);
      toast("Thêm nhà cung cấp thành công");
    }
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Quản lý nhà cung cấp
      </h1>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Thêm nhà cung cấp
      </Button>
      <SupplierTable
        suppliers={suppliers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <SupplierForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingSupplier={editingSupplier}
        onSubmit={handleSubmit}
      />
      <SupplierDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        supplier={viewingSupplier}
      />
    </div>
  );
}
