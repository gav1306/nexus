export const weatherQueryKeys = {
  all: ["weather"],
  details: (params) => [...weatherQueryKeys.all, params, "details"],
};
