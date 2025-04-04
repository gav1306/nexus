import { useSuspenseQuery } from "@tanstack/react-query";
import { binanceApi } from "@/services";
import { cryptoQueryKeys } from "./query-keys";

export const getCrypto = async (symbol) => {
  const response = await binanceApi.get("/ticker", {
    params: {
      symbol,
    },
  });

  return response.data;
};

export const useSuspenseGetCrypto = (symbol) => {
  return useSuspenseQuery({
    queryKey: cryptoQueryKeys.details(symbol),
    queryFn: () => getCrypto(symbol),
  });
};
