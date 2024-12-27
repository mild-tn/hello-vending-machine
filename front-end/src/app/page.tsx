"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState, useEffect, Fragment } from "react";

import { getProducts } from "@/service/product";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/feature/VendingMachine/ProductCard";
import { Button, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { createTransaction } from "@/service/transaction";
import { Transaction, TransactionBody } from "@/types/transaction";
import { PaymentForm } from "@/components/feature/PaymentForm";

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [nextStep, setNextStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [changeAmount, setChangeAmount] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryFn: async () =>
      (await getProducts()).map((product) => ({
        ...product,
        images: JSON.parse((product?.images as string) ?? "[]"),
      })),
    queryKey: ["products"],
  });

  const mutation = useMutation({
    mutationFn: async (transaction: TransactionBody) => {
      return await createTransaction(transaction);
    },
    onSuccess: (result: Transaction) => {
      refetch();
      setSelectedProduct({
        ...selectedProduct,
        stockQuantity: result?.stockQuantity ?? 0,
      } as Product);
    },
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
    <div className="bg-gradient-to-br md:flex flex flex-col items-center h-auto lg:flex-row justify-center gap-4 xl:gap-10 2xl:gap-11 w-full p-4 from-blue-500 via-violet-200 to-purple-400 text-neutral-100">
      <Dialog
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-1 border bg-white rounded-lg p-2">
            <PaymentForm
              onChange={({ totalReturn }) => {
                setChangeAmount(totalReturn);
              }}
              amountDue={Number(selectedProduct?.price ?? 0)}
            />
            <div className="flex space-x-2 p-1 justify-end">
              <Button
                onClick={() => setIsOpenModal(false)}
                className="bg-red-500  text-neutral-100 rounded-lg px-2 py-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                onClick={() => {
                  if (selectedProduct) {
                    mutation.mutate(
                      {
                        customerId: 1,
                        changeAmount: changeAmount,
                        paidAmount: selectedProduct.price,
                        productId: selectedProduct.id,
                      },
                      {
                        onSuccess: () => {
                          refetch();
                        },
                      }
                    );
                  }
                  setIsOpenModal(false);
                }}
                className="bg-blue-500 min-w-32 text-neutral-100 rounded-lg px-2 py-1"
              >
                <span>Confirm</span>
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <div className="w-full md:w-[594px] rounded-lg h-full p-3 bg-opacity-45 bg-blend-hard-light bg-sky-100">
        <div className="flex mb-2 justify-center">
          <div className="sm:text-base md:text-xl font-bold">
            Blue Vending Machine
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-start gap-2 items-center bg-blue-700 bg-opacity-40 w-full h-[200px] sm:h-[190px]">
            {!selectedProduct && (
              <div className="flex flex-col justify-center items-center w-full h-full">
                <div className="text-lg3 text-neutral-100">
                  Select a product
                </div>
              </div>
            )}
            {selectedProduct && (
              <Fragment>
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
                    <div className="w-full relative bg-white overflow-hidden h-full md:h-[170px]">
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
                  <div>
                    <div className="text-lg2 text-neutral-100">
                      {selectedProduct?.name}
                    </div>
                    <div className="text-lg flex flex-row justify-between gap-4 w-full text-neutral-100">
                      <span>
                        Stock:{" "}
                        {isRefetching
                          ? "Loading"
                          : selectedProduct?.stockQuantity}
                      </span>
                    </div>
                    <div>{selectedProduct?.description}</div>
                  </div>
                  <button
                    className="bg-blue-500 text-neutral-100 rounded-lg px-2 py-1"
                    disabled={selectedProduct?.stockQuantity === 0}
                    onClick={() => {
                      if (selectedProduct?.stockQuantity === 0) {
                        alert("Out of stock");
                        return;
                      }
                      setIsOpenModal(true);
                    }}
                  >
                    <span className="text-lg text-neutral-100">
                      Buy {selectedProduct?.price}฿
                    </span>
                  </button>
                </div>
              </Fragment>
            )}
          </div>
          {data && !data.length && (
            <p className="text-lg2 text-red-500">No product available</p>
          )}
          <div className="grid grid-cols-3 sm:grid-cols-4 pt-2 gap-x-2 gap-y-3 items-center">
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
      </div>
    </div>
  );
};

export default Home;
