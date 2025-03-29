// /admin/components/PromotionTable.tsx
import { Promotion } from "@/types/types";
import { Product } from "@/types/types";
import { Category } from "@/types/types";
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

interface PromotionTableProps {
  promotions: Promotion[];
  products: Product[];
  categories: Category[];
  onView: (promotion: Promotion) => void;
  onEdit: (promotion: Promotion) => void;
  onDelete: (id: number) => void;
}

const PromotionTable: React.FC<PromotionTableProps> = ({
  promotions,
  products,
  categories,
  onView,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
  };

  const formatDiscount = (promotion: Promotion) => {
    if (promotion.discount_type === "percent") {
      return `${promotion.discount_value}%`;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(promotion.discount_value);
  };

  const getTargetName = (promotion: Promotion) => {
    if (promotion.type === "product") {
      return (
        products.find((prod) => prod.id === promotion.target_id)?.name ||
        "Không có"
      );
    }
    if (promotion.type === "category") {
      return (
        categories.find((cat) => cat.id === promotion.target_id)?.name ||
        "Không có"
      );
    }
    return "Toàn bộ đơn hàng";
  };

  return (
    <div className="overflow-x-auto">
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">ID</TableHead>
              <TableHead>Tên chương trình</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Áp dụng cho</TableHead>
              <TableHead>Giảm giá</TableHead>
              <TableHead className="hidden lg:table-cell">
                Thời gian bắt đầu
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                Thời gian kết thúc
              </TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.map((promotion) => (
              <TableRow key={promotion.id}>
                <TableCell className="hidden md:table-cell">
                  {promotion.id}
                </TableCell>
                <TableCell>{promotion.name}</TableCell>
                <TableCell>{promotion.type}</TableCell>
                <TableCell>{getTargetName(promotion)}</TableCell>
                <TableCell>{formatDiscount(promotion)}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(promotion.start_date)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(promotion.end_date)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(promotion)}
                    >
                      <Eye className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Xem</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(promotion)}
                    >
                      <Pencil className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Sửa</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(promotion.id)}
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
        {promotions.map((promotion) => (
          <div key={promotion.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{promotion.name}</h3>
                <p className="text-sm text-gray-500">
                  {getTargetName(promotion)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDiscount(promotion)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(promotion)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(promotion)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(promotion.id)}
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

export default PromotionTable;
