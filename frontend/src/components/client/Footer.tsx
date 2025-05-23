import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, PhoneCall, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#C4FCF5] py-8">
      <div className="container w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-3 fixed-bottom-0">
        <div>
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Fixi Mobile"
              width={80}
              height={80}
            />
          </div>
          <h3 className="mt-4 font-semibold">Kết nối với chúng tôi</h3>
          <div className="flex space-x-3 mt-2">
            <Link href="#" aria-label="Facebook">
              <Facebook className="text-yellow-500 w-6 h-6 cursor-pointer" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="text-yellow-500 w-6 h-6 cursor-pointer" />
            </Link>
            <Link href="#" aria-label="YouTube">
              <Youtube className="text-yellow-500 w-6 h-6 cursor-pointer" />
            </Link>
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-3">Thông tin liên hệ</h2>
          <ul className="space-y-2">
            <li>Giới thiệu về cửa hàng</li>
            <li>Tuyển dụng mới nhất</li>
            <li>
              Tư vấn miễn phí: <strong>082 633 9922</strong>
            </li>
            <li>Đánh giá chất lượng, khiếu nại</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold mb-3">Chính sách của chúng tôi</h2>
          <ul className="space-y-2">
            <li>Thu cũ - Đổi mới</li>
            <li>Chính sách trả góp</li>
            <li>Chính sách mua hàng</li>
            <li><Link href={`/client/policy`}>Chính sách bảo hành</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold mb-3">Địa chỉ và liên hệ</h2>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-700" />
              <span>
                54 Ngõ 66B Triều Khúc - Tân Triều - Thanh Trì - Hà Nội
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <PhoneCall className="w-5 h-5 text-gray-700" />
              <span>082 633 9922</span>
            </li>
            <li>Thời gian hỗ trợ: 08:00am - 22:00pm</li>
            <li>
              <Link href="https://maps.app.goo.gl/Nhue7YUAr572MyeQ8" className="text-blue-600">
                Tìm Store trên Google Maps
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
