import { CryptoDetails } from "@/modules/crypto/pages";

export default async function Details({ params }) {
  const { id } = await params;

  return <CryptoDetails symbol={id} />;
}
