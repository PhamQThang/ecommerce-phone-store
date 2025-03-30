import { Brand, ProductModel } from "@/types/types";
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

interface BrandFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingBrand: Brand | null;
  productModels: ProductModel[];
  brands: Brand[];
  onSubmit: (data: Partial<Brand>) => void;
}

const BrandForm: React.FC<BrandFormProps> = ({
  open,
  onOpenChange,
  editingBrand,
  onSubmit,
}) => {
  const { register, handleSubmit, reset } = useForm<Partial<Brand>>({
    defaultValues: editingBrand || {
      name: "",
      slug: "",
    },
  });

  React.useEffect(() => {
    if (editingBrand) {
      reset({
        name: editingBrand.name,
        slug: editingBrand.slug,
      });
    } else {
      reset({ name: "", slug: "" });
    }
  }, [editingBrand, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingBrand ? "Sửa thương hiệu" : "Thêm thương hiệu"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên thương hiệu <span className="text-red-500">*</span>
            </label>
            <Input
              {...register("name", { required: "Tên thương hiệu là bắt buộc" })}
              placeholder="Nhập tên thương hiệu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slug <span className="text-red-500">*</span>
            </label>
            <Input
              {...register("slug", { required: "Slug là bắt buộc" })}
              placeholder="Nhập slug"
            />
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button type="submit">{editingBrand ? "Cập nhật" : "Thêm"}</Button>
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

export default BrandForm;
