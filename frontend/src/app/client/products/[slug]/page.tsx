import ProductDetail from "@/components/client/products/ProductDetail";
import products from "@/data/_products";

interface ProductPageProps {
  params: { slug: string };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const product = products.find((p) => p.id === params.slug);

  if (!product) {
    return <p className="text-center text-red-500">Sản phẩm không tồn tại!</p>;
  }

  return (
    <ProductDetail
      {...product}
      oldPrice={product.oldPrice.toString()}
      newPrice={product.newPrice.toString()}
      description={
        typeof product.description === "string"
          ? { text: product.description, images: [] }
          : product.description
      }
    />
  );
};

export default ProductPage;


