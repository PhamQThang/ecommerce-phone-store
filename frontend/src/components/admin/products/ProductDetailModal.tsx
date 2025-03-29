// /admin/components/ProductDetailModal.tsx
import { Product } from "@/types/types";
import { Category } from "@/types/types";
import { Supplier } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface ProductDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  categories: Category[];
  suppliers: Supplier[];
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  open,
  onOpenChange,
  product,
  categories,
  suppliers,
}) => {
  if (!product) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const category = categories.find((cat) => cat.id === product.category_id);
  const supplier = suppliers.find((sup) => sup.id === product.supplier_id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chi tiết sản phẩm: {product.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">ID:</span>
            <span>{product.id}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Tên sản phẩm:</span>
            <span>{product.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Mô tả:</span>
            <span>{product.description || "Không có"}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Giá:</span>
            <span>{formatPrice(product.price)}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Số lượng:</span>
            <span>{product.stock}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Danh mục:</span>
            <span>{category ? category.name : "Không có"}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Nhà cung cấp:</span>
            <span>{supplier ? supplier.name : "Không có"}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Thời gian tạo:</span>
            <span>{formatDate(product.createdAt)}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">
              Thời gian cập nhật:
            </span>
            <span>{formatDate(product.updatedAt)}</span>
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

export default ProductDetailModal;
