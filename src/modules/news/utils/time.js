export const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "long",
  timeStyle: "short",
});

export const formatSecondsToDate = (time) => {
  const date = new Date(time * 1000);
  return dateFormatter.format(date);
};
