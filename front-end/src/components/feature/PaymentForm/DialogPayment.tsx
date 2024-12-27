"use client";

import { useContext, useState } from "react";
import { Button, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { ModalContext } from "@/contexts/ModalContext";
import { Product } from "@/types/product";
import { Transaction } from "@/types/transaction";
import { PaymentForm } from ".";
import { ProductContext } from "@/contexts/ProductContext";
import { useProductsQuery } from "@/hooks/useProducts";
import { useMutationTransaction } from "@/hooks/useTransactions";

export const DialogPayment = () => {
  const [changeAmount, setChangeAmount] = useState(0);
  const { product, setProduct } = useContext(ProductContext);
  const { isOpen, openModal, closeModal } = useContext(ModalContext);

  const { refetch } = useProductsQuery({
    enabled: false,
  });
  const { mutate } = useMutationTransaction({
    onSuccess: (result: Transaction) => {
      refetch().then(() => {
        setProduct({
          ...product,
          stockQuantity: result?.stockQuantity ?? 0,
        } as Product);
      });
    },
  });

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeModal()}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-1 border bg-white rounded-lg p-2">
          <PaymentForm
            onChange={({ totalReturn }) => {
              setChangeAmount(totalReturn);
            }}
            amountDue={Number(product?.price ?? 0)}
          />
          <div className="flex space-x-2 p-1 justify-end">
            <Button
              onClick={() => openModal()}
              className="bg-red-500  text-neutral-100 rounded-lg px-2 py-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              onClick={() => {
                if (product) {
                  mutate({
                    customerId: 1,
                    changeAmount: changeAmount,
                    paidAmount: product.price,
                    productId: product.id,
                  });
                }
                closeModal();
              }}
              className="bg-blue-500 min-w-32 text-neutral-100 rounded-lg px-2 py-1"
            >
              <span>Confirm</span>
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
