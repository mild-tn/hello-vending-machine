"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { getProducts } from "@/service/product";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/feature/VendingMachine/ProductCard";

const PaymentForm = dynamic<{
  amountDue: number;
}>(
  () =>
    import("@/components/feature/PaymentForm").then((mod) => mod.PaymentForm),
  {
    ssr: false,
  }
);

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [nextStep, setNextStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading } = useQuery({
    queryFn: async () =>
      (await getProducts()).map((product) => ({
        ...product,
        images: JSON.parse((product?.images as string) ?? "[]"),
      })),
    queryKey: ["products"],
  });

  const handleNextStep = () => {
    if (
      selectedProduct?.images &&
      nextStep === selectedProduct.images.length - 1
    ) {
      setNextStep(0);
      setCurrentStep(0);
      return;
    }
    setNextStep(nextStep + 1);
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (selectedProduct?.images && previousStep === 0) {
      setPreviousStep(selectedProduct.images.length - 1);
      setCurrentStep(selectedProduct.images.length - 1);
      return;
    }
    setPreviousStep(previousStep - 1);
    setCurrentStep(currentStep - 1);
  };

  if (!isClient) return null;

  return (
    <div className="bg-gradient-to-br md:flex flex flex-col lg:flex-row justify-center gap-4 xl:gap-10 2xl:gap-11 w-full p-4 from-blue-500 via-violet-200 to-purple-400 text-neutral-100">
      <div className="w-full lg:w-[600px] 2xl:w-[594px] rounded-lg h-full p-3 bg-opacity-45 bg-sky-100">
        <div className="flex mb-2 justify-center">
          <div className="sm:text-base md:text-xl font-bold">
            Blue Vending Machine
          </div>
        </div>
        <div className="flex lg:flex-col md:flex-row sm:gap-2 lg:gap-4">
          <div className="w-full md:w-[70%] lg:w-full">
            <div className="flex justify-start gap-2 items-center bg-blue-700 bg-opacity-40 w-full h-[200px] sm:h-[190px]">
              <div className="flex flex-row justify-center items-center w-full h-full">
                <button
                  className="sm:block hidden"
                  onClick={handlePreviousStep}
                >
                  <svg
                    className="w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                    ></path>
                  </svg>
                </button>
                <div className="w-full lg:w-[230px] h-full flex justify-center items-center sm:px-2">
                  <div className="w-full relative bg-white overflow-hidden h-full sm:h-[100px] lg:h-[150px]">
                    {selectedProduct?.images && (
                      <Image
                        src={selectedProduct?.images[currentStep]}
                        alt={selectedProduct.name}
                        sizes="100px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    )}
                    {selectedProduct?.images &&
                      selectedProduct.images.length > 0 && (
                        <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded-bl-lg">
                          {currentStep + 1}/{selectedProduct.images.length}
                        </div>
                      )}
                  </div>
                </div>
                <button className="sm:block hidden" onClick={handleNextStep}>
                  <svg
                    className="w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col justify-center items-start w-full px-3 h-full">
                <div className="text-lg2 text-neutral-100">
                  {selectedProduct?.name}
                </div>
                <div className="text-lg flex flex-row justify-between gap-4 w-full text-neutral-100">
                  Price: {selectedProduct?.price}฿
                  <span>Stock: {selectedProduct?.stock_quantity}</span>
                </div>
                <div>{selectedProduct?.description}</div>
              </div>
            </div>
            {data && !data.length && (
              <p className="text-lg2 text-red-500">No product available</p>
            )}
            <div className="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 pt-2 gap-x-2 gap-y-3 items-center">
              {isLoading && <div>Loading...</div>}
              {data?.map((product) => (
                <ProductCard
                  key={`${product.id}_product`}
                  product={product}
                  setSelectedProduct={() => {
                    setSelectedProduct(product);
                    setCurrentStep(0);
                    setNextStep(0);
                    setPreviousStep(0);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="w-[50%] hidden sm:block md:w-[30%] lg:w-[30%] lg:hidden">
            <PaymentForm amountDue={Number(selectedProduct?.price ?? 0)} />
          </div>
        </div>
      </div>
      <div className="w-auto hidden lg:block">
        <PaymentForm amountDue={Number(selectedProduct?.price ?? 0)} />
      </div>
    </div>
  );
};

export default Home;
