// /admin/components/CategoryTable.tsx
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
import { Pencil, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  onView: (category: Category) => void; // Thêm prop onView
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
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
              <TableHead>Tên danh mục</TableHead>
              <TableHead className="hidden md:table-cell">Mô tả</TableHead>
              <TableHead className="hidden lg:table-cell">
                Danh mục cha
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
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="hidden md:table-cell">
                  {category.id}
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {category.description || "Không có"}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {category.parent_id
                    ? categories.find((cat) => cat.id === category.parent_id)
                        ?.name || "Không có"
                    : "Không có"}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(category.createdAt)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(category.updatedAt)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(category)}
                    >
                      <Eye className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Xem</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(category)}
                    >
                      <Pencil className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Sửa</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(category.id)}
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
        {categories.map((category) => (
          <div key={category.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-500">
                  {category.description || "Không có mô tả"}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(category)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(category)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(category.id)}
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

export default CategoryTable;
