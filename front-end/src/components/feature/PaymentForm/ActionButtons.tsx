"use client";

import { useContext } from "react";
import { Button } from "@headlessui/react";

import { Product } from "@/types/product";
import { Transaction } from "@/types/transaction";
import { ProductContext } from "@/contexts/ProductContext";
import { useProductsQuery } from "@/hooks/useProducts";
import {
  useMutationTransaction,
  useTransactionsQuery,
} from "@/hooks/useTransactions";
import { MoneySectionContext } from "@/contexts/MoneySectionContext";

export const ActionButtons = () => {
  const { product, setProduct } = useContext(ProductContext);
  const { totalReturn, resetMoney, setTotalReturn, setAmountDue } =
    useContext(MoneySectionContext);

  const { refetch } = useProductsQuery({
    enabled: false,
  });
  const { refetch: refetchTransaction } = useTransactionsQuery({
    enabled: false,
    customerId: 1,
  });
  const { mutate } = useMutationTransaction({
    onSuccess: (result: Transaction) => {
      refetch().then(() => {
        setProduct({
          ...product,
          stockQuantity: result?.stockQuantity ?? 0,
        } as Product);
      });
      refetchTransaction();
      resetMoney();
    },
  });

  return (
    <div className="flex space-x-2 p-1 justify-end">
      <Button
        onClick={() => {
          setProduct(null);
          resetMoney();
          setTotalReturn(0);
          setAmountDue(0);
        }}
        className="bg-red-500  text-neutral-100 rounded-lg px-2 py-1"
      >
        <span>Cancel</span>
      </Button>
      <Button
        onClick={() => {
          if (product) {
            mutate({
              customerId: 1,
              changeAmount: totalReturn,
              paidAmount: product.price,
              productId: product.id,
            });
          }
        }}
        className="bg-blue-500 min-w-24 text-neutral-100 rounded-lg px-2 py-1"
      >
        <span>Buy</span>
      </Button>
    </div>
  );
};
