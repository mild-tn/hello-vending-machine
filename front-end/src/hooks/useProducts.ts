import { getProducts } from "@/service/product";
import { Product } from "@/types/product";
import {
  DefaultError,
  QueryKey,
  UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";

export const useProductsQuery = (
  options: Omit<
    UndefinedInitialDataOptions<Product[], DefaultError, Product[], QueryKey>,
    "queryKey"
  > = {}
) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      (await getProducts()).map((product) => ({
        ...product,
        images: JSON.parse((product?.images as string) ?? "[]"),
      })) as Product[],
    ...options,
  });
};
