"use client";

import { useWebSocket } from "@/hooks";
import { cryptoListColumns, CryptoListDataTable } from "../components";
import { useSuspenseGetCryptoList } from "../services";
import { useEffect, useRef } from "react";
import { formatCurrency } from "../utils";

export const List = () => {
  useWebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@kline_1h/ethusdt@kline_1h/bnbusdt@kline_1h/dogeusdt@kline_1h/paxgusdt@kline_1h",
    (data) => {
      const {
        s: symbol,
        k: { c: currentPrice },
      } = data;
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
  const { data } = useSuspenseGetCryptoList();

  return (
    <CryptoListDataTable
      columns={cryptoListColumns}
      data={data}
      ref={symbolRefs}
    />
  );
};
