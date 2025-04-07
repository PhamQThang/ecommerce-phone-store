// components/admin/purchase-orders/PurchaseOrderTable.tsx
import { PurchaseOrder } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface PurchaseOrderTableProps {
  purchaseOrders: PurchaseOrder[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const PurchaseOrderTable: React.FC<PurchaseOrderTableProps> = ({
  purchaseOrders,
  onEdit,
  onDelete,
  onView,
}) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
  };

  return (
    <div className="overflow-x-auto">
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">ID</TableHead>
              <TableHead>Nhà cung cấp</TableHead>
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
            {purchaseOrders.map((purchaseOrder) => (
              <TableRow key={purchaseOrder.id}>
                <TableCell className="hidden md:table-cell">
                  {purchaseOrder.id}
                </TableCell>
                <TableCell>{purchaseOrder.supplier.name}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(purchaseOrder.createdAt)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(purchaseOrder.updatedAt)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(purchaseOrder.id)}
                    >
                      <Eye className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Xem</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(purchaseOrder.id)}
                    >
                      <Pencil className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Sửa</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(purchaseOrder.id)}
                    >
                      <Trash2 className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Xóa</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="block sm:hidden space-y-4">
        {purchaseOrders.map((purchaseOrder) => (
          <div
            key={purchaseOrder.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{purchaseOrder.supplier.name}</h3>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(purchaseOrder.id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(purchaseOrder.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(purchaseOrder.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseOrderTable;
