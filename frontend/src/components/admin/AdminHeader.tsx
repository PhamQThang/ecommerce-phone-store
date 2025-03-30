"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SidebarTrigger } from "../ui/sidebar";
import { logout } from "@/api/auth/authApi";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("fullName");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpires");
      toast.success("Đăng xuất thành công!");
      router.push("/client");
    } catch (error: any) {
      toast.error("Đăng xuất thất bại", {
        description: error.message || "Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <header className="sticky top-0 bg-gray-100 p-4 shadow-md z-50">
      <div className="mx-auto flex justify-between items-center">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button
          variant="secondary"
          onClick={handleLogout}
          className="text-black border-white hover:bg-gray-700"
        >
          Đăng xuất
        </Button>
      </div>
    </header>
  );
}
