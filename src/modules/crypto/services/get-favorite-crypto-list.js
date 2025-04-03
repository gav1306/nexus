import { binanceApi } from "@/services";
import { cryptoQueryKeys } from "./query-keys";
import { useQuery } from "@tanstack/react-query";

export const getFavoriteCryptoList = async (symbols) => {
  const response = await binanceApi.get("/ticker/24hr", {
    params: {
      symbols: JSON.stringify(symbols),
    },
  });

  return response.data;
};

export const useGetFavoriteCryptoList = (symbols) => {
  return useQuery({
    queryKey: cryptoQueryKeys.favoriteList(symbols),
    queryFn: () => getFavoriteCryptoList(symbols),
    enabled: !!symbols.length,
  });
};
