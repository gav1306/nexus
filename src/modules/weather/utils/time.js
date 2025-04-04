export const formatTime = (input, options = {}) => {
  if (!input) return "N/A";

  let date;

  if (typeof input === "string" || typeof input === "number") {
    date = new Date(input);
  } else if (input instanceof Date) {
    date = input;
  } else {
    return "N/A";
  }

  if (isNaN(date.getTime())) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    ...options,
  }).format(date);
};
