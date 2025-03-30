// /admin/brands/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Brand } from "@/types/types";
import { Button } from "@/components/ui/button";
import BrandTable from "@/components/admin/brands/BrandTable";
import BrandForm from "@/components/admin/brands/BrandForm";
import BrandDetailModal from "@/components/admin/brands/BrandDetailModal";
import { toast } from "sonner";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  BrandRequest,
} from "@/api/admin/brandApi";

export default function BrandManagement() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [viewingBrand, setViewingBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  // Lấy danh sách brands
  const fetchBrands = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await getBrands({ page: pageNum, limit });
      if (pageNum === 1) {
        setBrands(response.data);
      } else {
        setBrands((prev) => [...prev, ...response.data]);
      }
      setHasNextPage(response.hasNextPage);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Lấy danh sách brands thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands(page);
  }, [page]);

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  const handleView = (brand: Brand) => {
    setViewingBrand(brand);
    setIsDetailModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBrand(id);
      setBrands(brands.filter((brand) => brand.id !== id));
      toast.success("Xóa brand thành công");
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Xóa brand thất bại",
      });
    }
  };

  const handleSubmit = async (data: Partial<Brand>) => {
    try {
      if (editingBrand) {
        const updatedBrand = await updateBrand(
          editingBrand.id,
          data as BrandRequest
        );
        setBrands(
          brands.map((brand) =>
            brand.id === updatedBrand.id ? updatedBrand : brand
          )
        );
        toast.success("Cập nhật brand thành công");
      } else {
        const newBrand = await createBrand(data as BrandRequest);
        setBrands([...brands, newBrand]);
        toast.success("Thêm brand thành công");
      }
      setIsModalOpen(false);
      setEditingBrand(null);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Thao tác thất bại",
      });
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Quản lý thương hiệu
      </h1>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Thêm thương hiệu
      </Button>
      <BrandTable
        brands={brands}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
      {hasNextPage && (
        <div className="mt-4 flex justify-center">
          <Button onClick={handleLoadMore} disabled={loading}>
            {loading ? "Đang tải..." : "Tải thêm"}
          </Button>
        </div>
      )}
      <BrandForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingBrand={editingBrand}
        onSubmit={handleSubmit}
      />
      <BrandDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        brand={viewingBrand}
      />
    </div>
  );
}
