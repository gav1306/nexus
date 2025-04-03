export const cryptoQueryKeys = {
  all: ["crypto"],
  list: () => [...cryptoQueryKeys.all, "list"],
  favoriteList: (symbols) => [...cryptoQueryKeys.all, symbols, "favoriteList"],
};
