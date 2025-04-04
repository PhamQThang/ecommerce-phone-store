// app/admin/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProductTable from "@/components/admin/products/ProductTable";
import ProductForm from "@/components/admin/products/ProductForm";
import ProductDetailModal from "@/components/admin/products/ProductDetailModal";
import { toast } from "sonner";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/api/admin/productApi";
import { Product } from "@/types/types";

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isProductDetailModalOpen, setIsProductDetailModalOpen] =
    useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Hàm lấy danh sách sản phẩm
  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await getProducts({ page, limit });
      if (page === 1) {
        setProducts(response.data);
      } else {
        setProducts((prev) => [...prev, ...response.data]);
      }
      setHasNextPage(response.hasNextPage);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Lấy danh sách sản phẩm thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi page thay đổi
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  // Mở form để thêm sản phẩm mới
  const handleAddNewProduct = () => {
    setEditingProduct(null);
    setIsProductFormOpen(true);
  };

  // Mở form để sửa sản phẩm
  const handleEditProduct = async (product: Product) => {
    try {
      const productData = await getProductById(product.id);
      setEditingProduct(productData);
      setIsProductFormOpen(true);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Lấy thông tin sản phẩm thất bại",
      });
    }
  };

  // Mở modal để xem chi tiết sản phẩm
  const handleViewProduct = async (product: Product) => {
    try {
      const productData = await getProductById(product.id);
      setViewingProduct(productData);
      setIsProductDetailModalOpen(true);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Lấy thông tin sản phẩm thất bại",
      });
    }
  };

  // Xóa sản phẩm
  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Xóa sản phẩm thành công");
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Xóa sản phẩm thất bại",
      });
    }
  };

  const handleProductSubmit = async (data: Partial<Product>) => {
    try {
      if (editingProduct) {
        // Sửa sản phẩm
        const updatedProduct = await updateProduct(editingProduct.id, {
          name: data.name || "",
          slug: data.slug || "",
          basePrice: data.basePrice || 0,
          screenSize: data.screenSize || 0,
          pin: data.pin || 0,
          screenTechnology: data.screenTechnology || "",
          chipset: data.chipset || "",
          os: data.os || "",
          storage: data.storage || 0,
          ram: data.ram || 0,
          model: data.model || { id: "" },
          identities: data.identities || [],
          images: data.images || [],
        });
        setProducts(
          products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
        toast.success("Cập nhật sản phẩm thành công");
      } else {
        // Thêm sản phẩm mới
        const newProduct = await createProduct({
          name: data.name || "",
          slug: data.slug || "",
          basePrice: data.basePrice || 0,
          screenSize: data.screenSize || 0,
          pin: data.pin || 0,
          screenTechnology: data.screenTechnology || "",
          chipset: data.chipset || "",
          os: data.os || "",
          storage: data.storage || 0,
          ram: data.ram || 0,
          model: data.model || { id: "" },
          identities: data.identities || [],
          images: data.images || [],
        });
        setProducts([...products, newProduct]);
        toast.success("Thêm sản phẩm thành công");
      }
      setIsProductFormOpen(false);
      // Reset page về 1 để làm mới danh sách
      setPage(1);
      setProducts([]);
      fetchProducts(1);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Thao tác thất bại",
      });
    }
  };

  // Tải thêm sản phẩm
  const handleLoadMoreProducts = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Quản lý sản phẩm
      </h1>

      {/* Product Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách sản phẩm</h2>
          <Button onClick={handleAddNewProduct}>Thêm sản phẩm</Button>
        </div>
        {products.length === 0 && !loading ? (
          <p className="text-gray-500">Chưa có sản phẩm nào.</p>
        ) : (
          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onView={handleViewProduct}
          />
        )}
        {hasNextPage && (
          <div className="mt-4 flex justify-center">
            <Button onClick={handleLoadMoreProducts} disabled={loading}>
              {loading ? "Đang tải..." : "Tải thêm sản phẩm"}
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProductForm
        open={isProductFormOpen}
        onOpenChange={setIsProductFormOpen}
        editingProduct={editingProduct}
        onSubmit={handleProductSubmit}
      />
      <ProductDetailModal
        open={isProductDetailModalOpen}
        onOpenChange={setIsProductDetailModalOpen}
        product={viewingProduct}
      />
    </div>
  );
}
