export interface CoinAndBanknote {
  id: number;
  type: string;
  denomination: string;
}

export interface MachineCoinAndBanknote {
  id: number;
  machineId: number;
  coinAndBanknoteId: number;
  quantity: number;
  coinAndBanknote: CoinAndBanknote;
  mapCoinAndQuantity: { [key: string]: number };
}
