// app/admin/colors/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  getColors,
  createColor,
  updateColor,
  deleteColor,
} from "@/api/admin/colorApi";
import { Color } from "@/types/types";
import ColorTable from "@/components/admin/colors/ColorTable";
import ColorForm from "@/components/admin/colors/ColorForm";
import ColorDetailModal from "@/components/admin/colors/ColorDetailModal";

export default function ColorManagement() {
  const [colors, setColors] = useState<Color[]>([]);
  const [isColorFormOpen, setIsColorFormOpen] = useState(false);
  const [isColorDetailModalOpen, setIsColorDetailModalOpen] = useState(false);
  const [editingColor, setEditingColor] = useState<Color | null>(null);
  const [viewingColor, setViewingColor] = useState<Color | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Hàm lấy danh sách màu
  const fetchColors = async (page: number) => {
    setLoading(true);
    try {
      const response = await getColors({ page, limit });
      if (page === 1) {
        setColors(response.data);
      } else {
        setColors((prev) => [...prev, ...response.data]);
      }
      setHasNextPage(response.hasNextPage);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Lấy danh sách màu thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi page thay đổi
  useEffect(() => {
    fetchColors(page);
  }, [page]);

  // Mở form để thêm màu mới
  const handleAddNewColor = () => {
    setEditingColor(null);
    setIsColorFormOpen(true);
  };

  // Mở form để sửa màu
  const handleEditColor = (color: Color) => {
    setEditingColor(color);
    setIsColorFormOpen(true);
  };

  // Mở modal để xem chi tiết màu
  const handleViewColor = (color: Color) => {
    setViewingColor(color);
    setIsColorDetailModalOpen(true);
  };

  // Xóa màu
  const handleDeleteColor = async (id: string) => {
    try {
      await deleteColor(id);
      setColors(colors.filter((color) => color.id !== id));
      toast.success("Xóa màu thành công");
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Xóa màu thất bại",
      });
    }
  };

  // Xử lý submit form
  const handleColorSubmit = async (data: Partial<Color>) => {
    try {
      if (editingColor) {
        // Cập nhật màu
        const updatedColor = await updateColor(editingColor.id, {
          name: data.name || "",
        });
        setColors(
          colors.map((c) => (c.id === updatedColor.id ? updatedColor : c))
        );
        toast.success("Cập nhật màu thành công");
      } else {
        // Thêm màu mới
        const newColor = await createColor({
          name: data.name || "",
        });
        setColors([...colors, newColor]);
        toast.success("Thêm màu thành công");
      }
      setIsColorFormOpen(false);
      // Reset page về 1 để làm mới danh sách
      setPage(1);
      setColors([]);
      fetchColors(1);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Thao tác thất bại",
      });
    }
  };

  // Tải thêm màu
  const handleLoadMoreColors = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Quản lý màu sắc
      </h1>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách màu sắc</h2>
          <Button onClick={handleAddNewColor}>Thêm màu sắc</Button>
        </div>
        {colors.length === 0 && !loading ? (
          <p className="text-gray-500">Chưa có màu sắc nào.</p>
        ) : (
          <ColorTable
            colors={colors}
            onEdit={handleEditColor}
            onDelete={handleDeleteColor}
            onView={handleViewColor}
          />
        )}
        {hasNextPage && (
          <div className="mt-4 flex justify-center">
            <Button onClick={handleLoadMoreColors} disabled={loading}>
              {loading ? "Đang tải..." : "Tải thêm màu sắc"}
            </Button>
          </div>
        )}
      </div>

      <ColorForm
        open={isColorFormOpen}
        onOpenChange={setIsColorFormOpen}
        editingColor={editingColor}
        onSubmit={handleColorSubmit}
      />
      <ColorDetailModal
        open={isColorDetailModalOpen}
        onOpenChange={setIsColorDetailModalOpen}
        color={viewingColor}
      />
    </div>
  );
}
