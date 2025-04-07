"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProductReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: { rating: number; description: string; images: File[] }) => void;
}

const ProductReviewDialog: React.FC<ProductReviewDialogProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  const handleSubmit = () => {
    if (rating > 0 && description.trim().length >= 15) {
      onSubmit({ rating, description, images });
      onClose();
    } else {
      alert("Vui lòng chọn đánh giá và nhập mô tả ít nhất 15 ký tự.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đánh giá & nhận xét</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {/* Star Rating */}
          <div>
            <p className="font-semibold">Đánh giá chung:</p>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`text-2xl bg-white hover:bg-white ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                  <Star />
                </Button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="font-semibold">Mô tả:</p>
            <Textarea
              className="w-full border rounded-lg p-2 mt-2"
              rows={4}
              placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm (nhập tối thiểu 15 ký tự)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div>
            <p className="font-semibold">Thêm hình ảnh:</p>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mt-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            Gửi đánh giá
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductReviewDialog;
