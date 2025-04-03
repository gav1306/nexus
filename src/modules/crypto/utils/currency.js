export const formatCurrency = (value, currency = "USD") => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return currencyFormatter.format(value);
};
