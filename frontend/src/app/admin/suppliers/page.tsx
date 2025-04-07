// app/admin/suppliers/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SupplierTable from "@/components/admin/suppliers/SupplierTable";
import SupplierForm from "@/components/admin/suppliers/SupplierForm";
import SupplierDetailModal from "@/components/admin/suppliers/SupplierDetailModal";
import { toast } from "sonner";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "@/api/admin/supplierApi";
import { Supplier } from "@/types/types";

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isSupplierFormOpen, setIsSupplierFormOpen] = useState(false);
  const [isSupplierDetailModalOpen, setIsSupplierDetailModalOpen] =
    useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [viewingSupplier, setViewingSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Hàm lấy danh sách nhà cung cấp
  const fetchSuppliers = async (page: number) => {
    setLoading(true);
    try {
      const response = await getSuppliers({ page, limit });
      if (page === 1) {
        setSuppliers(response.data);
      } else {
        setSuppliers((prev) => [...prev, ...response.data]);
      }
      setHasNextPage(response.hasNextPage);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Lấy danh sách nhà cung cấp thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi page thay đổi
  useEffect(() => {
    fetchSuppliers(page);
  }, [page]);

  // Mở form để thêm nhà cung cấp mới
  const handleAddNewSupplier = () => {
    setEditingSupplier(null);
    setIsSupplierFormOpen(true);
  };

  // Mở form để sửa nhà cung cấp
  const handleEditSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsSupplierFormOpen(true);
  };

  // Mở modal để xem chi tiết nhà cung cấp
  const handleViewSupplier = (supplier: Supplier) => {
    setViewingSupplier(supplier);
    setIsSupplierDetailModalOpen(true);
  };

  // Xóa nhà cung cấp
  const handleDeleteSupplier = async (id: string) => {
    try {
      await deleteSupplier(id);
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
      toast.success("Xóa nhà cung cấp thành công");
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Xóa nhà cung cấp thất bại",
      });
    }
  };

  // Xử lý submit form
  const handleSupplierSubmit = async (data: Partial<Supplier>) => {
    try {
      if (editingSupplier) {
        // Cập nhật nhà cung cấp
        const updatedSupplier = await updateSupplier(editingSupplier.id, {
          name: data.name || "",
          address: data.address || "",
          phoneNumber: data.phoneNumber || "",
        });
        setSuppliers(
          suppliers.map((s) =>
            s.id === updatedSupplier.id ? updatedSupplier : s
          )
        );
        toast.success("Cập nhật nhà cung cấp thành công");
      } else {
        // Thêm nhà cung cấp mới
        const newSupplier = await createSupplier({
          name: data.name || "",
          address: data.address || "",
          phoneNumber: data.phoneNumber || "",
        });
        setSuppliers([...suppliers, newSupplier]);
        toast.success("Thêm nhà cung cấp thành công");
      }
      setIsSupplierFormOpen(false);
      // Reset page về 1 để làm mới danh sách
      setPage(1);
      setSuppliers([]);
      fetchSuppliers(1);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Thao tác thất bại",
      });
    }
  };

  // Tải thêm nhà cung cấp
  const handleLoadMoreSuppliers = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Quản lý nhà cung cấp
      </h1>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách nhà cung cấp</h2>
          <Button onClick={handleAddNewSupplier}>Thêm nhà cung cấp</Button>
        </div>
        {suppliers.length === 0 && !loading ? (
          <p className="text-gray-500">Chưa có nhà cung cấp nào.</p>
        ) : (
          <SupplierTable
            suppliers={suppliers}
            onEdit={handleEditSupplier}
            onDelete={handleDeleteSupplier}
            onView={handleViewSupplier}
          />
        )}
        {hasNextPage && (
          <div className="mt-4 flex justify-center">
            <Button onClick={handleLoadMoreSuppliers} disabled={loading}>
              {loading ? "Đang tải..." : "Tải thêm nhà cung cấp"}
            </Button>
          </div>
        )}
      </div>

      <SupplierForm
        open={isSupplierFormOpen}
        onOpenChange={setIsSupplierFormOpen}
        editingSupplier={editingSupplier}
        onSubmit={handleSupplierSubmit}
      />
      <SupplierDetailModal
        open={isSupplierDetailModalOpen}
        onOpenChange={setIsSupplierDetailModalOpen}
        supplier={viewingSupplier}
      />
    </div>
  );
}
