import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Link } from "lucide-react";

export default function WarrantyPolicy() {
  return (
    <div className="container w-full mx-auto px-3 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Chính sách bảo hành</h2>
      <Tabs defaultValue="return" className="w-full">
        <TabsList className="flex justify-center">
          <TabsTrigger value="return">Đổi trả 30 ngày</TabsTrigger>
          <TabsTrigger value="standard">Bảo hành tiêu chuẩn</TabsTrigger>
          <TabsTrigger value="extended">Bảo hành mở rộng</TabsTrigger>
        </TabsList>

        <TabsContent value="return">
          <Card>
            <CardContent className="p-4">
              <p>
                Khi mua sản phẩm tại fiximobile.com, khách hàng có quyền hoàn toàn yên tâm với sản phẩm chính hãng, được bảo hành chính thức tại hãng và ngoài ra có thêm chính sách đổi mới miễn phí lên tới 30 ngày tại FixiMobile.
              </p>
              <Table className="table-auto w-full mt-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3 whitespace-normal break-words">Loại sản phẩm</TableHead>
                    <TableHead className="w-1/3 whitespace-normal break-words">Đổi mới miễn phí</TableHead>
                    <TableHead className="w-1/3 whitespace-normal break-words">Quy định nhập lại, trả lại</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-1/3 whitespace-normal break-words">Điện thoại</TableCell>
                    <TableCell className="w-1/3 whitespace-normal break-words">30 ngày</TableCell>
                    <TableCell className="w-1/3 whitespace-normal break-words">
                      - Trong 30 ngày đầu, nhập lại trừ 20% giá hiện tại.<br />
                      - Sau 30 ngày, nhập lại theo thỏa thuận.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 whitespace-normal break-words">Samsung Watch</TableCell>
                    <TableCell className="w-1/3 whitespace-normal break-words">30 ngày</TableCell>
                    <TableCell className="w-1/3 whitespace-normal break-words">
                      - Trong 30 ngày đầu, nhập lại trừ 20% giá hiện tại.<br />
                      - Sau 30 ngày, nhập lại theo thỏa thuận.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 whitespace-normal break-words">Laptop</TableCell>
                    <TableCell className="w-1/3 whitespace-normal break-words">30 ngày</TableCell>
                    <TableCell className="w-1/3 whitespace-normal break-words">
                      - Trong 30 ngày đầu, nhập lại trừ 20% giá hiện tại.<br />
                      - Sau 30 ngày, nhập lại theo thỏa thuận.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/3 whitespace-normal break-words">Màn hình máy tính</TableCell>
                    <TableCell className="w-1/3 whitespace-normal break-words">15 ngày</TableCell>
                    <TableCell className="w-1/3 whitespace-normal break-words">
                      - Trong 15 ngày đầu, nhập lại trừ 20% giá hiện tại.<br />
                      - Sau 15 ngày, nhập lại theo thỏa thuận.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standard">
          <Card>
            <CardContent className="p-4">
              <p>
                Các sản phẩm chính hãng, Quý khách có thể tới các TTBH chính hãng hoặc trực tiếp tới các cửa hàng FixiMobile để được tiếp nhận gửi máy bảo hành chính hãng.
              </p>
              <p>Yêu cầu tiếp nhận bảo hành tùy theo quy định của từng hãng, chi tiết có trong bảng sau:</p>
              <Table className="table-auto w-full border-collapse mt-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4 whitespace-normal break-words text-center">Sản phẩm</TableHead>
                    <TableHead className="w-1/4 whitespace-normal break-words text-center">Thời gian bảo hành</TableHead>
                    <TableHead className="w-1/4 whitespace-normal break-words text-center">Quyền lợi bảo hành</TableHead>
                    <TableHead className="w-1/4 whitespace-normal break-words text-center">Địa chỉ bảo hành</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-1/4 whitespace-normal break-words ">Hàng mới</TableCell>
                    <TableCell className="w-1/4 whitespace-normal break-words ">12 tháng (hoặc dài hơn theo quy định của hãng)</TableCell>
                    <TableCell className="w-1/4 whitespace-normal break-words ">Quyền lợi bảo hành của hãng</TableCell>
                    <TableCell className="w-1/4 whitespace-normal break-words ">TTBH chính hãng</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/4 whitespace-normal break-words ">Hàng đã kích hoạt bảo hành chính hãng</TableCell>
                    <TableCell className="w-1/4 whitespace-normal break-words ">12 tháng = Thời gian bảo hành còn lại tại hãng + Bảo hành tại FixiMobile</TableCell>
                    <TableCell className="w-1/4 whitespace-normal break-words ">
                      - Theo quyền lợi bảo hành của hãng trong thời gian được hãng bảo hành.<br />
                      - Sửa chữa, thay thế linh kiện trong thời gian bảo hành còn lại tại FixiMobile.
                    </TableCell>
                    <TableCell className="w-1/4 whitespace-normal break-words ">TTBH chính hãng & FixiMobile</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-1/4 whitespace-normal break-words ">Hàng cũ</TableCell>
                    <TableCell className="w-1/4 whitespace-normal break-words ">6 tháng</TableCell>
                    <TableCell className="w-1/4 whitespace-normal break-words ">Sửa chữa, thay thế linh kiện, bao gồm cả nguồn và màn hình</TableCell>
                    <TableCell className="w-1/4 whitespace-normal break-words ">FixiMobile</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extended">
          <Card>
            <CardContent className="p-4">
              <p>
                Trung tâm bảo hành các hãng hỗ trợ mở rộng chính sách với các điều khoản riêng. Khách hàng có thể mua thêm gói bảo hành mở rộng với chi phí tùy theo sản phẩm và hãng cung cấp.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      
    </div>
  );
}
