"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

import { PaymentForm } from "@/components/feature/PaymentForm";
import { getProducts } from "@/service/product";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/feature/VendingMachine/ProductCard";

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      (await getProducts()).map((product) => ({
        ...product,
        images: JSON.parse((product?.images as string) ?? "[]"),
      })),
    queryKey: ["products"],
  });

  return (
    <div className="bg-gradient-to-br flex flex-row justify-center gap-11 w-full p-4 h-dvh from-blue-500 via-violet-200 to-purple-400 text-neutral-100">
      <div className="w-[594px] rounded-lg h-full p-3 bg-opacity-45 bg-sky-100">
        <div className="flex mb-2 justify-center">
          <div className="text-xl">Blue Vending Machine</div>
        </div>
        <div className="flex relative overflow-hidden justify-center bg-slate-400 w-full h-[190px]">
          {selectedProduct?.images && (
            <Image
              src={selectedProduct.images[0]}
              alt={selectedProduct.name}
              objectFit="contain"
              fill={true}
            />
          )}
        </div>
        <div></div>
        {data && !data.length && <div>No product available</div>}
        <div className="grid grid-cols-4 pt-2 gap-x-2 gap-y-3 items-center">
          {isLoading && <div>Loading...</div>}
          {data?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              setSelectedProduct={setSelectedProduct}
            />
          ))}
        </div>
      </div>
      <div className="w-auto">
        <PaymentForm amountDue={Number(selectedProduct?.price ?? 0)} />
      </div>
    </div>
  );
};

export default Home;
