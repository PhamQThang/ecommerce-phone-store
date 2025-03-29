// /admin/components/OrderTable.tsx
import { Order } from "@/types/types";
import { Customer } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, XCircle } from "lucide-react";
import { format } from "date-fns";

interface OrderTableProps {
  orders: Order[];
  customers: Customer[];
  onView: (order: Order) => void;
  onEdit: (order: Order) => void;
  onCancel: (id: number) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  customers,
  onView,
  onEdit,
  onCancel,
}) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="overflow-x-auto">
      {/* Hiển thị dạng bảng cho tablet và PC */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">ID</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Tổng giá trị</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="hidden lg:table-cell">
                Thời gian tạo
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                Thời gian cập nhật
              </TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="hidden md:table-cell">
                  {order.id}
                </TableCell>
                <TableCell>
                  {customers.find((cust) => cust.id === order.customer_id)
                    ?.name || "Không có"}
                </TableCell>
                <TableCell>{formatPrice(order.total_amount)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(order.updatedAt)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(order)}
                    >
                      <Eye className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Xem</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(order)}
                    >
                      <Pencil className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Sửa</span>
                    </Button>
                    {order.status !== "Cancelled" &&
                      order.status !== "Delivered" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onCancel(order.id)}
                        >
                          <XCircle className="h-4 w-4 sm:mr-1" />
                          <span className="hidden sm:inline">Hủy</span>
                        </Button>
                      )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Hiển thị dạng thẻ (card) cho mobile */}
      <div className="block sm:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">
                  {customers.find((cust) => cust.id === order.customer_id)
                    ?.name || "Không có"}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatPrice(order.total_amount)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(order)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(order)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                {order.status !== "Cancelled" &&
                  order.status !== "Delivered" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onCancel(order.id)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTable;
