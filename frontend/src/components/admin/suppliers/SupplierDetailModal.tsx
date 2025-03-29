// /admin/components/SupplierDetailModal.tsx
import { Supplier } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface SupplierDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier: Supplier | null;
}

const SupplierDetailModal: React.FC<SupplierDetailModalProps> = ({
  open,
  onOpenChange,
  supplier,
}) => {
  if (!supplier) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chi tiết nhà cung cấp: {supplier.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">ID:</span>
            <span>{supplier.id}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">
              Tên nhà cung cấp:
            </span>
            <span>{supplier.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Email:</span>
            <span>{supplier.email}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Số điện thoại:</span>
            <span>{supplier.phoneNumber}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Địa chỉ:</span>
            <span>{supplier.address}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Thời gian tạo:</span>
            <span>{formatDate(supplier.createdAt)}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">
              Thời gian cập nhật:
            </span>
            <span>{formatDate(supplier.updatedAt)}</span>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierDetailModal;
