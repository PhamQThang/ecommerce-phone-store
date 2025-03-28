// frontend/components/AdminHeader.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SidebarTrigger } from "../ui/sidebar";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    toast.success("Đăng xuất thành công!");
    router.push("/client");
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
