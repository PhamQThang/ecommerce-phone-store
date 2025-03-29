// /admin/promotions/page.tsx
"use client";

import { useState } from "react";
import { Promotion } from "@/types/types";
import { Product } from "@/types/types";
import { Category } from "@/types/types";
import { Button } from "@/components/ui/button";
import PromotionTable from "@/components/admin/promotions/PromotionTable";
import PromotionForm from "@/components/admin/promotions/PromotionForm";
import PromotionDetailModal from "@/components/admin/promotions/PromotionDetailModal";
import { toast } from "sonner";
import { mockCategories, mockProducts, mockPromotions } from "@/data/_mockData";

export default function PromotionManagement() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [products] = useState<Product[]>(mockProducts);
  const [categories] = useState<Category[]>(mockCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(
    null
  );
  const [viewingPromotion, setViewingPromotion] = useState<Promotion | null>(
    null
  );

  const handleView = (promotion: Promotion) => {
    setViewingPromotion(promotion);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setPromotions(promotions.filter((promo) => promo.id !== id));
    toast("Xóa chương trình khuyến mãi thành công");
  };

  const handleSubmit = (data: Partial<Promotion>) => {
    if (editingPromotion) {
      const updatedPromotion = {
        ...editingPromotion,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setPromotions(
        promotions.map((promo) =>
          promo.id === updatedPromotion.id ? updatedPromotion : promo
        )
      );
      toast("Cập nhật chương trình khuyến mãi thành công");
    } else {
      const newPromotion: Promotion = {
        id: promotions.length + 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Promotion;
      setPromotions([...promotions, newPromotion]);
      toast("Thêm chương trình khuyến mãi thành công");
    }
    setIsModalOpen(false);
    setEditingPromotion(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Quản lý khuyến mãi
      </h1>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Thêm chương trình khuyến mãi
      </Button>
      <PromotionTable
        promotions={promotions}
        products={products}
        categories={categories}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <PromotionForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        products={products}
        categories={categories}
        editingPromotion={editingPromotion}
        onSubmit={handleSubmit}
      />
      <PromotionDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        promotion={viewingPromotion}
        products={products}
        categories={categories}
      />
    </div>
  );
}
