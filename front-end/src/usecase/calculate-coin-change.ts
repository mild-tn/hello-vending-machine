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
