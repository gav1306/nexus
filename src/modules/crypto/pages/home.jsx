import { CryptoListTabs } from "../components";

export const CryptoHome = () => {
  return (
    <section className="grid gap-4">
      <h1 className="text-4xl font-bold">Market Overview</h1>
      <CryptoListTabs />
    </section>
  );
};
