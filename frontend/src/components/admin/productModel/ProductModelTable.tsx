import { ProductModel, Brand } from "@/types/types";
import { Pencil, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface ProductModelTableProps {
  models: ProductModel[];
  brands: Brand[]; // Thêm brands để tra cứu tên
  onEdit: (model: ProductModel) => void;
  onDelete: (id: string) => void;
  onView: (model: ProductModel) => void;
}

const ProductModelTable = ({
  models,
  brands,
  onEdit,
  onDelete,
  onView,
}: ProductModelTableProps) => {
  const formatDate = (dateString: string) =>
    format(new Date(dateString), "dd/MM/yyyy HH:mm");

  const getBrandName = (model: ProductModel) => {
    const brand = brands.find((b) => b.id === model.brand?.id);
    return brand ? brand.name : "-";
  };

  return (
    <div className="overflow-x-auto">
      {/* Desktop view */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Mã</TableHead>
              <TableHead>Thương hiệu</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Thời gian tạo</TableHead>
              <TableHead>Thời gian cập nhật</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model) => (
              <TableRow key={model.id}>
                <TableCell>{model.id}</TableCell>
                <TableCell>{model.name}</TableCell>
                <TableCell>{model.code}</TableCell>
                <TableCell>{getBrandName(model)}</TableCell>
                <TableCell>{model.description || "-"}</TableCell>
                <TableCell>{formatDate(model.createdAt)}</TableCell>
                <TableCell>{formatDate(model.updatedAt)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(model)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">Xem</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(model)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">Sửa</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(model.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">Xóa</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="block sm:hidden space-y-4">
        {models.map((model) => (
          <div key={model.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{model.name}</h3>
                <p className="text-sm text-gray-500">Mã: {model.code}</p>
                <p className="text-sm text-gray-500">
                  Thương hiệu: {getBrandName(model)}
                </p>
                <p className="text-sm text-gray-500">
                  Mô tả: {model.description || "-"}
                </p>
                <p className="text-sm text-gray-500">
                  Tạo: {formatDate(model.createdAt)}
                </p>
                <p className="text-sm text-gray-500">
                  Cập nhật: {formatDate(model.updatedAt)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(model)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(model)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(model.id)}
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

export default ProductModelTable;
