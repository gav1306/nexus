import { z } from "zod";

export const cryptoNotificationSchema = z.object({
  threshold: z
    .number()
    .min(0.5, {
      message: "Threshold must be at least 0.5",
    })
    .max(500, {
      message: "Threshold must be at most 500",
    }),
});
