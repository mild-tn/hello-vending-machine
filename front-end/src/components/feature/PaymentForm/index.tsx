import React, { useContext, useEffect, useState } from "react";
import { MoneyInput } from "./MoneyInput";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import {
  banknoteList,
  calculateCoinChange,
  coinList,
} from "@/usecase/calculate-coin-change";
import { MoneySectionContext } from "@/contexts/MoneySectionContext";

export const PaymentForm = () => {
  const {
    amount,
    amountDue,
    banknotes,
    coins,
    setAmount,
    setCoins,
    setBanknotes,
    totalReturn,
    setTotalReturn,
  } = useContext(MoneySectionContext);
  const [coinChange, setCoinChange] = useState<{ [key: number]: number }>({});
  const { handleDragOver, handleDrop } = useDragAndDrop();

  useEffect(() => {
    const totalCoin = coins?.reduce((acc, curr) => acc + curr, 0);
    const totalBanknote = banknotes?.reduce((acc, curr) => acc + curr, 0);
    const total = totalCoin + totalBanknote;
    setTotalReturn(total - amountDue);
    setAmount(total);

    const map = calculateCoinChange(total - amountDue, [
      ...banknoteList,
      ...coinList,
    ]);
    setCoinChange(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coins, banknotes, amountDue]);

  return (
    <div className="text-neutral-600">
      <div className="flex flex-col gap-4 p-2 lg:p-4 md:rounded-none rounded-lg">
        <div>
          <div className="text-center lg:mb-2">
            <h2 className="text-lg lg:text-lg2 font-semibold text-gray-800">
              Amount Due: {amountDue}฿
            </h2>
          </div>
        </div>
        <div className="lg:block hidden">
          <MoneyInput
            coin={coins}
            banknote={banknotes}
            amount={amount}
            amountDue={amountDue}
            handleDragOver={handleDragOver}
            handleDrop={(e) => {
              handleDrop(e, ({ value, type }) => {
                if (type === "coin") {
                  setCoins([...coins, Number(value)]);
                } else {
                  setBanknotes([...banknotes, Number(value)]);
                }
              });
            }}
            isCreateTransactionAfterDrop
          />
        </div>
        <div className="lg:mt-4 lg:space-y-2 text-gray-800">
          <p className="flex justify-between">
            <span>Total inserted:</span>
            <span className="font-bold">{amount}฿</span>
          </p>

          <p className="flex items-end justify-between">
            <span>Change to be returned:</span>
            <span
              className={
                totalReturn >= 0
                  ? "text-green-500 font-bold"
                  : "text-red-500 font-bold"
              }
            >
              {totalReturn}฿
            </span>
          </p>

          <div className="lg:mt-2">
            <p className="mb-2">Change detail:</p>
            {Object.entries(coinChange).length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
                {Object.entries(coinChange).map(([coin, value]) => (
                  <div
                    key={`_${coin}_${value}`}
                    className="flex justify-start items-center px-1 py-1 bg-gray-100 rounded shadow-sm"
                  >
                    <span className="text-green-500 font-bold">{coin}฿ </span>
                    <span className="text-gray-800 font-semibold">
                      x{value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-bold text-gray-500">0฿ x 0</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
