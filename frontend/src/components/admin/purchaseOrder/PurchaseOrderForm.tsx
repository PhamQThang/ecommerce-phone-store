// components/admin/purchase-orders/PurchaseOrderForm.tsx
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
import { getSuppliers } from "@/api/admin/supplierApi";
import { getProducts } from "@/api/admin/productApi";
import { getColors } from "@/api/admin/colorApi";
import {
  createPurchaseOrder,
  createProductIdentity,
  updatePurchaseOrder,
} from "@/api/admin/purchaseOrderApi";
import {
  Supplier,
  PurchaseOrder,
  ProductIdentity,
  Product,
  Color,
} from "@/types/types";
import { Trash2 } from "lucide-react";

// Định nghĩa schema cho form
const purchaseOrderSchema = z.object({
  supplierId: z.string().min(1, "Nhà cung cấp là bắt buộc"),
});

interface PurchaseOrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingPurchaseOrder: PurchaseOrder | null;
  onSubmit: (data: Partial<PurchaseOrder>) => void;
}

export default function PurchaseOrderForm({
  open,
  onOpenChange,
  editingPurchaseOrder,
  onSubmit,
}: PurchaseOrderFormProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [productIdentities, setProductIdentities] = useState<ProductIdentity[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof purchaseOrderSchema>>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      supplierId: "",
    },
  });

  // Lấy danh sách nhà cung cấp
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers({ page: 1, limit: 100 });
        setSuppliers(response.data);
      } catch (error: any) {
        toast.error("Lỗi", {
          description: error.message || "Lấy danh sách nhà cung cấp thất bại",
        });
      }
    };
    fetchSuppliers();
  }, []);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts({ page: 1, limit: 100 });
        setProducts(response.data);
      } catch (error: any) {
        toast.error("Lỗi", {
          description: error.message || "Lấy danh sách sản phẩm thất bại",
        });
      }
    };
    fetchProducts();
  }, []);

  // Lấy danh sách màu
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await getColors({ page: 1, limit: 100 });
        setColors(response.data);
      } catch (error: any) {
        toast.error("Lỗi", {
          description: error.message || "Lấy danh sách màu thất bại",
        });
      }
    };
    fetchColors();
  }, []);

  // Khởi tạo dữ liệu khi chỉnh sửa
  useEffect(() => {
    if (editingPurchaseOrder) {
      form.reset({
        supplierId: editingPurchaseOrder.supplier.id,
      });
      setSelectedSupplier(editingPurchaseOrder.supplier);
      // Chuyển đổi productIdentities để có colorId và productId
      const transformedProductIdentities = (
        editingPurchaseOrder.productIdentites || []
      ).map((item) => ({
        ...item,
        colorId: item.color?.id || "",
        productId: item.productId || "", // Nếu API trả về product, cần thêm productId
      }));
      setProductIdentities(transformedProductIdentities);
    } else {
      form.reset({
        supplierId: "",
      });
      setSelectedSupplier(null);
      setProductIdentities([]);
    }
  }, [editingPurchaseOrder, form]);

  // Xử lý chọn nhà cung cấp
  const handleSupplierChange = (supplierId: string) => {
    const selected = suppliers.find((supplier) => supplier.id === supplierId);
    setSelectedSupplier(selected || null);
    form.setValue("supplierId", supplierId);
  };

  // Thêm một sản phẩm mới vào bảng
  const handleAddProduct = () => {
    setProductIdentities([
      ...productIdentities,
      {
        id: "",
        status: "PENDING",
        imei: "",
        createdAt: "",
        updatedAt: "",
        colorId: "",
        productId: "",
        purchaseOrderId: "",
      },
    ]);
  };

  // Xóa một sản phẩm khỏi bảng
  const handleRemoveProduct = (index: number) => {
    setProductIdentities(productIdentities.filter((_, i) => i !== index));
  };

  // Cập nhật thông tin sản phẩm
  const handleProductChange = (
    index: number,
    field: keyof ProductIdentity,
    value: string
  ) => {
    const updatedIdentities = [...productIdentities];
    updatedIdentities[index] = {
      ...updatedIdentities[index],
      [field]: value,
    };
    setProductIdentities(updatedIdentities);
  };

  const handleSubmit = async (values: z.infer<typeof purchaseOrderSchema>) => {
    if (!selectedSupplier) {
      toast.error("Vui lòng chọn nhà cung cấp");
      return;
    }

    setLoading(true);
    try {
      if (editingPurchaseOrder) {
        // Logic chỉnh sửa: Cập nhật đơn nhập hàng và tạo lại ProductIdentity
        const purchaseOrderResponse = await updatePurchaseOrder(
          editingPurchaseOrder.id,
          {
            productIdentities: [],
            supplier: { id: selectedSupplier.id },
          }
        );

        // Tạo lại ProductIdentity
        const productIdentityPromises = productIdentities.map((item) =>
          createProductIdentity({
            purchaseOrder: { id: purchaseOrderResponse.id },
            color: { id: item.colorId || "" },
            product: { id: item.productId || "" },
            status: item.status,
            imei: item.imei,
          })
        );

        const createdProductIdentities = await Promise.all(
          productIdentityPromises
        );

        const purchaseOrderData: Partial<PurchaseOrder> = {
          ...purchaseOrderResponse,
          supplier: selectedSupplier,
          productIdentites: createdProductIdentities,
        };

        await onSubmit(purchaseOrderData);
        toast.success("Cập nhật đơn nhập hàng thành công");
      } else {
        // Logic thêm mới
        const purchaseOrderResponse = await createPurchaseOrder({
          productIdentities: [],
          supplier: { id: selectedSupplier.id },
        });

        const productIdentityPromises = productIdentities.map((item) =>
          createProductIdentity({
            purchaseOrder: { id: purchaseOrderResponse.id },
            color: { id: item.colorId || "" },
            product: { id: item.productId || "" },
            status: item.status,
            imei: item.imei,
          })
        );

        const createdProductIdentities = await Promise.all(
          productIdentityPromises
        );

        const purchaseOrderData: Partial<PurchaseOrder> = {
          ...purchaseOrderResponse,
          supplier: selectedSupplier,
          productIdentites: createdProductIdentities,
        };

        await onSubmit(purchaseOrderData);
        toast.success("Thêm đơn nhập hàng thành công");
      }

      onOpenChange(false);
      setProductIdentities([]);
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
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingPurchaseOrder ? "Sửa đơn nhập hàng" : "Thêm đơn nhập hàng"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="supplierId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhà cung cấp</FormLabel>
                  <Select
                    onValueChange={handleSupplierChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhà cung cấp" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <FormLabel>Danh sách sản phẩm</FormLabel>
                <Button type="button" onClick={handleAddProduct}>
                  Thêm sản phẩm
                </Button>
              </div>
              {productIdentities?.length === 0 ? (
                <p className="text-gray-500">Chưa có sản phẩm nào.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Sản phẩm</th>
                        <th className="border p-2 text-left">Màu</th>
                        <th className="border p-2 text-left">IMEI</th>
                        <th className="border p-2 text-left">Trạng thái</th>
                        <th className="border p-2 text-left">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productIdentities.map((item, index) => (
                        <tr key={index}>
                          <td className="border p-2">
                            <Select
                              onValueChange={(value) =>
                                handleProductChange(index, "productId", value)
                              }
                              value={item.productId}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn sản phẩm" />
                              </SelectTrigger>
                              <SelectContent>
                                {products.map((product) => (
                                  <SelectItem
                                    key={product.id}
                                    value={product.id}
                                  >
                                    {product.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="border p-2">
                            <Select
                              onValueChange={(value) =>
                                handleProductChange(index, "colorId", value)
                              }
                              value={item.colorId}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn màu" />
                              </SelectTrigger>
                              <SelectContent>
                                {colors.map((color) => (
                                  <SelectItem key={color.id} value={color.id}>
                                    {color.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="border p-2">
                            <Input
                              placeholder="IMEI"
                              value={item.imei}
                              onChange={(e) =>
                                handleProductChange(
                                  index,
                                  "imei",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="border p-2">
                            <Input
                              placeholder="Trạng thái"
                              value={item.status}
                              onChange={(e) =>
                                handleProductChange(
                                  index,
                                  "status",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="border p-2">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveProduct(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Đang xử lý..."
                  : editingPurchaseOrder
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
