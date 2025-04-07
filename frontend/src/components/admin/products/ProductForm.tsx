// components/admin/products/ProductForm.tsx
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Product, ProductModel } from "@/types/types";
import { getProductModels } from "@/api/admin/productModelApi";
import { getProductById, uploadFile } from "@/api/admin/productApi";
import { Trash2 } from "lucide-react";

// Định nghĩa schema cho form
const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  slug: z.string().min(1, "Slug là bắt buộc"),
  basePrice: z.number().min(0, "Giá phải lớn hơn hoặc bằng 0"),
  screenSize: z.number().min(0, "Kích thước màn hình phải lớn hơn hoặc bằng 0"),
  pin: z.number().min(0, "Dung lượng pin phải lớn hơn hoặc bằng 0"),
  screenTechnology: z.string().min(1, "Công nghệ màn hình là bắt buộc"),
  chipset: z.string().min(1, "Chipset là bắt buộc"),
  os: z.string().min(1, "Hệ điều hành là bắt buộc"),
  storage: z.number().min(0, "Dung lượng lưu trữ phải lớn hơn hoặc bằng 0"),
  ram: z.number().min(0, "RAM phải lớn hơn hoặc bằng 0"),
  modelId: z.string().min(1, "Model là bắt buộc"),
});

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: Product | null;
  onSubmit: (data: Partial<Product>) => void;
}

export default function ProductForm({
  open,
  onOpenChange,
  editingProduct,
  onSubmit,
}: ProductFormProps) {
  const [models, setModels] = useState<ProductModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      basePrice: 0,
      screenSize: 0,
      pin: 0,
      screenTechnology: "",
      chipset: "",
      os: "",
      storage: 0,
      ram: 0,
      modelId: "",
    },
  });

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await getProductModels();
        setModels(data.data);
      } catch (error: any) {
        toast.error("Lỗi", {
          description: error.message || "Lấy danh sách model thất bại",
        });
      }
    };
    fetchModels();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      if (editingProduct) {
        try {
          const productData = await getProductById(editingProduct.id);
          form.reset({
            name: productData.name,
            slug: productData.slug,
            basePrice: productData.basePrice,
            screenSize: productData.screenSize,
            pin: productData.pin,
            screenTechnology: productData.screenTechnology,
            chipset: productData.chipset,
            os: productData.os,
            storage: productData.storage,
            ram: productData.ram,
            modelId: productData.model.id,
          });
          const selected = models.find(
            (model) => model.id === productData.model.id
          );
          setSelectedModel(selected || null);
          setImages(productData.images || []);
        } catch (error: any) {
          toast.error("Lỗi", {
            description: error.message || "Lấy thông tin sản phẩm thất bại",
          });
        }
      } else {
        form.reset({
          name: "",
          slug: "",
          basePrice: 0,
          screenSize: 0,
          pin: 0,
          screenTechnology: "",
          chipset: "",
          os: "",
          storage: 0,
          ram: 0,
          modelId: "",
        });
        setSelectedModel(null);
        setImages([]);
      }
    };

    fetchProductData();
  }, [editingProduct, models, form]);

  const handleModelChange = (modelId: string) => {
    const selected = models.find((model) => model.id === modelId);
    setSelectedModel(selected || null);
    form.setValue("modelId", modelId);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const file = files[0];
      const response = await uploadFile(file);
      const filePath = response.file.path;
      setImages((prev) => [...prev, filePath]);
      toast.success("Upload ảnh thành công");
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Upload ảnh thất bại",
      });
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleRemoveImage = (path: string) => {
    setImages((prev) => prev.filter((image) => image !== path));
    toast.success("Xóa ảnh thành công");
  };

  const handleSubmit = async (values: z.infer<typeof productSchema>) => {
    if (!selectedModel) {
      toast.error("Vui lòng chọn model");
      return;
    }

    setLoading(true);
    try {
      const productData = {
        name: values.name,
        slug: values.slug,
        basePrice: values.basePrice,
        screenSize: values.screenSize,
        pin: values.pin,
        screenTechnology: values.screenTechnology,
        chipset: values.chipset,
        os: values.os,
        storage: values.storage,
        ram: values.ram,
        model: selectedModel,
        identities: editingProduct?.identities || [],
        images: images,
      };

      await onSubmit(productData);
    } catch (error: any) {
      toast.error("Lỗi", {
        description: error.message || "Thao tác thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* Chia form thành 2 cột trên màn hình lớn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cột 1 */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên sản phẩm</FormLabel>
                      <FormControl>
                        <Input placeholder="Iphone 16 256gb" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="phone-16-12gb" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="basePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá cơ bản</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="25000"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="screenSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kích thước màn hình</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="16"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dung lượng pin</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="3000"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="screenTechnology"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Công nghệ màn hình</FormLabel>
                      <FormControl>
                        <Input placeholder="Amoled" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Cột 2 */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="chipset"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chipset</FormLabel>
                      <FormControl>
                        <Input placeholder="AMD 5600H" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="os"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hệ điều hành</FormLabel>
                      <FormControl>
                        <Input placeholder="17" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="storage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dung lượng lưu trữ</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RAM</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="12"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="modelId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <Select
                        onValueChange={handleModelChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {models.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Phần upload ảnh - Đặt ở dưới cùng, chiếm toàn bộ chiều rộng */}
            <div className="mt-4">
              <FormLabel>Ảnh sản phẩm</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="mt-1"
              />
              {uploading && (
                <p className="text-sm text-gray-500 mt-1">Đang upload...</p>
              )}
              {images.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium">Danh sách ảnh:</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-1 max-h-40 overflow-y-auto">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={process.env.NEXT_PUBLIC_API_URL + image}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1"
                          onClick={() => handleRemoveImage(image)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
              <Button type="submit" disabled={loading || uploading}>
                {loading
                  ? "Đang xử lý..."
                  : editingProduct
                    ? "Cập nhật"
                    : "Thêm"}
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
