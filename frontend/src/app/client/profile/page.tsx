"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Check, X } from "lucide-react"; // Thêm biểu tượng Check và X

export default function ProfilePage() {
  // State để quản lý giá trị và trạng thái chỉnh sửa
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingGender, setIsEditingGender] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [name, setName] = useState("Nguyễn Tuấn Vũ");
  const [gender, setGender] = useState("Chưa cập nhật");
  const [address, setAddress] = useState("Chưa có địa chỉ mặc định");

  // Hàm xử lý khi nhấn nút chỉnh sửa
  const handleEditToggle = (field: string) => {
    if (field === "name") {
      setIsEditingName(!isEditingName);
    } else if (field === "gender") {
      setIsEditingGender(!isEditingGender);
    } else if (field === "address") {
      setIsEditingAddress(!isEditingAddress);
    }
  };

  // Hàm xử lý khi nhấn nút hủy
  const handleCancel = (field: string) => {
    if (field === "name") {
      setName("Nguyễn Tuấn Vũ"); // Reset về giá trị ban đầu
      setIsEditingName(false);
    } else if (field === "gender") {
      setGender("Chưa cập nhật");
      setIsEditingGender(false);
    } else if (field === "address") {
      setAddress("Chưa có địa chỉ mặc định");
      setIsEditingAddress(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-[700px]">
        <CardHeader className="relative">
          <CardTitle className="text-center text-2xl font-bold">
            NGUYỄN TUẤN VŨ
          </CardTitle>
          {/* Biểu tượng nhỏ ở góc trên cùng bên trái */}
          <div className="absolute top-4 left-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm">🎉</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Họ và tên */}
          <div className="flex items-center space-x-2">
            <Label className="w-1/3">Họ và tên:</Label>
            <div className="flex-1 flex items-center space-x-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly={!isEditingName}
                className={
                  isEditingName ? "border-blue-500" : "bg-gray-100 cursor-not-allowed"
                }
              />
              {isEditingName ? (
                <div className="flex space-x-2">
                  <Check
                    className="w-4 h-4 text-green-500 cursor-pointer"
                    onClick={() => setIsEditingName(false)}
                  />
                  <X
                    className="w-4 h-4 text-red-500 cursor-pointer"
                    onClick={() => handleCancel("name")}
                  />
                </div>
              ) : (
                <Edit2
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                  onClick={() => handleEditToggle("name")}
                />
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-2">
            <Label className="w-1/3">Email:</Label>
            <div className="flex-1">
              <Input
                value="Vu@gmail.com"
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Giới tính */}
          <div className="flex items-center space-x-2">
            <Label className="w-1/3">Giới tính:</Label>
            <div className="flex-1 flex items-center space-x-2">
              <Input
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                readOnly={!isEditingGender}
                className={
                  isEditingGender ? "border-blue-500" : "bg-gray-100 cursor-not-allowed"
                }
              />
              {isEditingGender ? (
                <div className="flex space-x-2">
                  <Check
                    className="w-4 h-4 text-green-500 cursor-pointer"
                    onClick={() => setIsEditingGender(false)}
                  />
                  <X
                    className="w-4 h-4 text-red-500 cursor-pointer"
                    onClick={() => handleCancel("gender")}
                  />
                </div>
              ) : (
                <Edit2
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                  onClick={() => handleEditToggle("gender")}
                />
              )}
            </div>
          </div>

          {/* Số điện thoại */}
          <div className="flex items-center space-x-2">
            <Label className="w-1/3">Số điện thoại:</Label>
            <div className="flex-1">
              <Input
                value="0325950142"
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Sinh nhật */}
          <div className="flex items-center space-x-2">
            <Label className="w-1/3">Sinh nhật:</Label>
            <div className="flex-1">
              <Input
                value="13/4/2023"
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Ngày tham gia Smember */}
          <div className="flex items-center space-x-2">
            <Label className="w-1/3">Ngày tham gia Smember:</Label>
            <div className="flex-1">
              <Input
                value="18/3/2025"
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Tổng tiền tích lũy từ */}
          <div className="flex items-center space-x-2">
            <Label className="w-1/3">Tổng tiền tích lũy từ 01/01/2024:</Label>
            <div className="flex-1">
              <Input
                value="0đ"
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Tổng tiền đã mua sắm */}
          <div className="flex items-center space-x-2">
            <Label className="w-1/3">Tổng tiền đã mua sắm:</Label>
            <div className="flex-1">
              <Input
                value="670.000đ"
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Địa chỉ */}
          <div className="flex items-center space-x-2">
            <Label className="w-1/3">Địa chỉ:</Label>
            <div className="flex-1 flex items-center space-x-2">
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                readOnly={!isEditingAddress}
                className={
                  isEditingAddress ? "border-blue-500" : "bg-gray-100 cursor-not-allowed"
                }
              />
              {isEditingAddress ? (
                <div className="flex space-x-2">
                  <Check
                    className="w-4 h-4 text-green-500 cursor-pointer"
                    onClick={() => setIsEditingAddress(false)}
                  />
                  <X
                    className="w-4 h-4 text-red-500 cursor-pointer"
                    onClick={() => handleCancel("address")}
                  />
                </div>
              ) : (
                <Edit2
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                  onClick={() => handleEditToggle("address")}
                />
              )}
            </div>
          </div>

          {/* Đổi mật khẩu */}
          <div className="flex items-center space-x-2">
            <Label className="w-1/3">Đổi mật khẩu</Label>
            <div className="flex-1"></div>
          </div>

          {/* Nút Cập nhật thông tin */}
          <Button className="w-full bg-red-600 hover:bg-red-700">
            CẬP NHẬT THÔNG TIN
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}