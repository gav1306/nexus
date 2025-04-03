"use client";

import { useWebSocket } from "@/hooks";
import { cryptoListColumns, CryptoListDataTable } from "../components";
import {
  useGetFavoriteCryptoList,
  useSuspenseGetCryptoList,
} from "../services";
import { useRef } from "react";
import { formatCurrency } from "../utils";
import { useFavoriteCryptoStore } from "../store";

export const FavoriteCryptoList = () => {
  const { favorites } = useFavoriteCryptoStore();
  let binanceWebSocketURL = "wss://stream.binance.com:9443/ws";
  favorites.forEach((symbol) => {
    binanceWebSocketURL = `${binanceWebSocketURL}/${symbol.toLowerCase()}@kline_1h`;
  });
  // useWebSocket(binanceWebSocketURL, (data) => {
  //   const {
  //     s: symbol,
  //     k: { c: currentPrice },
  //   } = data;

  //   symbolRefs.current.forEach((symbolEl) => {
  //     if (symbolEl.symbol === symbol) {
  //       const priceEl = symbolEl.element.querySelector("span");
  //       const prevPrice = +priceEl.dataset.price || 0;
  //       if (prevPrice > currentPrice) {
  //         priceEl.classList.add("text-red-500");
  //         priceEl.classList.remove("text-green-500");
  //       } else if (prevPrice < currentPrice) {
  //         priceEl.classList.add("text-green-500");
  //         priceEl.classList.remove("text-red-500");
  //       }
  //       priceEl.dataset.price = currentPrice;
  //       priceEl.innerText = formatCurrency(currentPrice);
  //     }
  //   });
  // });
  const symbolRefs = useRef([]);
  const { data, isPending, isError, fetchStatus } =
    useGetFavoriteCryptoList(favorites);

  return (
    <CryptoListDataTable
      columns={cryptoListColumns}
      data={data || []}
      ref={symbolRefs}
      isLoading={fetchStatus === "idle" ? false : isPending}
      isError={isError}
      emptyMessage="No favorite crypto found"
    />
  );
};
