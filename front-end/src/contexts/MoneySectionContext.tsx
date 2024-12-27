"use client";
import { createContext, useState, useMemo, ReactNode } from "react";

interface MoneySectionContextType {
  coins: number[];
  banknotes: number[];
  amount: number;
  amountDue: number;
  totalReturn: number;
  setCoins: (coins: number[]) => void;
  setBanknotes: (banknotes: number[]) => void;
  setAmount: (number: number) => void;
  setAmountDue: (number: number) => void;
  setTotalReturn: (number: number) => void;
  resetMoney: () => void;
}

interface MoneySectionContextProviderProps {
  children: ReactNode;
}
export const MoneySectionContext = createContext<MoneySectionContextType>({
  coins: [],
  banknotes: [],
  amount: 0,
  amountDue: 0,
  totalReturn: 0,
  setCoins: () => {},
  setBanknotes: () => {},
  setAmount: () => {},
  setAmountDue: () => {},
  setTotalReturn: () => {},
  resetMoney: () => {},
});

export const MoneySectionContextProvider = ({
  children,
}: MoneySectionContextProviderProps) => {
  const [coins, setCoins] = useState<number[]>([]);
  const [banknotes, setBanknotes] = useState<number[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [amountDue, setAmountDue] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);

  const reset = () => {
    setCoins([]);
    setBanknotes([]);
    setAmount(0);
    setAmountDue(0);
    setTotalReturn(0);
  };

  const value = useMemo(
    () => ({
      coins,
      banknotes,
      amount,
      amountDue,
      setCoins,
      setBanknotes,
      setAmount,
      setAmountDue,
      totalReturn,
      setTotalReturn,
      resetMoney: reset,
    }),
    [
      coins,
      banknotes,
      amount,
      amountDue,
      totalReturn,
      setCoins,
      setBanknotes,
      setAmount,
      setAmountDue,
      setTotalReturn,
    ]
  );

  return (
    <MoneySectionContext.Provider value={value}>
      {children}
    </MoneySectionContext.Provider>
  );
};
