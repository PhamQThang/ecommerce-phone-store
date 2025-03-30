// components/admin/Sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  Menu,
  Package,
  Truck,
  ShoppingCart,
  Percent,
  BarChart,
  Users,
  UserCog,
} from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  roles: string[];
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  title: string;
  url: string;
  roles: string[];
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  // Lấy role từ localStorage
  useEffect(() => {
    // const userRole = localStorage.getItem("role");
    const userRole = "admin"; // Giả lập role admin
    setRole(userRole);
  }, []);

  const items: MenuItem[] = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: BarChart,
      roles: ["admin", "staff"],
    },
    {
      title: "Quản lý thương hiệu",
      url: "/admin/brands",
      icon: BarChart,
      roles: ["admin"],
    },
    {
      title: "Quản lý danh mục",
      url: "/admin/categories",
      icon: Package,
      roles: ["admin", "staff"],
    },
    {
      title: "Quản lý nhà cung cấp",
      url: "/admin/suppliers",
      icon: Truck,
      roles: ["admin", "staff"],
    },
    {
      title: "Quản lý sản phẩm",
      url: "/admin/products",
      icon: Package,
      roles: ["admin", "staff"],
    },
    {
      title: "Quản lý nhập hàng",
      url: "/admin/import-orders",
      icon: Truck,
      roles: ["admin", "staff"],
    },
    {
      title: "Quản lý đơn hàng",
      url: "/admin/orders",
      icon: ShoppingCart,
      roles: ["admin", "staff"],
    },
    {
      title: "Quản lý khuyến mãi",
      url: "/admin/promotions",
      icon: Percent,
      roles: ["admin", "staff"],
    },
    {
      title: "Quản lý báo cáo",
      url: "/admin/reports",
      icon: BarChart,
      roles: ["admin", "staff"],
    },
    {
      title: "Quản lý khách hàng",
      url: "/admin/customers",
      icon: Users,
      roles: ["admin", "staff"],
    },
    {
      title: "Quản lý nhân viên",
      url: "/admin/staff",
      icon: UserCog,
      roles: ["admin"],
    },
  ];

  return (
    <Sidebar className="w-64 bg-white shadow-lg">
      <SidebarGroup>
        <SidebarGroupLabel>Quản lý hệ thống</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => {
              if (!role || !item.roles.includes(role)) {
                return null;
              }

              const isActive = pathname === item.url;

              return (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <Collapsible
                      defaultOpen={false}
                      className="group/collapsible"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`flex items-center justify-between w-full ${
                            isActive ? "bg-gray-100" : ""
                          }`}
                        >
                          <div className="flex items-center">
                            {item.icon && (
                              <item.icon className="w-6 h-6 mr-2" />
                            )}
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenu>
                          {item.submenu
                            .filter((subItem) => subItem.roles.includes(role))
                            .map((subItem) => (
                              <SidebarMenuItem key={subItem.title}>
                                <SidebarMenuButton asChild>
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className={isActive ? "bg-gray-100" : ""}
                    >
                      <Link href={item.url}>
                        {item.icon && <item.icon className="w-6 h-6 mr-2" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
}
