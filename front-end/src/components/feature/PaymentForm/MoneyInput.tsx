import { MoneySectionContext } from "@/contexts/MoneySectionContext";
import { ProductContext } from "@/contexts/ProductContext";
import { useProductsQuery } from "@/hooks/useProducts";
import { useMutationTransaction } from "@/hooks/useTransactions";
import { Product } from "@/types/product";
import { Transaction } from "@/types/transaction";
import { useContext } from "react";

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
  const { totalReturn, resetMoney } = useContext(MoneySectionContext);

  const { refetch } = useProductsQuery({
    enabled: false,
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
    },
  });

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
        if (isCreateTransactionAfterDrop) {
          if (product) {
            mutate({
              customerId: 1,
              changeAmount: totalReturn,
              paidAmount: product.price,
              productId: product.id,
            });
            resetMoney();
          }
        }
      }}
      className="w-full disabled:bg-slate-200 text-center p-2 border-opacity-50 border-spacing-3 h-[100px] lg:h-[150px] border-2 rounded-md border-dashed border-gray-500"
      placeholder="Drop your Coins or Banknotes here"
      disabled={(coin.length > 0 || banknote.length > 0) && amount >= amountDue}
    />
  );
};
