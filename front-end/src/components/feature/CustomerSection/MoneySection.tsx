"use client";
import { Fragment, MouseEvent, useContext, useEffect } from "react";

import { MoneySectionContext } from "@/contexts/MoneySectionContext";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { banknoteList, coinList } from "@/usecase/calculate-coin-change";
import { ProductContext } from "@/contexts/ProductContext";
import { useProductsQuery } from "@/hooks/useProducts";
import {
  useMutationTransaction,
  useTransactionsQuery,
} from "@/hooks/useTransactions";
import { Transaction } from "@/types/transaction";
import { Product } from "@/types/product";

export const MoneySection = () => {
  const { handleDragStart } = useDragAndDrop();
  const {
    amount,
    amountDue,
    banknotes,
    coins,
    setBanknotes,
    setCoins,
    totalReturn,
  } = useContext(MoneySectionContext);
  const { product, setProduct } = useContext(ProductContext);

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

  const handleClick = (
    e: MouseEvent<HTMLButtonElement>,
    callBack: () => void
  ) => {
    if (amount < amountDue) {
      e.preventDefault();
      callBack();
    }
  };

  useEffect(() => {
    if (amount >= amountDue) {
      if (product) {
        mutate({
          customerId: 1,
          changeAmount: totalReturn,
          paidAmount: product.price,
          productId: product.id,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, amountDue]);

  return (
    <Fragment>
      <h3 className="text-lg2 text-slate-800 font-semibold mb-2">
        Your Coins/Banknote
      </h3>
      <div className="space-y-4">
        <div>
          <p className="mb-2 font-semibold text-gray-700">Banknotes:</p>
          <div className="grid grid-cols-3 gap-1">
            {banknoteList.map((note) => (
              <button
                key={`${note}_banknote`}
                draggable
                onDragStart={(e) => {
                  if (!e.defaultPrevented) {
                    handleDragStart(e, note.toString(), "banknote");
                  }
                }}
                onClick={(e) => {
                  if (!e.defaultPrevented) {
                    handleClick(e, () => setBanknotes([...banknotes, note]));
                  }
                }}
                className="w-full py-3 bg-green-300 hover:bg-green-400 text-green-800 font-bold rounded shadow"
              >
                {note}฿
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 font-semibold text-gray-700">Coins:</p>
          <div className="flex flex-row gap-4">
            {coinList.map((item) => (
              <button
                key={`${item}_coin`}
                draggable
                className="w-[50px] h-[50px] rounded-full py-3 bg-yellow-300 hover:bg-yellow-400 text-yellow-800 font-bold shadow"
                onDragStart={(e) => handleDragStart(e, item.toString(), "coin")}
                onClick={(e) => {
                  if (!e.defaultPrevented) {
                    handleClick(e, () => setCoins([...coins, item]));
                  }
                }}
              >
                {item}฿
              </button>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
