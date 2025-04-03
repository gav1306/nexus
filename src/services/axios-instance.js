import { ERROR_MESSAGES } from "@/utils";
import axios from "axios";
const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      let errorMessage = ERROR_MESSAGES.SERVER_ERROR;
      if (!error.response) {
        if (error.code === "ECONNABORTED") {
          errorMessage = ERROR_MESSAGES.TIMEOUT;
        } else {
          errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
        }
        return Promise.reject({ message: errorMessage, originalError: error });
      }
      const { status, data } = error.response;
      switch (status) {
        case 400: {
          errorMessage = ERROR_MESSAGES.BAD_REQUEST;
          break;
        }
        case 401:
        case 403: {
          errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
          break;
        }
        case 404: {
          errorMessage = ERROR_MESSAGES.NOT_FOUND;
          break;
        }
        case 429: {
          errorMessage = ERROR_MESSAGES.RATE_LIMIT;
          break;
        }
        default: {
          errorMessage = ERROR_MESSAGES.SERVER_ERROR;
          break;
        }
      }
      return Promise.reject({
        message: errorMessage,
        originalError: error,
        status,
        data,
      });
    }
  );

  return instance;
};

export const binanceApi = createInstance(
  process.env.NEXT_PUBLIC_BINANCE_BASE_URL
);

export const coingeckoApi = createInstance(
  process.env.NEXT_PUBLIC_COINGECKO_BASE_URL
);
