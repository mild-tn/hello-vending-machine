import React, { useContext, useEffect } from "react";
import { MoneyInput } from "./MoneyInput";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import {
  banknoteList,
  calculateCoinChange,
  coinList,
} from "@/usecase/calculate-coin-change";
import { MoneySectionContext } from "@/contexts/MoneySectionContext";
import { useQueryMachineCoinAndBanknote } from "@/hooks/useMachineCoinAndBanknote";
import { ActionButtons } from "./ActionButtons";

export const PaymentForm = () => {
  const {
    amount,
    amountDue,
    banknotes,
    coins,
    totalReturn,
    mapCoinChange,
    setAmount,
    setCoins,
    setBanknotes,
    setTotalReturn,
    setMapCoinChange,
  } = useContext(MoneySectionContext);
  const { handleDragOver, handleDrop } = useDragAndDrop();
  const { data } = useQueryMachineCoinAndBanknote(1); // hardcode machine id for now

  useEffect(() => {
    const totalCoin = coins?.reduce((acc, curr) => acc + curr, 0);
    const totalBanknote = banknotes?.reduce((acc, curr) => acc + curr, 0);
    const total = totalCoin + totalBanknote;
    setTotalReturn(total - amountDue);
    setAmount(total);

    const map = calculateCoinChange(
      total - amountDue,
      [...banknoteList, ...coinList],
      data?.mapCoinAndQuantity || {}
    );

    setMapCoinChange(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coins, banknotes, amountDue]);

  return (
    <div className="flex h-full w-full justify-between flex-col gap-2 p-2 lg:p-4 md:rounded-none rounded-lg">
      <h2 className="text-lg text-center lg:mb-2 lg:text-lg2 font-semibold text-gray-800">
        Amount Due: {amountDue}฿
      </h2>
      <div>
        {/* available coins form api */}
        {data?.mapCoinAndQuantity && (
          <div className="flex flex-col gap-1">
            <p className="text-gray-800">Available Coins:</p>
            <div className="grid grid-cols-4 gap-1">
              {Object.entries(data.mapCoinAndQuantity).map(
                ([coin, quantity]) => (
                  <div
                    key={`_${coin}_${quantity}`}
                    className="flex justify-start items-center py-1 bg-gray-100 rounded shadow-sm"
                  >
                    <span
                      className={
                        quantity === 0
                          ? "text-gray-400 opacity-50 font-bold"
                          : "text-green-500 font-bold"
                      }
                    >
                      {coin}฿
                    </span>
                    <span
                      className={
                        quantity === 0
                          ? "text-gray-400 opacity-50 font-semibold"
                          : "text-gray-800 font-semibold"
                      }
                    >
                      x{quantity}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
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
      <div className="h-[18px] text-base">
        {mapCoinChange.success ? (
          <p className="text-green-500 font-bold">
            Change calculated successfully
          </p>
        ) : (
          <p className="text-red-500  font-bold">{mapCoinChange.message}</p>
        )}
      </div>
      <div className="lg:mt-1 lg:space-y-2 text-gray-800">
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
          {Object.entries(mapCoinChange.changeUsed)?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
              {Object.entries(mapCoinChange.changeUsed).map(([coin, value]) => (
                <div
                  key={`_${coin}_${value}`}
                  className="flex justify-start items-center px-1 py-1 bg-gray-100 rounded shadow-sm"
                >
                  <span className="text-green-500 font-bold">{coin}฿ </span>
                  <span className="text-gray-800 font-semibold">x {value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-bold text-gray-500">0฿ x 0</p>
          )}
        </div>
      </div>

      <div className="pt-3">
        <ActionButtons />
      </div>
    </div>
  );
};
