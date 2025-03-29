// /admin/components/ProductTable.tsx
import { Product } from "@/types/types";
import { Category } from "@/types/types";
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

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  suppliers: Supplier[];
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  categories,
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
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead className="hidden md:table-cell">Số lượng</TableHead>
              <TableHead className="hidden lg:table-cell">Danh mục</TableHead>
              <TableHead className="hidden lg:table-cell">
                Nhà cung cấp
              </TableHead>
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
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="hidden md:table-cell">
                  {product.id}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.stock}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {categories.find((cat) => cat.id === product.category_id)
                    ?.name || "Không có"}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {suppliers.find((sup) => sup.id === product.supplier_id)
                    ?.name || "Không có"}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(product.createdAt)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(product.updatedAt)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(product)}
                    >
                      <Eye className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Xem</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(product)}
                    >
                      <Pencil className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Sửa</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(product.id)}
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
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(product)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(product.id)}
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

export default ProductTable;
