// /admin/components/ImportOrderForm.tsx
import React, { useState } from "react";
import { ImportOrder, ImportOrderDetail } from "@/types/types";
import { Supplier } from "@/types/types";
import { Product } from "@/types/types";
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
import { useForm, useFieldArray } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";

interface ImportOrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suppliers: Supplier[];
  products: Product[];
  editingImportOrder: ImportOrder | null;
  editingImportOrderDetails: ImportOrderDetail[];
  onSubmit: (data: {
    importOrder: Partial<ImportOrder>;
    details: ImportOrderDetail[];
  }) => void;
}

const ImportOrderForm: React.FC<ImportOrderFormProps> = ({
  open,
  onOpenChange,
  suppliers,
  products,
  editingImportOrder,
  editingImportOrderDetails,
  onSubmit,
}) => {
  const { register, handleSubmit, setValue, control, reset } = useForm<{
    importOrder: Partial<ImportOrder>;
    details: ImportOrderDetail[];
  }>({
    defaultValues: editingImportOrder
      ? { importOrder: editingImportOrder, details: editingImportOrderDetails }
      : {
          importOrder: { supplier_id: 0, status: "Pending", total_amount: 0 },
          details: [],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const [totalAmount, setTotalAmount] = useState(
    editingImportOrder?.total_amount || 0
  );

  React.useEffect(() => {
    if (editingImportOrder) {
      reset({
        importOrder: editingImportOrder,
        details: editingImportOrderDetails,
      });
      setTotalAmount(editingImportOrder.total_amount);
    } else {
      reset({
        importOrder: { supplier_id: 0, status: "Pending", total_amount: 0 },
        details: [],
      });
      setTotalAmount(0);
    }
  }, [editingImportOrder, editingImportOrderDetails, reset]);

  const handleAddDetail = () => {
    append({
      id: 0,
      import_order_id: 0,
      product_id: 0,
      quantity: 1,
      unit_price: 0,
      createdAt: "",
      updatedAt: "",
    });
  };

  const handleDetailChange = (
    index: number,
    field: keyof ImportOrderDetail,
    value: any
  ) => {
    const updatedDetails = [...fields];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };

    if (field === "product_id") {
      const product = products.find((p) => p.id === parseInt(value));
      if (product) {
        updatedDetails[index].unit_price = product.price;
      }
    }

    const newTotal = updatedDetails.reduce((sum, detail) => {
      return sum + (detail.quantity || 0) * (detail.unit_price || 0);
    }, 0);

    setTotalAmount(newTotal);
    setValue("importOrder.total_amount", newTotal);
  };

  const onFormSubmit = (data: {
    importOrder: Partial<ImportOrder>;
    details: ImportOrderDetail[];
  }) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingImportOrder ? "Sửa đơn nhập hàng" : "Thêm đơn nhập hàng"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="supplier_id"
              className="block text-sm font-medium text-gray-700"
            >
              Nhà cung cấp
            </label>
            <Select
              onValueChange={(value) =>
                setValue("importOrder.supplier_id", parseInt(value))
              }
              defaultValue={
                editingImportOrder?.supplier_id?.toString() || undefined
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
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Trạng thái
            </label>
            <Select
              onValueChange={(value) => setValue("importOrder.status", value)}
              defaultValue={editingImportOrder?.status || "Pending"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chi tiết đơn nhập
            </label>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
                >
                  <Select
                    onValueChange={(value) => {
                      setValue(`details.${index}.product_id`, parseInt(value));
                      handleDetailChange(index, "product_id", parseInt(value));
                    }}
                    defaultValue={field.product_id?.toString() || undefined}
                  >
                    <SelectTrigger className="w-full sm:w-1/3">
                      <SelectValue placeholder="Chọn sản phẩm" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((prod) => (
                        <SelectItem key={prod.id} value={prod.id.toString()}>
                          {prod.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Số lượng"
                    {...register(`details.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    onChange={(e) =>
                      handleDetailChange(
                        index,
                        "quantity",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full sm:w-1/4"
                  />
                  <Input
                    type="number"
                    placeholder="Giá nhập"
                    {...register(`details.${index}.unit_price`, {
                      valueAsNumber: true,
                    })}
                    onChange={(e) =>
                      handleDetailChange(
                        index,
                        "unit_price",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full sm:w-1/4"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      remove(index);
                      handleDetailChange(index, "quantity", 0); // Recalculate total
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={handleAddDetail}>
                <Plus className="h-4 w-4 mr-1" />
                Thêm sản phẩm
              </Button>
            </div>
          </div>
          <div>
            <label
              htmlFor="total_amount"
              className="block text-sm font-medium text-gray-700"
            >
              Tổng giá trị
            </label>
            <Input
              id="total_amount"
              type="number"
              {...register("importOrder.total_amount", { valueAsNumber: true })}
              value={totalAmount}
              readOnly
            />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button type="submit">
              {editingImportOrder ? "Cập nhật" : "Thêm"}
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

export default ImportOrderForm;
