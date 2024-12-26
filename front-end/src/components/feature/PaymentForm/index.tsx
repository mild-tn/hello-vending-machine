import React, { useEffect } from "react";

export const PaymentForm = ({ amountDue }: { amountDue: number }) => {
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
    setTotalReturn(total - amountDue);
    setAmount(total);

    const map = calculateCoinChange(total - amountDue, [
      ...banknoteList,
      ...coinList,
    ]);
    setCoinChange(map);
  }, [coin, banknote, amountDue]);

  return (
    <div className="text-neutral-600">
      <div className="flex flex-col gap-4 bg-slate-100 p-2 lg:p-4 rounded-lg">
        <div>
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Amount Due: {amountDue}฿
            </h2>
          </div>
          <h3 className="text-lg font-medium mb-2">Insert Coins/Banknote:</h3>
          <div className="flex flex-row text-white flex-wrap gap-2">
            {banknoteList.map((banknote) => (
              <button
                key={`${banknote}_banknote`}
                draggable
                className="w-[90px] lg:w-[120px] h-[40px] lg:h-[50px] rounded-lg bg-green-400"
                onDragStart={(e) =>
                  handleDragStart(e, banknote.toString(), "banknote")
                }
                onClick={() =>
                  setBanknote((prevBanknotes) => [...prevBanknotes, banknote])
                }
              >
                <p className="text-lg font-semibold">{banknote}฿</p>
              </button>
            ))}
          </div>
          <div className="flex flex-row text-white flex-wrap mt-2 gap-4">
            {coinList.map((coin) => (
              <button
                key={`${coin}_coin`}
                draggable
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full bg-yellow-400"
                onDragStart={(e) => handleDragStart(e, coin.toString(), "coin")}
                onClick={() => setCoin((prevCoins) => [...prevCoins, coin])}
              >
                <p className="text-lg font-semibold">{coin}฿</p>
              </button>
            ))}
          </div>
        </div>
        <div className="lg:block hidden">
          <input
            type="text"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="w-full text-center p-2 border-opacity-50 border-spacing-3 h-[100px] lg:h-[200px] border-2 rounded-md border-dashed border-gray-500"
            placeholder="Drop your Coins or Banknotes here"
          />
        </div>
        <div>
          <p className="text-gray-800">
            Total inserted: <span className="font-bold">{amount}฿</span>
          </p>
          <p className="text-gray-800">
            Change to be returned:{" "}
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
          <div className="flex flex-row justify-between">
            <span className="text-gray-800">
              Change detail:{" "}
              {Object.entries(coinChange).length > 0 ? (
                <div className="flex flex-row flex-wrap gap-2">
                  {Object.entries(coinChange).map(([coin, value]) => (
                    <span key={`_${coin}_${value}`} className="font-bold">
                      {coin}฿ x {value} |
                    </span>
                  ))}
                </div>
              ) : (
                <p className="font-bold">0฿ x 0</p>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
