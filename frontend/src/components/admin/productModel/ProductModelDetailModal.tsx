import { ProductModel, Brand } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface ProductModelDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  model: ProductModel | null;
  brands: Brand[]; // Thêm brands để tra cứu tên
}

const ProductModelDetailModal: React.FC<ProductModelDetailModalProps> = ({
  open,
  onOpenChange,
  model,
  brands,
}) => {
  if (!model) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
  };

  const getBrandName = () => {
    const brand = brands.find((b) => b.id === model.brand?.id);
    return brand ? brand.name : "Chưa có";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chi tiết model: {model.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            <div>
              <span className="font-semibold">ID:</span> {model.id}
            </div>
            <div>
              <span className="font-semibold">Tên model:</span> {model.name}
            </div>
            <div>
              <span className="font-semibold">Mã model:</span> {model.code}
            </div>
            <div>
              <span className="font-semibold">Thương hiệu:</span>{" "}
              {getBrandName()}
            </div>
            <div>
              <span className="font-semibold">Mô tả:</span>{" "}
              {model.description || "Không có"}
            </div>
            <div>
              <span className="font-semibold">Thời gian tạo:</span>{" "}
              {formatDate(model.createdAt)}
            </div>
            <div>
              <span className="font-semibold">Thời gian cập nhật:</span>{" "}
              {formatDate(model.updatedAt)}
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

export default ProductModelDetailModal;
