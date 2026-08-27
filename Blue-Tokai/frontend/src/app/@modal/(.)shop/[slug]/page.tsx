import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getAllProducts,
  categoryNameOf,
  categorySlugOf,
} from "../../../../lib/products";
import ProductDetailContent from "../../../../components/shop/ProductDetailContent";
import ProductModal from "../../../../components/shop/ProductModal";

export default async function ProductModalPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  console.log(
    "MODAL DEBUG — slug:",
    params.slug,
    "| product found:",
    !!product,
  );
  if (!product) notFound();

  const categoryName = categoryNameOf(product);
  const categorySlug = categorySlugOf(product);

  const allProducts = await getAllProducts();
  const related = allProducts
    .filter(
      (p) => p.slug !== product.slug && categorySlugOf(p) === categorySlug,
    )
    .slice(0, 4);

  return (
    <ProductModal>
      <ProductDetailContent
        product={product}
        categoryName={categoryName}
        related={related}
      />
    </ProductModal>
  );
}
