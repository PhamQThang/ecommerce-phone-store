// /admin/products/page.tsx
"use client";

import { useState } from "react";
import { Product } from "@/types/types";
import { Category } from "@/types/types";
import { Supplier } from "@/types/types";
import { Button } from "@/components/ui/button";
import ProductTable from "@/components/admin/products/ProductTable";
import ProductForm from "@/components/admin/products/ProductForm";
import ProductDetailModal from "@/components/admin/products/ProductDetailModal";
import { toast } from "sonner";
import { mockCategories, mockProducts, mockSuppliers } from "@/data/_mockData";

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories] = useState<Category[]>(mockCategories);
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const handleView = (product: Product) => {
    setViewingProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((prod) => prod.id !== id));
    toast("Xóa sản phẩm thành công");
  };

  const handleSubmit = (data: Partial<Product>) => {
    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setProducts(
        products.map((prod) =>
          prod.id === updatedProduct.id ? updatedProduct : prod
        )
      );
      toast("Cập nhật sản phẩm thành công");
    } else {
      const newProduct: Product = {
        id: products.length + 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Product;
      setProducts([...products, newProduct]);
      toast("Thêm sản phẩm thành công");
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Quản lý sản phẩm
      </h1>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Thêm sản phẩm
      </Button>
      <ProductTable
        products={products}
        categories={categories}
        suppliers={suppliers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        categories={categories}
        suppliers={suppliers}
        editingProduct={editingProduct}
        onSubmit={handleSubmit}
      />
      <ProductDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        product={viewingProduct}
        categories={categories}
        suppliers={suppliers}
      />
    </div>
  );
}
