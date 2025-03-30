// /components/admin/brands/BrandForm.tsx
import { Brand } from "@/types/types";
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
      models: [],
    },
  });

  React.useEffect(() => {
    if (editingBrand) {
      reset(editingBrand);
    } else {
      reset({ name: "", slug: "", models: [] });
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
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tên thương hiệu
            </label>
            <Input
              id="name"
              {...register("name", { required: "Tên thương hiệu là bắt buộc" })}
              placeholder="Nhập tên thương hiệu"
            />
          </div>
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700"
            >
              Slug
            </label>
            <Input
              id="slug"
              {...register("slug", { required: "Slug là bắt buộc" })}
              placeholder="Nhập slug"
            />
          </div>
          {/* <div>
            <label
              htmlFor="models"
              className="block text-sm font-medium text-gray-700"
            >
              Models (cách nhau bởi dấu phẩy)
            </label>
            <Input
              id="models"
              {...register("models")}
              placeholder="Nhập models (ví dụ: model1, model2)"
              defaultValue={editingBrand?.models?.join(", ") || ""}
            />
          </div> */}
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button type="submit">{editingBrand ? "Cập nhật" : "Thêm"}</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrandForm;
