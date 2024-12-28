import { getCoinAndBanknoteByMachine } from "./../service/machine-coin-and-banknote";
import { useQuery } from "@tanstack/react-query";

export const useMachineCoinAndBanknote = (machineId: number) => {
  return useQuery({
    queryKey: ["machine", machineId],
    queryFn: async () => {
      const getCoinAndBanknoteByMachineResponse =
        await getCoinAndBanknoteByMachine(machineId);

      getCoinAndBanknoteByMachineResponse.map((coinAndBanknote) => ({
        ...coinAndBanknote,
      }));

      const mapCoinAndQuantity = getCoinAndBanknoteByMachineResponse.reduce(
        (acc, curr) => ({
          ...acc,
          [`${Number(curr.coinAndBanknote.denomination)}`]: curr.quantity,
        }),
        {} as { [key: string]: number }
      );
      return {
        mapCoinAndQuantity,
        data: getCoinAndBanknoteByMachineResponse,
      };
    },
  });
};
