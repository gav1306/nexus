export const weatherQueryKeys = {
  all: ["weather"],
  details: (params) => [...weatherQueryKeys.all, params, "details"],
  chart: (params) => [...weatherQueryKeys.all, params, "chart"],
};
