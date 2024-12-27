import { createTransaction } from "@/service/transaction";
import { Transaction, TransactionBody } from "@/types/transaction";
import { useMutation } from "@tanstack/react-query";
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
