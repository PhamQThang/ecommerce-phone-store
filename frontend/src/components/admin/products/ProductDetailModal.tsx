// components/admin/products/ProductDetailModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Product } from "@/types/types";

interface ProductDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  open,
  onOpenChange,
  product,
}) => {
  if (!product) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chi tiết sản phẩm: {product.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">ID:</span>
              <p>{product.id}</p>
            </div>
            <div>
              <span className="font-semibold">Slug:</span>
              <p>{product.slug}</p>
            </div>
            <div>
              <span className="font-semibold">Model:</span>
              <p>{product.model.name}</p>
            </div>
            <div>
              <span className="font-semibold">Giá:</span>
              <p>{product.basePrice.toLocaleString()} VNĐ</p>
            </div>
            <div>
              <span className="font-semibold">Kích thước màn hình:</span>
              <p>{product.screenSize} inch</p>
            </div>
            <div>
              <span className="font-semibold">Dung lượng pin:</span>
              <p>{product.pin} mAh</p>
            </div>
            <div>
              <span className="font-semibold">Công nghệ màn hình:</span>
              <p>{product.screenTechnology}</p>
            </div>
            <div>
              <span className="font-semibold">Chipset:</span>
              <p>{product.chipset}</p>
            </div>
            <div>
              <span className="font-semibold">Hệ điều hành:</span>
              <p>{product.os}</p>
            </div>
            <div>
              <span className="font-semibold">Dung lượng lưu trữ:</span>
              <p>{product.storage} GB</p>
            </div>
            <div>
              <span className="font-semibold">RAM:</span>
              <p>{product.ram} GB</p>
            </div>
            <div>
              <span className="font-semibold">Trạng thái:</span>
              <p>{product.status}</p>
            </div>
            <div>
              <span className="font-semibold">Số lượng:</span>
              <p>{product.quantity}</p>
            </div>
            <div>
              <span className="font-semibold">Thời gian tạo:</span>
              <p>{formatDate(product.createdAt)}</p>
            </div>
            <div>
              <span className="font-semibold">Thời gian cập nhật:</span>
              <p>{formatDate(product.updatedAt)}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
