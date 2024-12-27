"use client";

import { Fragment, useContext } from "react";
import Image from "next/image";

import { ProductCard } from "@/components/feature/VendingMachine/ProductCard";
import { ModalContext } from "@/contexts/ModalContext";
import { ArrowNextIcon } from "@/components/common/icons/ArrowNextIcon";
import { ArrowPreviousIcon } from "@/components/common/icons/ArrowPreviousIcon";
import { useStepPreview } from "@/hooks/useStepPreview";
import { ProductContext } from "@/contexts/ProductContext";
import { useProductsQuery } from "@/hooks/useProducts";
import { Product } from "@/types/product";

export const ProductPreview = () => {
  const { product, setProduct } = useContext(ProductContext);
  const { openModal } = useContext(ModalContext);

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
    <div className="flex flex-col">
      <div className="flex justify-start gap-2 items-center bg-blue-700 bg-opacity-40 w-full h-[200px] sm:h-[190px]">
        {!product && (
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="text-lg3 text-neutral-100">Select a product</div>
          </div>
        )}
        {product && (
          <Fragment>
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
              <div className="w-full lg:w-[230px] h-full flex justify-center items-center sm:px-2">
                <div className="w-full relative bg-white overflow-hidden h-full md:h-[170px]">
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
                    !!product?.images && nextStep === product.images.length - 1
                  )
                }
              >
                <ArrowNextIcon />
              </button>
            </div>
            <div className="flex flex-col justify-center items-start w-full px-3 h-full">
              <div>
                <div className="text-lg2 text-neutral-100">{product?.name}</div>
                <div className="text-lg flex flex-row justify-between gap-4 w-full text-neutral-100">
                  <span>
                    Stock: {isRefetching ? "Loading" : product?.stockQuantity}
                  </span>
                </div>
                <div>{product?.description}</div>
              </div>
              <button
                className="bg-blue-500 text-neutral-100 rounded-lg px-2 py-1"
                disabled={product?.stockQuantity === 0}
                onClick={() => {
                  if (product?.stockQuantity === 0) {
                    alert("Out of stock");
                    return;
                  }
                  openModal();
                }}
              >
                <span className="text-lg text-neutral-100">
                  Buy {product?.price}฿
                </span>
              </button>
            </div>
          </Fragment>
        )}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 pt-2 gap-x-2 gap-y-3 items-center">
        {isLoading && <div>Loading...</div>}
        {data?.map((product: Product) => (
          <ProductCard
            key={`${product.id}_product`}
            product={product}
            setSelectedProduct={() => {
              setProduct(product);
              reset();
            }}
          />
        ))}
      </div>
    </div>
  );
};
