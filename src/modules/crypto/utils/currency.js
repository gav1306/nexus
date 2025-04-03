export const formatCurrency = (value, options = {}) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  });
  return currencyFormatter.format(value);
};
