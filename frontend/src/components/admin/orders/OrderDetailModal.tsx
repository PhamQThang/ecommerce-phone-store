// /admin/components/OrderDetailModal.tsx
import { Order, OrderDetail } from "@/types/types";
import { Customer } from "@/types/types";
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

interface OrderDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  orderDetails: OrderDetail[];
  customers: Customer[];
  products: Product[];
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  open,
  onOpenChange,
  order,
  orderDetails,
  customers,
  products,
}) => {
  if (!order) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const customer = customers.find((cust) => cust.id === order.customer_id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng: #{order.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">ID:</span>
            <span>{order.id}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Khách hàng:</span>
            <span>{customer ? customer.name : "Không có"}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Tổng giá trị:</span>
            <span>{formatPrice(order.total_amount)}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Trạng thái:</span>
            <span>{order.status}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">
              Họ tên người nhận:
            </span>
            <span>{order.receiver_name}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Số điện thoại:</span>
            <span>{order.receiver_phone}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Địa chỉ:</span>
            <span>{order.receiver_address}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Thời gian tạo:</span>
            <span>{formatDate(order.createdAt)}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">
              Thời gian cập nhật:
            </span>
            <span>{formatDate(order.updatedAt)}</span>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Chi tiết đơn hàng</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Giá bán</TableHead>
                    <TableHead>Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderDetails
                    .filter((detail) => detail.order_id === order.id)
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

export default OrderDetailModal;
