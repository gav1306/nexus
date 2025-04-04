import { useSuspenseQuery } from "@tanstack/react-query";
import { binanceApi } from "@/services";
import { cryptoQueryKeys } from "./query-keys";

export const getCryptoDetails = async (params) => {
  const response = await binanceApi.get("/klines", {
    params,
  });

  return (
    response.data?.map((item) => ({
      date: new Date(item[0]).getTime(),
      value: parseFloat(item[4]),
      open: parseFloat(item[1]),
      low: parseFloat(item[3]),
      high: parseFloat(item[2]),
    })) || []
  );
};

export const useSuspenseGetCryptoDetails = (params) => {
  return useSuspenseQuery({
    queryKey: cryptoQueryKeys.chartDetails(params),
    queryFn: () => getCryptoDetails(params),
  });
};
