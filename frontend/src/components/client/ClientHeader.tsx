"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  ShoppingCart,
  User,
  ChevronDown,
  Search,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";
import Image from "next/image";

export default function ClientHeader() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fullName = localStorage.getItem("fullName");
    if (token && fullName) {
      setIsLoggedIn(true);
      setFullName(fullName);
    } else {
      setIsLoggedIn(false);
      setFullName(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setFullName(null);
    toast.success("Đăng xuất thành công!");
    router.push("/client");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    } else {
      toast.error("Vui lòng nhập từ khóa tìm kiếm!");
    }
  };

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  const categories = [
    {
      name: "iPhone",
      href: "/products/iphone",
      products: [
        { name: "iPhone 6", slug: "iphone-6" },
        { name: "iPhone 7", slug: "iphone-7" },
        { name: "iPhone 8", slug: "iphone-8" },
        { name: "iPhone XS", slug: "iphone-xs" },
      ],
    },
    {
      name: "Samsung",
      href: "/products/samsung",
      products: [
        { name: "Samsung Galaxy S21", slug: "samsung-galaxy-s21" },
        { name: "Samsung Galaxy S22", slug: "samsung-galaxy-s22" },
        { name: "Samsung Galaxy Z Flip", slug: "samsung-galaxy-z-flip" },
        { name: "Samsung Galaxy A54", slug: "samsung-galaxy-a54" },
      ],
    },
    {
      name: "Xiaomi",
      href: "/products/xiaomi",
      products: [
        { name: "Xiaomi 13", slug: "xiaomi-13" },
        { name: "Xiaomi 14", slug: "xiaomi-14" },
        { name: "Xiaomi Redmi Note 12", slug: "xiaomi-redmi-note-12" },
        { name: "Xiaomi Poco X5", slug: "xiaomi-poco-x5" },
      ],
    },
    {
      name: "Oppo",
      href: "/products/oppo",
      products: [
        { name: "Oppo Find X5", slug: "oppo-find-x5" },
        { name: "Oppo Reno 8", slug: "oppo-reno-8" },
        { name: "Oppo A78", slug: "oppo-a78" },
        { name: "Oppo K10", slug: "oppo-k10" },
      ],
    },
  ];

  const navItems = [
    { name: "Trang chủ", href: "/client" },
    { name: "Sản phẩm", href: "#", hasDropdown: true },
    { name: "Tin tức", href: "#" },
    { name: "Đơn hàng", href: "/client/order" },
    { name: "Giỏ hàng", href: "/client/cart" },
  ];

  return (
    <div className="flex flex-col sticky top-0 z-50 bg-white shadow-sm">
      <div className="container w-full mx-auto py-3">
        <div className="flex items-center justify-between">
          <Link href="/client">
            <Image
              src="/images/logo.png"
              alt="Fixi Mobile"
              width={60}
              height={60}
            />
          </Link>

          <div className="hidden md:flex relative w-full max-w-sm mx-6">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-10 pr-4 py-2 text-sm rounded-full border-gray-200 focus:border-green-400 focus:ring-green-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>

          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Search className="h-6 w-6 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="bg-white p-4">
                <VisuallyHidden>
                  <SheetTitle>Tìm kiếm sản phẩm</SheetTitle>
                </VisuallyHidden>
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2"
                >
                  <div className="relative w-full max-w-[280px] mx-auto">
                    <Input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      className="pl-10 pr-4 py-2 text-sm rounded-full border-gray-200 focus:border-green-400 focus:ring-green-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </form>
              </SheetContent>
            </Sheet>

            <Popover open={isAccountOpen} onOpenChange={setIsAccountOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-6 w-6 text-gray-600" />
                  <span className="hidden md:inline text-gray-700 font-medium">
                    {isLoggedIn ? fullName : "Tài khoản"}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
                      isAccountOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 bg-white shadow-lg rounded-lg border border-gray-100">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-1">
                    <Link href="/profile">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
                      >
                        Thông tin cá nhân
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <Link href="/auth/login">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
                      >
                        Đăng nhập
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
                      >
                        Đăng ký
                      </Button>
                    </Link>
                  </div>
                )}
              </PopoverContent>
            </Popover>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white p-5">
                <VisuallyHidden>
                  <SheetTitle>Menu điều hướng</SheetTitle>
                </VisuallyHidden>
                <div className="flex flex-col gap-3 max-h-[calc(100vh-2rem)] overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xl text-gray-800">
                      Menu
                    </span>
                  </div>
                  {navItems.map((item) =>
                    item.hasDropdown ? (
                      <div key={item.name} className="relative">
                        <span className="block py-2 px-4 text-gray-800 font-bold text-lg">
                          {item.name}
                        </span>
                        {categories.map((category) => (
                          <div key={category.name} className="pl-2">
                            <div className="flex items-center justify-between">
                              <Link
                                href={category.href}
                                className="block py-2 px-4 text-gray-700 font-semibold text-base hover:bg-green-50 hover:text-green-600 rounded-lg flex-1 transition-colors duration-200"
                              >
                                {category.name}
                              </Link>
                              <Button
                                onClick={() => toggleCategory(category.name)}
                                className="p-2 hover:bg-green-50 rounded-lg transition-colors duration-200"
                              >
                                <ChevronRight
                                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                                    openCategory === category.name
                                      ? "rotate-90"
                                      : ""
                                  }`}
                                />
                              </Button>
                            </div>
                            {openCategory === category.name && (
                              <div className="pl-6 mt-1">
                                {category.products.map((product) => (
                                  <Link
                                    key={product.name}
                                    href={`${category.href}/${product.slug}`}
                                    className="block py-1.5 px-4 text-gray-600 text-sm hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors duration-200"
                                  >
                                    {product.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block py-2 px-4 text-gray-700 font-medium text-base hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="hidden md:flex bg-cyan-300 items-center justify-center text-base font-semibold relative">
        {navItems.map((item) =>
          item.hasDropdown ? (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <span className="cursor-pointer text-gray-800 hover:bg-black hover:text-white transition-colors duration-200 flex items-center py-3 px-6">
                {item.name}
              </span>
              {isProductsOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-3 w-[700px] bg-white shadow-xl rounded-lg p-6 z-50 border border-gray-100">
                  <div className="grid grid-cols-3 gap-8">
                    {categories.map((category) => (
                      <div key={category.name} className="flex flex-col gap-2">
                        <Link
                          href={category.href}
                          className="font-bold text-lg text-gray-800 hover:text-green-600 border-b border-gray-200 pb-2 mb-2 transition-colors duration-200"
                        >
                          {category.name}
                        </Link>
                        {category.products.map((product) => (
                          <Link
                            key={product.name}
                            href={`${category.href}/${product.slug}`}
                            className="text-gray-600 text-sm hover:text-green-600 hover:bg-green-50 rounded-md px-2 py-1 transition-colors duration-200"
                          >
                            {product.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-800 font-bold hover:bg-black hover:text-white transition-colors duration-200 py-3 px-6"
            >
              {item.name}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
