// /admin/components/SupplierForm.tsx
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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React from "react";

interface SupplierFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingSupplier: Supplier | null;
  onSubmit: (data: Partial<Supplier>) => void;
}

const SupplierForm: React.FC<SupplierFormProps> = ({
  open,
  onOpenChange,
  editingSupplier,
  onSubmit,
}) => {
  const { register, handleSubmit, reset } = useForm<Partial<Supplier>>({
    defaultValues: editingSupplier || {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
  });

  React.useEffect(() => {
    if (editingSupplier) {
      reset(editingSupplier);
    } else {
      reset({ name: "", email: "", phoneNumber: "", address: "" });
    }
  }, [editingSupplier, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingSupplier ? "Sửa nhà cung cấp" : "Thêm nhà cung cấp"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tên nhà cung cấp
            </label>
            <Input
              id="name"
              {...register("name", {
                required: "Tên nhà cung cấp là bắt buộc",
              })}
              placeholder="Nhập tên nhà cung cấp"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email là bắt buộc" })}
              placeholder="Nhập email"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Số điện thoại
            </label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber", {
                required: "Số điện thoại là bắt buộc",
              })}
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Địa chỉ
            </label>
            <Textarea
              id="address"
              {...register("address", { required: "Địa chỉ là bắt buộc" })}
              placeholder="Nhập địa chỉ"
              rows={3}
            />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button type="submit">
              {editingSupplier ? "Cập nhật" : "Thêm"}
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

export default SupplierForm;
