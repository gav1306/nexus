export const formatToPercentage = (
  num,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
) => {
  const percentageFormatter = new Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits,
    maximumFractionDigits,
  });
  return percentageFormatter.format(num / 100);
};
