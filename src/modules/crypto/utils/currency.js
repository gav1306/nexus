export const formatCurrency = (value, options = {}) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    compactDisplay: "short",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });
  return currencyFormatter.format(value);
};
