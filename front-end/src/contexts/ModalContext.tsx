"use client";
import { createContext, useState, useMemo, ReactNode } from "react";

export const ModalContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const value = useMemo(() => ({ isOpen, openModal, closeModal }), [isOpen]);

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
