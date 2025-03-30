import { ProductModel, Brand } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductModelFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingModel: ProductModel | null;
  brands: Brand[];
  onSubmit: (data: Partial<ProductModel>) => void;
}

const ProductModelForm: React.FC<ProductModelFormProps> = ({
  open,
  onOpenChange,
  editingModel,
  brands,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Partial<ProductModel>>({
    defaultValues: editingModel || {
      code: "",
      name: "",
      description: "",
      brand: undefined,
    },
  });

  React.useEffect(() => {
    if (editingModel) {
      reset(editingModel);
    } else {
      reset({
        code: "",
        name: "",
        description: "",
        brand: undefined,
      });
    }
  }, [editingModel, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingModel ? "Sửa model" : "Thêm model"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Mã model <span className="text-red-500">*</span>
            </label>
            <Input
              id="code"
              {...register("code", { required: "Mã model là bắt buộc" })}
              placeholder="Nhập mã model"
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tên model <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              {...register("name", { required: "Tên model là bắt buộc" })}
              placeholder="Nhập tên model"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Thương hiệu <span className="text-red-500">*</span>
            </label>
            {brands.length > 0 ? (
              <Select
                onValueChange={(value) => {
                  const selectedBrand = brands.find((b) => b.id === value);
                  setValue("brand", selectedBrand || undefined);
                }}
                defaultValue={editingModel?.brand?.id || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thương hiệu" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-gray-500">Chưa có thương hiệu</p>
            )}
            {errors.brand && (
              <p className="mt-1 text-sm text-red-500">
                {errors.brand.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Mô tả
            </label>
            <Input
              id="description"
              {...register("description")}
              placeholder="Nhập mô tả"
            />
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button type="submit">{editingModel ? "Cập nhật" : "Thêm"}</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModelForm;
