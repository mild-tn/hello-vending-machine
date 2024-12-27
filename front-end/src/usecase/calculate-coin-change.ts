export const coinList = [10, 5, 1];
export const banknoteList = [1000, 500, 100, 50, 20];

export const calculateCoinChange = (
  amount: number,
  coinOrBankList: number[]
) => {
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
