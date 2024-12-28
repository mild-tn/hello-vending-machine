"use client";

import { Fragment, useContext } from "react";
import Image from "next/image";

import { ProductCard } from "@/components/feature/VendingMachine/ProductCard";
import { ArrowNextIcon } from "@/components/common/icons/ArrowNextIcon";
import { ArrowPreviousIcon } from "@/components/common/icons/ArrowPreviousIcon";
import { useStepPreview } from "@/hooks/useStepPreview";
import { ProductContext } from "@/contexts/ProductContext";
import { useProductsQuery } from "@/hooks/useProducts";
import { Product } from "@/types/product";
import { PaymentForm } from "../PaymentForm";
import { MoneySectionContext } from "@/contexts/MoneySectionContext";

export const ProductPreview = () => {
  const { product, setProduct } = useContext(ProductContext);
  const { setAmountDue, resetMoney } = useContext(MoneySectionContext);

  const { data = [], isLoading, isRefetching } = useProductsQuery();
  const {
    handleNextStep,
    handlePrevStep,
    previousStep,
    nextStep,
    currentStep,
    reset,
  } = useStepPreview();

  return (
    <div className="flex flex-row gap-4">
      <div className="w-[55%]">
        <div className="flex justify-start items-center bg-blue-700 bg-opacity-40 w-full lg:h-[200px] sm:h-[270px]">
          {!product && (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="text-lg3 text-neutral-100">Select a product</div>
            </div>
          )}
          {product && (
            <div className="flex flex-col lg:flex-row justify-center items-center lg:w-full  h-full">
              <div className="flex flex-row justify-center items-center w-full h-full">
                <button
                  className="sm:block hidden"
                  onClick={() =>
                    handlePrevStep(
                      !!product?.images && previousStep === 0,
                      product?.images?.length ?? 0
                    )
                  }
                >
                  <ArrowPreviousIcon />
                </button>
                <div className="w-full sm:h-[160px] lg:w-[230px] h-full flex justify-center items-center sm:px-2">
                  <div className="w-full relative bg-white overflow-hidden lg:h-[160px] sm:h-[120px]">
                    {product?.images && (
                      <Image
                        src={product?.images[currentStep]}
                        alt={product.name}
                        sizes="100px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    )}
                    {product?.images && product.images.length > 0 && (
                      <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded-bl-lg">
                        {currentStep + 1}/{product.images.length}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className="sm:block hidden"
                  onClick={() =>
                    handleNextStep(
                      !!product?.images &&
                        nextStep === product.images.length - 1
                    )
                  }
                >
                  <ArrowNextIcon />
                </button>
              </div>
              <div className="flex flex-col justify-center items-start w-full px-3 h-full">
                <div>
                  <div className="text-lg2 text-neutral-100">
                    {product?.name}
                  </div>
                  <div className="text-lg flex flex-row justify-between gap-4 w-full text-neutral-100">
                    <span>
                      Stock: {isRefetching ? "Loading" : product?.stockQuantity}
                    </span>
                  </div>
                  <div>{product?.description}</div>
                </div>
              </div>
            </div>
          )}
          <div className="sm:flex lg:hidden bg-gray-300 justify-center items-center w-full h-full">
            <PaymentForm />
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 pt-2 gap-x-2 gap-y-3 items-center">
          {isLoading && <div>Loading...</div>}
          {data?.map((product: Product) => (
            <ProductCard
              key={`${product.id}_product`}
              product={product}
              setSelectedProduct={() => {
                resetMoney();
                setProduct(product);
                setAmountDue(Number(product.price));
                reset();
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-[45%] lg:block hidden flex-col gap-2">
        <div className=" bg-slate-100 h-[560px]">
          <PaymentForm />
        </div>
        <div className="bg-neutral-600 p-1 flex flex-col justify-center items-center w-full mt-2 h-[200px]">
          {!product?.isUpdated && (
            <p className="text-lg font-bold">Get your product here</p>
          )}
          {product?.isUpdated && (
            <Fragment>
              <div className="w-[200px] h-[150px] relative overflow-hidden">
                {product?.images && (
                  <Image
                    src={product?.images?.[0]}
                    alt={product.name}
                    sizes="100px"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <p className="text-base text-center p-1 flex-wrap font-bold">
                Thank you for your purchase of {product?.name} for{" "}
                {product?.price}฿ <br /> Enjoy your snack! 🍫
              </p>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
