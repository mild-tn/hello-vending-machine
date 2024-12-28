import { useContext } from "react";

import { ProductContext } from "@/contexts/ProductContext";

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
}: MoneyInputType) => {
  const { product } = useContext(ProductContext);

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
      className="w-full line-clamp-2 whitespace-pre-wrap disabled:bg-slate-200 flex-wrap flex text-center p-2 border-opacity-50 border-spacing-3 h-[100px] lg:h-[150px] border-2 rounded-md border-dashed border-gray-500"
      placeholder="Drop your Coins or Banknotes here"
      disabled={
        ((coin.length > 0 || banknote.length > 0) && amount >= amountDue) ||
        !product
      }
    />
  );
};
