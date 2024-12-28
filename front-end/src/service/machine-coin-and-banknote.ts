import { MachineCoinAndBanknote } from "@/types/machine-coin-and-banknote";

const API_URL = process.env.API_URL;

export const getCoinAndBanknoteByMachine = async (
  machineId: number
): Promise<MachineCoinAndBanknote[]> => {
  const response = await fetch(
    `${API_URL}/machine/${machineId}/coins-and-banknotes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};
