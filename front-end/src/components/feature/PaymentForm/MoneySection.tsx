import { Fragment } from "react";

type MoneySectionType = {
  coinList: number[];
  banknoteList: number[];
  coin: number[];
  banknote: number[];
  amount: number;
  amountDue: number;
  setCoin: (value: number[]) => void;
  setBanknote: (value: number[]) => void;
  handleDragStart: (
    e: React.DragEvent<HTMLButtonElement>,
    value: string,
    type: string
  ) => void;
};
export const MoneySection = ({
  coinList,
  banknoteList,
  coin,
  banknote,
  amount,
  amountDue,
  setCoin,
  setBanknote,
  handleDragStart,
}: MoneySectionType) => {
  return (
    <Fragment>
      <h3 className="text-lg2 font-semibold mb-2">
        Insert your Coins/Banknote:
      </h3>
      <div className="space-y-4">
        <div>
          <p className="mb-2 font-semibold text-gray-700">Banknotes:</p>
          <div className="grid grid-cols-5 gap-1">
            {banknoteList.map((note) => (
              <button
                key={`${note}_banknote`}
                draggable
                onDragStart={(e) => {
                  handleDragStart(e, note.toString(), "banknote");
                }}
                onClick={(e) => {
                  if (
                    (coin.length > 0 || banknote.length > 0) &&
                    amount >= amountDue
                  ) {
                    e.preventDefault();
                    return;
                  }
                  setBanknote([...banknote, note]);
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
                    (coin.length > 0 || banknote.length > 0) &&
                    amount >= amountDue
                  ) {
                    e.preventDefault();
                    return;
                  }
                  setCoin([...coin, item]);
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
