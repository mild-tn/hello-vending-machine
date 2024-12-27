"use client";
import { useTransactionsQuery } from "@/hooks/useTransactions";
import {
  banknoteList,
  calculateCoinChange,
  coinList,
} from "../../../usecase/calculate-coin-change";

export const TransactionList = () => {
  const { data, isLoading } = useTransactionsQuery({
    customerId: 1,
  });

  if (!data) {
    return (
      <div className="text-center text-gray-500">No transactions found.</div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 shadow-md rounded-md">
      {isLoading && <div>Loading...</div>}
      {data?.map((transaction) => {
        return (
          <div
            className="grid grid-cols-2 gap-3 p-2 border rounded-md bg-gray-50"
            key={`${transaction.id}_transaction`}
          >
            <div className="col-span-2 text-sm text-gray-500">
              {new Date(transaction.updatedAt).toLocaleString()}
            </div>
            <div className="text-sm text-gray-700">
              Stock Quantity: {transaction.stockQuantity}
            </div>
            <div className="text-sm text-gray-700">
              Paid Amount: {transaction.paidAmount}
            </div>
            <div className="text-sm text-gray-700">
              Status: {transaction.status}
            </div>
            <div className="text-sm text-gray-700">
              Sales Quantity: {transaction.salesQuantity}
            </div>
            <div className="col-span-2 flex flex-col space-y-1">
              <div className="text-sm font-medium text-gray-700">
                Change Breakdown: {transaction.changeAmount}฿
              </div>
              {Object.entries(
                calculateCoinChange(Number(transaction.changeAmount), [
                  ...banknoteList,
                  ...coinList,
                ])
              ).map(([denomination, count]) => (
                <div key={denomination} className="text-sm text-gray-600">
                  {denomination}฿ X {count}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
