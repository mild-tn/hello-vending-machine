"use client";

import { Product } from "@/types/product";
import { ReactNode, useState, createContext, useMemo } from "react";

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  product: Product | null;
  setProduct: (product: Product | null) => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
  product: null,
  setProduct: () => {},
});

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);

  const value = useMemo(
    () => ({
      products,
      setProducts,
      product,
      setProduct,
    }),
    [products, product]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
