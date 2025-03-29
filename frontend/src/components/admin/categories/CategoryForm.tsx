// /admin/components/CategoryForm.tsx
import { Category } from "@/types/types";
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

interface CategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  editingCategory: Category | null;
  onSubmit: (data: Partial<Category>) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  open,
  onOpenChange,
  categories,
  editingCategory,
  onSubmit,
}) => {
  const { register, handleSubmit, setValue, reset } = useForm<
    Partial<Category>
  >({
    defaultValues: editingCategory || {
      name: "",
      description: "",
      parent_id: null,
    },
  });

  React.useEffect(() => {
    if (editingCategory) {
      reset(editingCategory);
    } else {
      reset({ name: "", description: "", parent_id: null });
    }
  }, [editingCategory, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? "Sửa danh mục" : "Thêm danh mục"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tên danh mục
            </label>
            <Input
              id="name"
              {...register("name", { required: "Tên danh mục là bắt buộc" })}
              placeholder="Nhập tên danh mục"
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
              htmlFor="parent_id"
              className="block text-sm font-medium text-gray-700"
            >
              Danh mục cha
            </label>
            <Select
              onValueChange={(value) =>
                setValue("parent_id", value ? parseInt(value) : null)
              }
              defaultValue={editingCategory?.parent_id?.toString() || undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục cha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">Không có</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button type="submit">
              {editingCategory ? "Cập nhật" : "Thêm"}
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

export default CategoryForm;
