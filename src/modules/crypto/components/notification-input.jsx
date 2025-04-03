"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cryptoNotificationSchema } from "../utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCryptoNotificationStore } from "../store";

export function CryptoNotificationInput({ onClose }) {
  const { threshold, updateThreshold } = useCryptoNotificationStore();
  const form = useForm({
    resolver: zodResolver(cryptoNotificationSchema),
    defaultValues: {
      threshold,
    },
  });

  function onSubmit(values) {
    updateThreshold(values.threshold);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="threshold"
          render={({ field }) => {
            const thresholdHandler = (e) => {
              const { value } = e.target;
              const parseValue = +value;
              if (isNaN(parseValue)) {
                field.onChange(0);
              } else {
                field.onChange(parseValue);
              }
            };
            return (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="threshold"
                    {...field}
                    onChange={thresholdHandler}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" variant="secondary" className="justify-self-end">
          Save
        </Button>
      </form>
    </Form>
  );
}
