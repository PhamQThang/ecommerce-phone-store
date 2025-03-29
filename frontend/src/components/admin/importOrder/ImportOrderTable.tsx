// /admin/components/ImportOrderTable.tsx
import { ImportOrder } from "@/types/types";
import { Supplier } from "@/types/types";
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

interface ImportOrderTableProps {
  importOrders: ImportOrder[];
  suppliers: Supplier[];
  onView: (importOrder: ImportOrder) => void;
  onEdit: (importOrder: ImportOrder) => void;
  onDelete: (id: number) => void;
}

const ImportOrderTable: React.FC<ImportOrderTableProps> = ({
  importOrders,
  suppliers,
  onView,
  onEdit,
  onDelete,
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
              <TableHead>Nhà cung cấp</TableHead>
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
            {importOrders.map((importOrder) => (
              <TableRow key={importOrder.id}>
                <TableCell className="hidden md:table-cell">
                  {importOrder.id}
                </TableCell>
                <TableCell>
                  {suppliers.find((sup) => sup.id === importOrder.supplier_id)
                    ?.name || "Không có"}
                </TableCell>
                <TableCell>{formatPrice(importOrder.total_amount)}</TableCell>
                <TableCell>{importOrder.status}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(importOrder.createdAt)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(importOrder.updatedAt)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(importOrder)}
                    >
                      <Eye className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Xem</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(importOrder)}
                    >
                      <Pencil className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Sửa</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(importOrder.id)}
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

      {/* Hiển thị dạng thẻ (card) cho mobile */}
      <div className="block sm:hidden space-y-4">
        {importOrders.map((importOrder) => (
          <div key={importOrder.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">
                  {suppliers.find((sup) => sup.id === importOrder.supplier_id)
                    ?.name || "Không có"}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatPrice(importOrder.total_amount)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(importOrder)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(importOrder)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(importOrder.id)}
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

export default ImportOrderTable;
