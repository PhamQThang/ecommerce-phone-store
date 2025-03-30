import { Brand } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface BrandDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand: Brand | null;
}

const BrandDetailModal: React.FC<BrandDetailModalProps> = ({
  open,
  onOpenChange,
  brand,
}) => {
  if (!brand) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chi tiết thương hiệu: {brand.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">ID:</span>
              <p>{brand.id}</p>
            </div>
            <div>
              <span className="font-semibold">Slug:</span>
              <p>{brand.slug}</p>
            </div>
            <div>
              <span className="font-semibold">Thời gian tạo:</span>
              <p>{formatDate(brand.createdAt)}</p>
            </div>
            <div>
              <span className="font-semibold">Thời gian cập nhật:</span>
              <p>{formatDate(brand.updatedAt)}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">
              Danh sách Model ({brand.models.length}):
            </h4>
            {brand.models.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {brand.models.map((model, index) => (
                  <div key={model.id || index} className="border rounded p-3">
                    <p className="font-medium">{model.name}</p>
                    <p className="text-sm text-gray-600">Code: {model.code}</p>
                    {model.description && (
                      <p className="text-sm text-gray-500">
                        {model.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Không có model nào</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BrandDetailModal;
