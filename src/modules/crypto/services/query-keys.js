export const cryptoQueryKeys = {
  all: ["crypto"],
  list: () => [...cryptoQueryKeys.all, "list"],
  favoriteList: (symbols) => [...cryptoQueryKeys.all, symbols, "favoriteList"],
  details: (params) => [...cryptoQueryKeys.all, params, "details"],
  chartDetails: (params) => [...cryptoQueryKeys.all, params, "chartDetails"],
  metaDetails: (params) => [...cryptoQueryKeys.all, params, "metaDetails"],
};
