"use client";

import { useState, useEffect } from "react";
import { Brand, BrandRequest, ProductModel } from "@/types/types";
import { Button } from "@/components/ui/button";
import BrandTable from "@/components/admin/brands/BrandTable";
import BrandForm from "@/components/admin/brands/BrandForm";
import BrandDetailModal from "@/components/admin/brands/BrandDetailModal";
import ProductModelTable from "@/components/admin/productModel/ProductModelTable";
import ProductModelForm from "@/components/admin/productModel/ProductModelForm";
import ProductModelDetailModal from "@/components/admin/productModel/ProductModelDetailModal";
import { toast } from "sonner";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "@/api/admin/brandApi";
import {
  getProductModels,
  createProductModel,
  updateProductModel,
  deleteProductModel,
} from "@/api/admin/productModelApi";

export default function BrandManagement() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [productModels, setProductModels] = useState<ProductModel[]>([]);
  const [isBrandFormOpen, setIsBrandFormOpen] = useState(false);
  const [isBrandDetailModalOpen, setIsBrandDetailModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [viewingBrand, setViewingBrand] = useState<Brand | null>(null);
  const [isModelFormOpen, setIsModelFormOpen] = useState(false);
  const [isModelDetailModalOpen, setIsModelDetailModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<ProductModel | null>(null);
  const [viewingModel, setViewingModel] = useState<ProductModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasNextPageBrands, setHasNextPageBrands] = useState(false);
  const [hasNextPageModels, setHasNextPageModels] = useState(false);
  const [pageBrands, setPageBrands] = useState(1);
  const [pageModels, setPageModels] = useState(1);
  const limit = 10;

  const fetchData = async (brandPage: number, modelPage: number) => {
    setLoading(true);
    try {
      const [brandsResponse, modelsResponse] = await Promise.all([
        getBrands({ page: brandPage, limit }),
        getProductModels({ page: modelPage, limit }),
      ]);

      if (brandPage === 1) {
        setBrands(brandsResponse.data);
      } else {
        setBrands((prev) => [...prev, ...brandsResponse.data]);
      }
      setHasNextPageBrands(brandsResponse.hasNextPage);

      const enrichedModels = modelsResponse.data.map((model) => {
        const brand = brandsResponse.data.find((b) =>
          b.models.some((m) => m.id === model.id)
        );
        return {
          ...model,
          brand: brand ? { id: brand.id, name: brand.name } : undefined,
        };
      });

      if (modelPage === 1) {
        setProductModels(enrichedModels);
      } else {
        setProductModels((prev) => [...prev, ...enrichedModels]);
      }
      setHasNextPageModels(modelsResponse.hasNextPage);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Lấy dữ liệu thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pageBrands, pageModels);
  }, [pageBrands, pageModels]);

  const handleAddNewBrand = () => {
    setEditingBrand(null);
    setIsBrandFormOpen(true);
  };

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
    setIsBrandFormOpen(true);
  };

  const handleViewBrand = (brand: Brand) => {
    setViewingBrand(brand);
    setIsBrandDetailModalOpen(true);
  };

  const handleDeleteBrand = async (id: string) => {
    try {
      await deleteBrand(id);
      setBrands(brands.filter((brand) => brand.id !== id));
      toast.success("Xóa thương hiệu thành công");
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Xóa thương hiệu thất bại",
      });
    }
  };

  const handleBrandSubmit = async (data: Partial<Brand>) => {
    try {
      if (editingBrand) {
        // Khi sửa thương hiệu: Cho phép sửa name và slug, giữ nguyên models
        const updatedBrand = await updateBrand(editingBrand.id, {
          name: data.name || "",
          slug: data.slug || "",
          models: editingBrand.models,
        });
        setBrands(
          brands.map((b) => (b.id === updatedBrand.id ? updatedBrand : b))
        );
        toast.success("Cập nhật thương hiệu thành công");
        setIsBrandFormOpen(false);
      } else {
        // Khi thêm thương hiệu: Chỉ gửi name, slug, và models là mảng rỗng
        const brandData: BrandRequest = {
          name: data.name || "",
          slug: data.slug || "",
          models: [],
        };
        const newBrand = await createBrand(brandData);
        setBrands([...brands, newBrand]);
        toast.success("Thêm thương hiệu thành công");
        setIsBrandFormOpen(false);
      }
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Thao tác thất bại",
      });
    }
  };

  const handleLoadMoreBrands = () => {
    setPageBrands((prev) => prev + 1);
  };

  const handleAddNewModel = () => {
    setEditingModel(null);
    setIsModelFormOpen(true);
  };

  const handleEditModel = (model: ProductModel) => {
    setEditingModel(model);
    setIsModelFormOpen(true);
  };

  const handleViewModel = (model: ProductModel) => {
    setViewingModel(model);
    setIsModelDetailModalOpen(true);
  };

  const handleDeleteModel = async (id: string) => {
    try {
      await deleteProductModel(id);
      setProductModels(productModels.filter((model) => model.id !== id));
      setBrands((prevBrands) =>
        prevBrands.map((brand) => ({
          ...brand,
          models: brand.models.filter((m) => m.id !== id),
        }))
      );
      toast.success("Xóa model thành công");
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Xóa model thất bại",
      });
    }
  };

  const handleModelSubmit = async (data: Partial<ProductModel>) => {
    try {
      if (editingModel) {
        const previousBrandId = editingModel.brand?.id;
        const newBrandId = data.brand?.id;

        const updatedModel = await updateProductModel(editingModel.id, {
          code: data.code || "",
          name: data.name || "",
          description: data.description || "",
          brand: data.brand ? { id: data.brand.id } : undefined,
        });

        const enrichedModel = {
          ...updatedModel,
          brand: brands.find((b) => b.id === updatedModel.brand?.id),
        };

        setProductModels(
          productModels.map((m) =>
            m.id === enrichedModel.id ? enrichedModel : m
          )
        );

        if (previousBrandId !== newBrandId) {
          setBrands((prevBrands) =>
            prevBrands.map((brand) => {
              if (brand.id === previousBrandId) {
                return {
                  ...brand,
                  models: brand.models.filter((m) => m.id !== enrichedModel.id),
                };
              } else if (brand.id === newBrandId) {
                return {
                  ...brand,
                  models: [...brand.models, enrichedModel],
                };
              }
              return brand;
            })
          );
        }

        toast.success("Cập nhật model thành công");
        setIsModelFormOpen(false);
      } else {
        const newModel = await createProductModel({
          code: data.code || "",
          name: data.name || "",
          description: data.description || "",
          brand: data.brand ? { id: data.brand.id } : undefined,
        });

        const enrichedModel = {
          ...newModel,
          brand: brands.find((b) => b.id === newModel.brand?.id),
        };

        setProductModels([...productModels, enrichedModel]);
        setBrands((prevBrands) =>
          prevBrands.map((brand) =>
            brand.id === newModel.brand?.id
              ? { ...brand, models: [...brand.models, enrichedModel] }
              : brand
          )
        );

        toast.success("Thêm model thành công");
        setIsModelFormOpen(false);
      }
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Thao tác thất bại",
      });
    }
  };

  const handleLoadMoreModels = () => {
    setPageModels((prev) => prev + 1);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
        Quản lý thương hiệu và model
      </h1>

      {/* Brand Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách thương hiệu</h2>
          <Button onClick={handleAddNewBrand}>Thêm thương hiệu</Button>
        </div>
        <BrandTable
          brands={brands}
          onEdit={handleEditBrand}
          onDelete={handleDeleteBrand}
          onView={handleViewBrand}
        />
        {hasNextPageBrands && (
          <div className="mt-4 flex justify-center">
            <Button onClick={handleLoadMoreBrands} disabled={loading}>
              {loading ? "Đang tải..." : "Tải thêm thương hiệu"}
            </Button>
          </div>
        )}
      </div>

      {/* Model Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách model</h2>
          <Button onClick={handleAddNewModel}>Thêm model</Button>
        </div>
        <ProductModelTable
          models={productModels}
          brands={brands}
          onEdit={handleEditModel}
          onDelete={handleDeleteModel}
          onView={handleViewModel}
        />
        {hasNextPageModels && (
          <div className="mt-4 flex justify-center">
            <Button onClick={handleLoadMoreModels} disabled={loading}>
              {loading ? "Đang tải..." : "Tải thêm model"}
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <BrandForm
        open={isBrandFormOpen}
        onOpenChange={setIsBrandFormOpen}
        editingBrand={editingBrand}
        productModels={productModels}
        brands={brands}
        onSubmit={handleBrandSubmit}
      />
      <BrandDetailModal
        open={isBrandDetailModalOpen}
        onOpenChange={setIsBrandDetailModalOpen}
        brand={viewingBrand}
      />
      <ProductModelForm
        open={isModelFormOpen}
        onOpenChange={setIsModelFormOpen}
        editingModel={editingModel}
        brands={brands}
        onSubmit={handleModelSubmit}
      />
      <ProductModelDetailModal
        open={isModelDetailModalOpen}
        onOpenChange={setIsModelDetailModalOpen}
        model={viewingModel}
        brands={brands}
      />
    </div>
  );
}
