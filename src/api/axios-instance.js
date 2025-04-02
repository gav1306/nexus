import { ERROR_MESSAGES } from "@/utils";
import axios from "axios";
import { toast } from "sonner";
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
        toast.error(errorMessage);
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
      toast.error(errorMessage);
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

export const binanceApi = createInstance(import.meta.env.VITE_BINANCE_BASE_URL);
export const coingeckoApi = createInstance(
  import.meta.env.VITE_COINGECKO_BASE_URL
);
