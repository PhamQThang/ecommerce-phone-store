// /admin/components/PromotionForm.tsx
import React, { useState } from "react";
import { Promotion } from "@/types/types";
import { Product } from "@/types/types";
import { Category } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

interface PromotionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  categories: Category[];
  editingPromotion: Promotion | null;
  onSubmit: (data: Partial<Promotion>) => void;
}

const PromotionForm: React.FC<PromotionFormProps> = ({
  open,
  onOpenChange,
  products,
  categories,
  editingPromotion,
  onSubmit,
}) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm<
    Partial<Promotion>
  >({
    defaultValues: editingPromotion || {
      name: "",
      type: "product",
      discount_type: "percent",
      discount_value: 0,
      start_date: "",
      end_date: "",
      quantity_limit: undefined,
      target_id: undefined,
      min_order_value: undefined,
      min_quantity: undefined,
    },
  });

  const type = watch("type");
  const discountType = watch("discount_type");

  React.useEffect(() => {
    if (editingPromotion) {
      reset(editingPromotion);
    } else {
      reset({
        name: "",
        type: "product",
        discount_type: "percent",
        discount_value: 0,
        start_date: "",
        end_date: "",
        quantity_limit: undefined,
        target_id: undefined,
        min_order_value: undefined,
        min_quantity: undefined,
      });
    }
  }, [editingPromotion, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingPromotion ? "Sửa khuyến mãi" : "Thêm khuyến mãi"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tên chương trình
            </label>
            <Input
              id="name"
              {...register("name", {
                required: "Tên chương trình là bắt buộc",
              })}
              placeholder="Nhập tên chương trình"
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Loại khuyến mãi
            </label>
            <Select
              onValueChange={(value) => setValue("type", value as any)}
              defaultValue={type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại khuyến mãi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">Theo sản phẩm</SelectItem>
                <SelectItem value="category">Theo danh mục</SelectItem>
                <SelectItem value="order">Theo đơn hàng</SelectItem>
                <SelectItem value="quantity">Theo số lượng</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(type === "product" || type === "category") && (
            <div>
              <label
                htmlFor="target_id"
                className="block text-sm font-medium text-gray-700"
              >
                Áp dụng cho
              </label>
              <Select
                onValueChange={(value) =>
                  setValue("target_id", parseInt(value))
                }
                defaultValue={editingPromotion?.target_id?.toString()}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={`Chọn ${type === "product" ? "sản phẩm" : "danh mục"}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {(type === "product" ? products : categories).map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <label
              htmlFor="discount_type"
              className="block text-sm font-medium text-gray-700"
            >
              Kiểu giảm giá
            </label>
            <Select
              onValueChange={(value) => setValue("discount_type", value as any)}
              defaultValue={discountType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn kiểu giảm giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percent">Phần trăm</SelectItem>
                <SelectItem value="fixed">Số tiền cố định</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="discount_value"
              className="block text-sm font-medium text-gray-700"
            >
              Giá trị giảm
            </label>
            <Input
              id="discount_value"
              type="number"
              {...register("discount_value", {
                valueAsNumber: true,
                required: "Giá trị giảm là bắt buộc",
              })}
              placeholder={
                discountType === "percent"
                  ? "Nhập phần trăm (0-100)"
                  : "Nhập số tiền (VNĐ)"
              }
            />
          </div>

          <div>
            <label
              htmlFor="start_date"
              className="block text-sm font-medium text-gray-700"
            >
              Thời gian bắt đầu
            </label>
            <Input
              id="start_date"
              type="datetime-local"
              {...register("start_date", {
                required: "Thời gian bắt đầu là bắt buộc",
              })}
            />
          </div>
          <div>
            <label
              htmlFor="end_date"
              className="block text-sm font-medium text-gray-700"
            >
              Thời gian kết thúc
            </label>
            <Input
              id="end_date"
              type="datetime-local"
              {...register("end_date", {
                required: "Thời gian kết thúc là bắt buộc",
              })}
            />
          </div>
          {(type === "product" ||
            type === "category" ||
            type === "quantity") && (
            <div>
              <label
                htmlFor="quantity_limit"
                className="block text-sm font-medium text-gray-700"
              >
                Số lượng tối đa
              </label>
              <Input
                id="quantity_limit"
                type="number"
                {...register("quantity_limit", { valueAsNumber: true })}
                placeholder="Nhập số lượng tối đa (tùy chọn)"
              />
            </div>
          )}
          {type === "order" && (
            <div>
              <label
                htmlFor="min_order_value"
                className="block text-sm font-medium text-gray-700"
              >
                Giá trị đơn hàng tối thiểu
              </label>
              <Input
                id="min_order_value"
                type="number"
                {...register("min_order_value", { valueAsNumber: true })}
                placeholder="Nhập giá trị đơn hàng tối thiểu (tùy chọn)"
              />
            </div>
          )}
          {type === "quantity" && (
            <div>
              <label
                htmlFor="min_quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Số lượng sản phẩm tối thiểu
              </label>
              <Input
                id="min_quantity"
                type="number"
                {...register("min_quantity", { valueAsNumber: true })}
                placeholder="Nhập số lượng sản phẩm tối thiểu (tùy chọn)"
              />
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button type="submit">
              {editingPromotion ? "Cập nhật" : "Thêm"}
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

export default PromotionForm;
