"use client";

import { useWebSocket } from "@/hooks";
import { cryptoListColumns, CryptoListDataTable } from "../components";
import { useSuspenseGetCryptoList } from "../services";
import { useRef } from "react";
import { formatCurrency } from "../utils";

export const AllCryptoList = () => {
  wss: useWebSocket(
    "wss://stream.binance.com/stream?streams=btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/paxgusdt@ticker/dogeusdt@ticker",
    ({ data }) => {
      const { s: symbol, c: currentPrice } = data;
      symbolRefs.current.forEach((symbolEl) => {
        if (symbolEl.symbol === symbol) {
          const priceEl = symbolEl.element.querySelector("span");
          const prevPrice = +priceEl.dataset.price || 0;
          if (prevPrice > currentPrice) {
            priceEl.classList.add("text-red-500");
            priceEl.classList.remove("text-green-500");
          } else if (prevPrice < currentPrice) {
            priceEl.classList.add("text-green-500");
            priceEl.classList.remove("text-red-500");
          }
          priceEl.dataset.price = currentPrice;
          priceEl.innerText = formatCurrency(currentPrice);
        }
      });
    }
  );
  const symbolRefs = useRef([]);
  const { data, isPending, isError, fetchStatus } = useSuspenseGetCryptoList();

  return (
    <CryptoListDataTable
      columns={cryptoListColumns}
      data={data || []}
      ref={symbolRefs}
      isLoading={fetchStatus === "idle" ? false : isPending}
      isError={isError}
      emptyMessage="No crypto found"
    />
  );
};
