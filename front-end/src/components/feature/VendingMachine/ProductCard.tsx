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
    <div className="bg-gradient-to-br flex flex-col h-[180px] w-[140px]">
      <button
        onClick={() => setSelectedProduct(product)}
        className="relative bg-slate-50 overflow-hidden flex flex-col h-[150px] w-full"
      >
        {product.images && (
          <Image
            src={product?.images[0]}
            alt={product.name}
            sizes="300px"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        )}
      </button>
      <div className="p-1 bg-white">
        <div className="text-neutral-700 text-lg">{product.name}</div>
        <div>
          <span className="text-base text-Neutral/900">Price:</span>{" "}
          <span className="text-base text-Neutral/600">{product.price}฿</span>
        </div>
        <div>
          <span className="text-base text-Neutral/900">Remain: </span>
          <span className="text-base text-Neutral/600">
            {product.stock_quantity} items
          </span>
        </div>
      </div>
    </div>
  );
};
