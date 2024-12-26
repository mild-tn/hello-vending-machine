import { Transaction, TransactionBody } from "@/types/transaction";

const API_URL = process.env.API_URL;

export const createTransaction = (
  transaction: TransactionBody
): Promise<Transaction> => {
  return fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  }).then((res) => res.json());
};
