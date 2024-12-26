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
  }, [coin, banknote]);

  return (
    <div className="text-neutral-600">
      <div className="flex flex-col gap-4 lg:bg-slate-100 bg-opacity-30 p-2 lg:p-4 rounded-lg">
        <div>
          <p className="text-lg2 mb-5">Amount Due: {amountDue}฿</p>
          <p className="text-lg2">Insert Coins</p>
          <p className="text-lg mt-3">Banknote:</p>
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
                <p className="text-lg">{banknote}฿</p>
              </button>
            ))}
          </div>
          <p className="text-lg mt-3">Coins:</p>
          <div className="flex flex-row text-white flex-wrap mt-2 gap-4">
            {coinList.map((coin) => (
              <button
                key={`${coin}_coin`}
                draggable
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full bg-yellow-400"
                onDragStart={(e) => handleDragStart(e, coin.toString(), "coin")}
                onClick={() => setCoin((prevCoins) => [...prevCoins, coin])}
              >
                <p className="text-lg">{coin}฿</p>
              </button>
            ))}
          </div>
        </div>
        <div className="lg:block hidden">
          <p className="text-lg mt-3">
            Drop your coin or banknote in below area:{" "}
          </p>
          <input
            type="text"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="w-full text-center p-2 border-opacity-50 border-spacing-3 h-[100px] lg:h-[200px] border-2 rounded-md border-dashed border-gray-500"
            placeholder="Drop your Coins or Banknotes here"
          />
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <div>
              <p className="text-lg lg:text-lg2">Total inserted: {amount}฿</p>
              <p className="text-lg lg:text-lg2">
                Change to be returned: {totalReturn}฿
              </p>
              <div>
                <span className="text-lg lg:text-lg2">
                  Change detail:{" "}
                  {Object.entries(coinChange).length > 0 ? (
                    <div className="flex flex-row gap-4">
                      {Object.entries(coinChange).map(([coin, value]) => (
                        <span key={`_${coin}_${value}`}>
                          {coin}฿ x {value},
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>0฿ x 0</p>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
