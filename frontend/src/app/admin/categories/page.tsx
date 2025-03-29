// /admin/categories/page.tsx
"use client";

import { useState } from "react";
import { Category } from "@/types/types";
import { Button } from "@/components/ui/button";
import CategoryTable from "@/components/admin/categories/CategoryTable";
import CategoryForm from "@/components/admin/categories/CategoryForm";
import CategoryDetailModal from "@/components/admin/categories/CategoryDetailModal";
import { toast } from "sonner";
import { mockCategories } from "@/data/_mockData";

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [viewingCategory, setViewingCategory] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleView = (category: Category) => {
    setViewingCategory(category);
    setIsDetailModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    toast("Xóa danh mục thành công");
  };

  const handleSubmit = (data: Partial<Category>) => {
    if (editingCategory) {
      const updatedCategory = {
        ...editingCategory,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setCategories(
        categories.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        )
      );
      toast("Cập nhật danh mục thành công");
    } else {
      const newCategory: Category = {
        id: categories.length + 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Category;
      setCategories([...categories, newCategory]);
      toast("Thêm danh mục thành công");
    }
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Quản lý danh mục
      </h1>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Thêm danh mục
      </Button>
      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView} // Truyền prop onView
      />
      <CategoryForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        categories={categories}
        editingCategory={editingCategory}
        onSubmit={handleSubmit}
      />
      <CategoryDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        category={viewingCategory}
        categories={categories}
      />
    </div>
  );
}
