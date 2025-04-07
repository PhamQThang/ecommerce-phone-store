// components/admin/colors/ColorForm.tsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Color } from "@/types/types";

// Định nghĩa schema cho form
const colorSchema = z.object({
  name: z.string().min(1, "Tên màu là bắt buộc"),
});

interface ColorFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingColor: Color | null;
  onSubmit: (data: Partial<Color>) => void;
}

export default function ColorForm({
  open,
  onOpenChange,
  editingColor,
  onSubmit,
}: ColorFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (editingColor) {
      form.reset({
        name: editingColor.name,
      });
    } else {
      form.reset({
        name: "",
      });
    }
  }, [editingColor, form]);

  const handleSubmit = async (values: z.infer<typeof colorSchema>) => {
    setLoading(true);
    try {
      await onSubmit(values);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingColor ? "Sửa màu sắc" : "Thêm màu sắc"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên màu</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên màu (VD: Đỏ)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Đang xử lý..." : editingColor ? "Cập nhật" : "Thêm"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
