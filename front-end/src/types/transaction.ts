export interface TransactionBody {
  customerId: number;
  changeAmount: number;
  paidAmount: number;
  productId: number;
  changeCoin: { [key: number]: number } | null;
}

export interface Transaction {
  id: number;
  customerId: number;
  productMachineId: number;
  stockQuantity: number;
  changeAmount: number;
  paidAmount: number;
  status: string;
  salesQuantity: number;
  updatedAt: Date;
}
