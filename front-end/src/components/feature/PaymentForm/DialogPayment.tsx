"use client";

import { useContext } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { ModalContext } from "@/contexts/ModalContext";
import { ActionButtons } from "./ActionButtons";
import { PaymentForm } from ".";

export const DialogPayment = () => {
  const { isOpen, closeModal } = useContext(ModalContext);

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeModal()}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-1 border bg-white rounded-lg p-2">
          <PaymentForm />
          <ActionButtons />
        </DialogPanel>
      </div>
    </Dialog>
  );
};
