import React, { useEffect } from "react";

type PaymentFormType = {
  amountDue: number;
  onChange: (value: { total: number; totalReturn: number }) => void;
};
export const PaymentForm = ({ amountDue, onChange }: PaymentFormType) => {
  const coinList = [10, 5, 1];
  const banknoteList = [1000, 500, 100, 50, 20];
  const [coin, setCoin] = React.useState<number[] | []>([]);
  const [banknote, setBanknote] = React.useState<number[] | []>([]);
  const [totalReturn, setTotalReturn] = React.useState<number>(0);
  const [amount, setAmount] = React.useState<number>(0);
  const [coinChange, setCoinChange] = React.useState<{ [key: number]: number }>(
    {}
  );

  const handleDragStart = (
    e: React.DragEvent<HTMLButtonElement>,
    value: string,
    type: string
  ) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ value, type }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const { value, type } = JSON.parse(data);
    if (type === "coin") {
      setCoin((prevCoins) =>
        prevCoins ? [...prevCoins, Number(value)] : [Number(value)]
      );
    } else {
      setBanknote((prevBanknotes) =>
        prevBanknotes ? [...prevBanknotes, Number(value)] : [Number(value)]
      );
    }
  };

  const calculateCoinChange = (amount: number, coinOrBankList: number[]) => {
    const result: { [key: number]: number } = {};

    for (const coin of coinOrBankList) {
      const count = Math.floor(amount / coin);
      if (count > 0) {
        amount = amount % coin;
        result[coin] = count;
      }
    }

    return result;
  };

  useEffect(() => {
    const totalCoin = coin?.reduce((acc, curr) => acc + curr, 0);
    const totalBanknote = banknote?.reduce((acc, curr) => acc + curr, 0);
    const total = totalCoin + totalBanknote;
    console.log("total", total, totalReturn, totalBanknote, totalCoin);
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
          <h3 className="text-lg2 font-semibold mb-2">
            Insert Coins/Banknote:
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
                      setBanknote((prevBanknotes) => [...prevBanknotes, note]);
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
                    onDragStart={(e) =>
                      handleDragStart(e, item.toString(), "coin")
                    }
                    onClick={(e) => {
                      if (
                        (coin.length > 0 || banknote.length > 0) &&
                        amount >= amountDue
                      ) {
                        e.preventDefault();
                        return;
                      }
                      setCoin((prevCoins) => [...prevCoins, item]);
                    }}
                  >
                    {coin}฿
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:block hidden">
          <input
            type="text"
            onDragOver={handleDragOver}
            onDrop={(e) => {
              if (
                (coin.length > 0 || banknote.length > 0) &&
                amount >= amountDue
              ) {
                e.preventDefault();
                return;
              }
              handleDrop(e);
            }}
            className="w-full disabled:bg-slate-200 text-center p-2 border-opacity-50 border-spacing-3 h-[100px] lg:h-[200px] border-2 rounded-md border-dashed border-gray-500"
            placeholder="Drop your Coins or Banknotes here"
            disabled={
              (coin.length > 0 || banknote.length > 0) && amount >= amountDue
            }
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
