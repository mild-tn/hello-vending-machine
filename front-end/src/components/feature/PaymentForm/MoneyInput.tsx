import { MoneySectionContext } from "@/contexts/MoneySectionContext";
import { ProductContext } from "@/contexts/ProductContext";
import { useProductsQuery } from "@/hooks/useProducts";
import {
  useMutationTransaction,
  useTransactionsQuery,
} from "@/hooks/useTransactions";
import { Product } from "@/types/product";
import { Transaction } from "@/types/transaction";
import { useContext, useEffect } from "react";

type MoneyInputType = {
  coin: number[];
  banknote: number[];
  amount: number;
  amountDue: number;
  handleDragOver: (e: React.DragEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLInputElement>) => void;
  isCreateTransactionAfterDrop?: boolean;
};
export const MoneyInput = ({
  coin,
  banknote,
  amount,
  amountDue,
  handleDragOver,
  handleDrop,
  isCreateTransactionAfterDrop = false,
}: MoneyInputType) => {
  const { product, setProduct } = useContext(ProductContext);
  const { totalReturn } = useContext(MoneySectionContext);

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
          isUpdated: true,
        } as Product);
      });
      refetchTransaction();
    },
  });

  useEffect(
    () => {
      if (amount >= amountDue && isCreateTransactionAfterDrop) {
        if (product) {
          mutate({
            customerId: 1,
            changeAmount: totalReturn,
            paidAmount: product.price,
            productId: product.id,
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [amount, amountDue]
  );

  return (
    <input
      type="text"
      onDragOver={handleDragOver}
      onDrop={(e) => {
        if ((coin.length > 0 || banknote.length > 0) && amount >= amountDue) {
          e.preventDefault();
          return;
        }
        handleDrop(e);
      }}
      className="w-full whitespace-break-spaces disabled:bg-slate-200 flex-wrap flex text-center p-2 border-opacity-50 border-spacing-3 h-[100px] lg:h-[150px] border-2 rounded-md border-dashed border-gray-500"
      placeholder="Drop your Coins or Banknotes here"
      disabled={
        ((coin.length > 0 || banknote.length > 0) && amount >= amountDue) ||
        !product
      }
    />
  );
};
