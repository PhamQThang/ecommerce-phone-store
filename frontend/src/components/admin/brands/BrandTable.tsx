import { Brand, ProductModel } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

interface BrandTableProps {
  brands: Brand[];
  onEdit: (brand: Brand) => void;
  onDelete: (id: string) => void;
  onView: (brand: Brand) => void;
}

const BrandTable = ({ brands, onEdit, onDelete, onView }: BrandTableProps) => {
  const formatDate = (dateString: string) =>
    format(new Date(dateString), "dd/MM/yyyy HH:mm");

  return (
    <div className="overflow-x-auto">
      {/* Desktop view */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Số lượng Model</TableHead>
              <TableHead>Thời gian tạo</TableHead>
              <TableHead>Thời gian cập nhật</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>{brand.id}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>{brand.slug}</TableCell>
                <TableCell>{brand.models.length}</TableCell>
                <TableCell>{formatDate(brand.createdAt)}</TableCell>
                <TableCell>{formatDate(brand.updatedAt)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(brand)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">Xem</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(brand)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">Sửa</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(brand.id)}
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
        {brands.map((brand) => (
          <div key={brand.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{brand.name}</h3>
                <p className="text-sm text-gray-500">Slug: {brand.slug}</p>
                <p className="text-sm text-gray-500">
                  Số model: {brand.models.length}
                </p>
                <p className="text-sm text-gray-500">
                  Tạo: {formatDate(brand.createdAt)}
                </p>
                <p className="text-sm text-gray-500">
                  Cập nhật: {formatDate(brand.updatedAt)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(brand)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(brand)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(brand.id)}
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

export default BrandTable;
