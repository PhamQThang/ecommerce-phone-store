// /admin/components/PromotionDetailModal.tsx
import { Promotion } from "@/types/types";
import { Product } from "@/types/types";
import { Category } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface PromotionDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion: Promotion | null;
  products: Product[];
  categories: Category[];
}

const PromotionDetailModal: React.FC<PromotionDetailModalProps> = ({
  open,
  onOpenChange,
  promotion,
  products,
  categories,
}) => {
  if (!promotion) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chi tiết khuyến mãi: {promotion.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">ID:</span>
            <span>{promotion.id}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">
              Tên chương trình:
            </span>
            <span>{promotion.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Loại:</span>
            <span>{promotion.type}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Áp dụng cho:</span>
            <span>{getTargetName(promotion)}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">Giảm giá:</span>
            <span>{formatDiscount(promotion)}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">
              Thời gian bắt đầu:
            </span>
            <span>{formatDate(promotion.start_date)}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold w-full sm:w-32">
              Thời gian kết thúc:
            </span>
            <span>{formatDate(promotion.end_date)}</span>
          </div>
          {(promotion.type === "product" ||
            promotion.type === "category" ||
            promotion.type === "quantity") && (
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold w-full sm:w-32">
                Số lượng tối đa:
              </span>
              <span>{promotion.quantity_limit || "Không giới hạn"}</span>
            </div>
          )}
          {promotion.type === "order" && (
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold w-full sm:w-32">
                Giá trị đơn tối thiểu:
              </span>
              <span>
                {promotion.min_order_value
                  ? new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(promotion.min_order_value)
                  : "Không có"}
              </span>
            </div>
          )}
          {promotion.type === "quantity" && (
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold w-full sm:w-32">
                Số lượng tối thiểu:
              </span>
              <span>{promotion.min_quantity || "Không có"}</span>
            </div>
          )}
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

export default PromotionDetailModal;
