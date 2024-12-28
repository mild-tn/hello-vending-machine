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
  mapCoinChange: {
    success: boolean;
    changeUsed: { [key: number]: number };
    message?: string;
  };
  setMapCoinChange: (change: {
    success: boolean;
    changeUsed: { [key: number]: number };
    message?: string;
  }) => void;
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
  mapCoinChange: {
    success: false,
    changeUsed: {},
  },
  setCoins: () => {},
  setBanknotes: () => {},
  setAmount: () => {},
  setAmountDue: () => {},
  setTotalReturn: () => {},
  resetMoney: () => {},
  setMapCoinChange: () => {},
});

export const MoneySectionContextProvider = ({
  children,
}: MoneySectionContextProviderProps) => {
  const [coins, setCoins] = useState<number[]>([]);
  const [banknotes, setBanknotes] = useState<number[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [amountDue, setAmountDue] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  const [mapCoinChange, setMapCoinChange] = useState<{
    success: boolean;
    changeUsed: { [key: number]: number };
    message?: string;
  }>({
    success: false,
    changeUsed: {},
  });

  const resetMoney = () => {
    setCoins([]);
    setBanknotes([]);
    setTotalReturn(0);
    setMapCoinChange({
      success: false,
      changeUsed: {},
    });
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
      resetMoney,
      mapCoinChange,
      setMapCoinChange,
    }),
    [
      coins,
      banknotes,
      amount,
      amountDue,
      totalReturn,
      mapCoinChange,
      setCoins,
      setBanknotes,
      setAmount,
      setAmountDue,
      setTotalReturn,
      setMapCoinChange,
    ]
  );

  return (
    <MoneySectionContext.Provider value={value}>
      {children}
    </MoneySectionContext.Provider>
  );
};
