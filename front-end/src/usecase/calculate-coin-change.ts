export const coinList = [10, 5, 1];
export const banknoteList = [1000, 500, 100, 50, 20];

export const calculateCoinChange = (
  amount: number,
  coinOrBankList: number[],
  availableCoins: { [key: number]: number }
) => {
  const result: { [key: number]: number } = {};

  for (const coin of coinOrBankList) {
    const maxNeeded = Math.floor(amount / coin);
    const available = availableCoins?.[coin] || 0;
    const used = Math.min(maxNeeded, available);

    if (used > 0) {
      result[coin] = used;
      amount -= used * coin;
    }
  }

  if (amount > 0) {
    return {
      success: false,
      message: "Not enough coins or banknotes for the change.",
      changeUsed: result,
    };
  }

  return {
    success: Object.keys(result).length > 0,
    changeUsed: result,
  };
};
