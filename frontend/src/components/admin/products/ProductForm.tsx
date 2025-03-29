// /admin/components/ProductForm.tsx
import { Product } from "@/types/types";
import { Category } from "@/types/types";
import { Supplier } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React from "react";

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  suppliers: Supplier[];
  editingProduct: Product | null;
  onSubmit: (data: Partial<Product>) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  open,
  onOpenChange,
  categories,
  suppliers,
  editingProduct,
  onSubmit,
}) => {
  const { register, handleSubmit, setValue, reset } = useForm<Partial<Product>>(
    {
      defaultValues: editingProduct || {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category_id: 0,
        supplier_id: 0,
      },
    }
  );

  React.useEffect(() => {
    if (editingProduct) {
      reset(editingProduct);
    } else {
      reset({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category_id: 0,
        supplier_id: 0,
      });
    }
  }, [editingProduct, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tên sản phẩm
            </label>
            <Input
              id="name"
              {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Mô tả
            </label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Nhập mô tả (không bắt buộc)"
              rows={3}
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Giá
            </label>
            <Input
              id="price"
              type="number"
              {...register("price", {
                required: "Giá là bắt buộc",
                valueAsNumber: true,
              })}
              placeholder="Nhập giá sản phẩm"
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Số lượng
            </label>
            <Input
              id="stock"
              type="number"
              {...register("stock", {
                required: "Số lượng là bắt buộc",
                valueAsNumber: true,
              })}
              placeholder="Nhập số lượng"
            />
          </div>
          <div>
            <label
              htmlFor="category_id"
              className="block text-sm font-medium text-gray-700"
            >
              Danh mục
            </label>
            <Select
              onValueChange={(value) =>
                setValue("category_id", parseInt(value))
              }
              defaultValue={
                editingProduct?.category_id?.toString() || undefined
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="supplier_id"
              className="block text-sm font-medium text-gray-700"
            >
              Nhà cung cấp
            </label>
            <Select
              onValueChange={(value) =>
                setValue("supplier_id", parseInt(value))
              }
              defaultValue={
                editingProduct?.supplier_id?.toString() || undefined
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn nhà cung cấp" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((sup) => (
                  <SelectItem key={sup.id} value={sup.id.toString()}>
                    {sup.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button type="submit">
              {editingProduct ? "Cập nhật" : "Thêm"}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
