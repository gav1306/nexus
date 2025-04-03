"use client";

import { useWebSocket } from "@/hooks";
import { cryptoListColumns, CryptoListDataTable } from "../components";
import { useSuspenseGetCryptoList } from "../services";
import { useRef } from "react";
import { formatCurrency, SYMBOL_DETAILS } from "../utils";
import { useCryptoNotificationStore } from "../store";
import { toast } from "sonner";

export const AllCryptoList = () => {
  const { threshold } = useCryptoNotificationStore();
  useWebSocket(
    `${process.env.NEXT_PUBLIC_BINANCE_WEBSOCKET}?streams=btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/paxgusdt@ticker/dogeusdt@ticker`,
    ({ data }) => {
      const { s: symbol, c: currentPrice } = data;
      const symbolEl = symbolRefs.current[symbol];

      if (symbolEl) {
        const priceEl = symbolEl.querySelector("span");
        if (priceEl) {
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
          const priceDifference = Math.abs(currentPrice - prevPrice);
          if (priceDifference >= threshold) {
            const { name } = SYMBOL_DETAILS[symbol];
            toast.info(
              `Price of ${name} changed from ${formatCurrency(
                prevPrice
              )} to ${formatCurrency(currentPrice)}`
            );
          }
        }
      }
    }
  );
  const symbolRefs = useRef({});
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
