import { Transaction, TransactionBody } from "@/types/transaction";

const API_URL = process.env.API_URL;

export const createTransaction = async (
  transaction: TransactionBody
): Promise<Transaction> => {
  return await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  }).then((res) => res.json());
};

export const getTransactionsByCustomerId = async (
  customerId: number
): Promise<Transaction[]> => {
  return await fetch(`${API_URL}/transactions?customerId=${customerId}`).then(
    (res) => res.json()
  );
};
