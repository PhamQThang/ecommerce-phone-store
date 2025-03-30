const OrderPaymentInfo = ({ total, discount }: { total: number; discount: number }) => {
    return (
      <div className="p-4 border rounded-lg mt-4">
        <h3 className="font-semibold">Thông tin thanh toán</h3>
        <p className="text-gray-500">Tổng tiền: <span className="text-red-500 font-bold">{total.toLocaleString()}đ</span></p>
        <p className="text-gray-500">Giảm giá: {discount.toLocaleString()}đ</p>
        <p className="text-green-500 font-bold">Thanh toán: {(total - discount).toLocaleString()}đ</p>
      </div>
    );
  };
  
  export default OrderPaymentInfo;
  