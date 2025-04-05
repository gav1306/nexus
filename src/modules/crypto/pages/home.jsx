import { Title } from "@/components/ui/title";
import { CryptoListTabs } from "../components";

export const CryptoHome = () => {
  return (
    <section className="grid gap-4">
      <Title>Market Overview</Title>
      <CryptoListTabs />
    </section>
  );
};
