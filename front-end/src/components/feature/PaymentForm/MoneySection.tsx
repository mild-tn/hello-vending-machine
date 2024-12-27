"use client";
import { Fragment, useContext } from "react";

import { MoneySectionContext } from "@/contexts/MoneySectionContext";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { banknoteList, coinList } from "@/usecase/calculate-coin-change";

export const MoneySection = () => {
  const { handleDragStart } = useDragAndDrop();
  const { amount, amountDue, banknotes, coins, setBanknotes, setCoins } =
    useContext(MoneySectionContext);

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
                  handleDragStart(e, note.toString(), "banknote");
                }}
                onClick={(e) => {
                  if (
                    (coins.length > 0 || banknotes.length > 0) &&
                    amount >= amountDue
                  ) {
                    e.preventDefault();
                    return;
                  }
                  setBanknotes([...banknotes, note]);
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
                  if (
                    (coins.length > 0 || banknotes.length > 0) &&
                    amount >= amountDue
                  ) {
                    e.preventDefault();
                    return;
                  }
                  setCoins([...coins, item]);
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
