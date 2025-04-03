import { useSuspenseQuery } from "@tanstack/react-query";
import { binanceApi } from "@/services";
import { cryptoQueryKeys } from "./query-keys";
import { SYMBOL_LIST_PARAMS } from "../utils";

export const getCryptoList = async () => {
  const response = await binanceApi.get("/ticker/24hr", {
    params: {
      symbols: SYMBOL_LIST_PARAMS,
    },
  });

  return response.data;
};

export const useSuspenseGetCryptoList = () => {
  return useSuspenseQuery({
    queryKey: cryptoQueryKeys.list(),
    queryFn: getCryptoList,
  });
};
