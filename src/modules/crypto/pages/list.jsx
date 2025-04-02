"use client";

import { useSuspenseGetCryptoList } from "../services";

export const List = () => {
  const { isPending, data, isError } = useSuspenseGetCryptoList();
  console.log({ isPending, data, isError });

  return <div>list</div>;
};
