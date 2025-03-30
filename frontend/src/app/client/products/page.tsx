import ProductCard from "@/components/client/homes/ProductCard";
import products from "@/data/_products";

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Danh sách sản phẩm</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {products.map((product) => (
    <ProductCard key={product.id.toString()} product={{ ...product, id: product.id.toString() }} />
  ))}
      </div>
    </div>
  );
}