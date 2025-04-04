import { useQuery } from "@tanstack/react-query";
import { coingeckoApi } from "@/services";
import { cryptoQueryKeys } from "./query-keys";
import { COIN_GECKO_NAMES } from "../utils";

export const getCryptoMetaDetails = async (symbol) => {
  const response = await coingeckoApi.get(
    `/coins/${COIN_GECKO_NAMES[symbol]}`,
    {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
      },
    }
  );

  return response.data;
};

export const useGetCryptoMetaDetails = (symbol) => {
  return useQuery({
    queryKey: cryptoQueryKeys.metaDetails(symbol),
    queryFn: () => getCryptoMetaDetails(symbol),
  });
};
