// /admin/components/ImportOrderDetailModal.tsx
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
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface ImportOrderDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importOrder: ImportOrder | null;
  importOrderDetails: ImportOrderDetail[];
  suppliers: Supplier[];
  products: Product[];
}

const ImportOrderDetailModal: React.FC<ImportOrderDetailModalProps> = ({
  open,
  onOpenChange,
  importOrder,
  importOrderDetails,
  suppliers,
  products,
}) => {
  if (!importOrder) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const supplier = suppliers.find((sup) => sup.id === importOrder.supplier_id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn nhập hàng: #{importOrder.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">ID:</span>
            <span>{importOrder.id}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Nhà cung cấp:</span>
            <span>{supplier ? supplier.name : "Không có"}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Tổng giá trị:</span>
            <span>{formatPrice(importOrder.total_amount)}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Trạng thái:</span>
            <span>{importOrder.status}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Thời gian tạo:</span>
            <span>{formatDate(importOrder.createdAt)}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">
              Thời gian cập nhật:
            </span>
            <span>{formatDate(importOrder.updatedAt)}</span>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Chi tiết đơn nhập</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Giá nhập</TableHead>
                    <TableHead>Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {importOrderDetails
                    .filter(
                      (detail) => detail.import_order_id === importOrder.id
                    )
                    .map((detail) => (
                      <TableRow key={detail.id}>
                        <TableCell>
                          {products.find(
                            (prod) => prod.id === detail.product_id
                          )?.name || "Không có"}
                        </TableCell>
                        <TableCell>{detail.quantity}</TableCell>
                        <TableCell>{formatPrice(detail.unit_price)}</TableCell>
                        <TableCell>
                          {formatPrice(detail.quantity * detail.unit_price)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
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

export default ImportOrderDetailModal;
