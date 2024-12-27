import {
  createTransaction,
  getTransactionsByCustomerId,
} from "@/service/transaction";
import { Transaction, TransactionBody } from "@/types/transaction";
import { useMutation, useQuery } from "@tanstack/react-query";
export const useMutationTransaction = ({
  onSuccess,
}: {
  onSuccess: (result: Transaction) => void;
}) => {
  const { mutate } = useMutation({
    mutationFn: async (transaction: TransactionBody) => {
      return await createTransaction(transaction);
    },
    onSuccess,
  });

  return { mutate };
};

export const useTransactionsQuery = ({
  enabled = true,
  customerId,
}: {
  enabled?: boolean;
  customerId: number;
}) => {
  return useQuery<Transaction[]>({
    queryKey: ["transactions", customerId],
    queryFn: async () => {
      return await getTransactionsByCustomerId(customerId);
    },
    enabled,
  });
};
