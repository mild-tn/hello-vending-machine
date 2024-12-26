import Image from "next/image";

import { Product } from "@/types/product";

export const ProductCard = ({
  product,
  setSelectedProduct,
}: {
  product: Product;
  setSelectedProduct: (product: Product) => void;
}) => {
  return (
    <div className="flex flex-col  lg:h-[180px] lg:w-[140px]">
      <button
        disabled={product.stockQuantity === 0}
        onClick={() => setSelectedProduct(product)}
        className="relative disabled:cursor-not-allowed overflow-hidden flex flex-col h-[100px] lg:h-[150px] w-full"
      >
        {product.images && (
          <Image
            src={product?.images[0]}
            alt={product.name}
            sizes="300px"
            fill
            priority={true}
            style={{
              objectFit: "cover",
              opacity: product.stockQuantity === 0 ? 0.5 : 1,
            }}
          />
        )}
      </button>
      <div className="p-1 bg-slate-50 bg-blend-lighten rounded-b-lg">
        <div className="text-neutral-700 text-lg">{product.name}</div>
        <div>
          <span className="text-base text-Neutral/900">Price:</span>{" "}
          <span className="text-base text-Neutral/600">{product.price}฿</span>
        </div>
      </div>
    </div>
  );
};
