import { HydratedCryptoDetails } from "../hydrate";

export const CryptoDetails = ({ symbol }) => {
  return <HydratedCryptoDetails symbol={symbol} />;
};
