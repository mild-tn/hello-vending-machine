import React, { useEffect, useState } from "react";
import { MoneySection } from "./MoneySection";
import { MoneyInput } from "./MoneyInput";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { calculateCoinChange } from "@/usecase/calculate-coin-change";

type PaymentFormType = {
  amountDue: number;
  onChange: (value: { total: number; totalReturn: number }) => void;
};

export const PaymentForm = ({ amountDue, onChange }: PaymentFormType) => {
  const coinList = [10, 5, 1];
  const banknoteList = [1000, 500, 100, 50, 20];
  const [coin, setCoin] = useState<number[] | []>([]);
  const [banknote, setBanknote] = useState<number[] | []>([]);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [coinChange, setCoinChange] = useState<{ [key: number]: number }>({});
  const { handleDragOver, handleDragStart, handleDrop } = useDragAndDrop();

  useEffect(() => {
    const totalCoin = coin?.reduce((acc, curr) => acc + curr, 0);
    const totalBanknote = banknote?.reduce((acc, curr) => acc + curr, 0);
    const total = totalCoin + totalBanknote;
    setTotalReturn(total - amountDue);
    setAmount(total);

    const map = calculateCoinChange(total - amountDue, [
      ...banknoteList,
      ...coinList,
    ]);
    setCoinChange(map);
    onChange({
      total,
      totalReturn: total - amountDue,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin, banknote, amountDue]);

  return (
    <div className="text-neutral-600 sm:w-[500px]">
      <div className="flex flex-col gap-4 bg-slate-100 p-2 lg:p-4 rounded-lg">
        <div>
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Amount Due: {amountDue}฿
            </h2>
          </div>
          <MoneySection
            coinList={coinList}
            banknoteList={banknoteList}
            coin={coin}
            banknote={banknote}
            amount={amount}
            amountDue={amountDue}
            setCoin={setCoin}
            setBanknote={setBanknote}
            handleDragStart={handleDragStart}
          />
        </div>
        <div className="lg:block hidden">
          <MoneyInput
            coin={coin}
            banknote={banknote}
            amount={amount}
            amountDue={amountDue}
            handleDragOver={handleDragOver}
            handleDrop={(e) => {
              handleDrop(e, ({ value, type }) => {
                if (type === "coin") {
                  setCoin((prevCoins) =>
                    prevCoins ? [...prevCoins, Number(value)] : [Number(value)]
                  );
                } else {
                  setBanknote((prevBanknotes) =>
                    prevBanknotes
                      ? [...prevBanknotes, Number(value)]
                      : [Number(value)]
                  );
                }
              });
            }}
          />
        </div>
        <div className="mt-4 space-y-2 text-gray-800">
          <p className="flex justify-between">
            <span>Total inserted:</span>
            <span className="font-bold">{amount}฿</span>
          </p>

          <p className="flex justify-between">
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

          <div className="mt-2">
            <p className="mb-2">Change detail:</p>
            {Object.entries(coinChange).length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
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
