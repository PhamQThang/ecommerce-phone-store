// /admin/components/OrderForm.tsx
import { Order } from "@/types/types";
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

interface OrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingOrder: Order | null;
  onSubmit: (data: Partial<Order>) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({
  open,
  onOpenChange,
  editingOrder,
  onSubmit,
}) => {
  const { register, handleSubmit, reset } = useForm<Partial<Order>>({
    defaultValues: editingOrder || {
      receiver_name: "",
      receiver_phone: "",
      receiver_address: "",
    },
  });

  React.useEffect(() => {
    if (editingOrder) {
      reset({
        receiver_name: editingOrder.receiver_name,
        receiver_phone: editingOrder.receiver_phone,
        receiver_address: editingOrder.receiver_address,
      });
    } else {
      reset({ receiver_name: "", receiver_phone: "", receiver_address: "" });
    }
  }, [editingOrder, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sửa thông tin giao hàng</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="receiver_name"
              className="block text-sm font-medium text-gray-700"
            >
              Họ tên người nhận
            </label>
            <Input
              id="receiver_name"
              {...register("receiver_name", {
                required: "Họ tên người nhận là bắt buộc",
              })}
              placeholder="Nhập họ tên người nhận"
            />
          </div>
          <div>
            <label
              htmlFor="receiver_phone"
              className="block text-sm font-medium text-gray-700"
            >
              Số điện thoại người nhận
            </label>
            <Input
              id="receiver_phone"
              {...register("receiver_phone", {
                required: "Số điện thoại là bắt buộc",
              })}
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div>
            <label
              htmlFor="receiver_address"
              className="block text-sm font-medium text-gray-700"
            >
              Địa chỉ người nhận
            </label>
            <Input
              id="receiver_address"
              {...register("receiver_address", {
                required: "Địa chỉ là bắt buộc",
              })}
              placeholder="Nhập địa chỉ"
            />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button type="submit">Cập nhật</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;
