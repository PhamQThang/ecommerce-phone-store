// components/admin/purchase-orders/PurchaseOrderDetailModal.tsx
import { PurchaseOrder } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface PurchaseOrderDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchaseOrder: PurchaseOrder | null;
}

const PurchaseOrderDetailModal: React.FC<PurchaseOrderDetailModalProps> = ({
  open,
  onOpenChange,
  purchaseOrder,
}) => {
  if (!purchaseOrder) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn nhập hàng: {purchaseOrder.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">ID:</span>
            <span>{purchaseOrder.id}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Nhà cung cấp:</span>
            <span>{purchaseOrder.supplier.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Thời gian tạo:</span>
            <span>{formatDate(purchaseOrder.createdAt)}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">
              Thời gian cập nhật:
            </span>
            <span>{formatDate(purchaseOrder.updatedAt)}</span>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Danh sách sản phẩm:</h4>
            {purchaseOrder.productIdentites.length === 0 ? (
              <p className="text-gray-500">Chưa có sản phẩm nào.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">ID</th>
                      <th className="border p-2 text-left">Màu</th>
                      <th className="border p-2 text-left">IMEI</th>
                      <th className="border p-2 text-left">Trạng thái</th>
                      <th className="border p-2 text-left">Thời gian tạo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrder.productIdentites.map((item) => (
                      <tr key={item.id}>
                        <td className="border p-2">{item.id}</td>
                        <td className="border p-2">
                          {item.color?.name || "N/A"}
                        </td>
                        <td className="border p-2">{item.imei}</td>
                        <td className="border p-2">{item.status}</td>
                        <td className="border p-2">
                          {formatDate(item.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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

export default PurchaseOrderDetailModal;
