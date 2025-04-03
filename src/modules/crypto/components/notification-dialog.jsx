"use client";

import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CryptoNotificationInput } from "./notification-input";
import { useState } from "react";

export function CryptoNotificationDialog() {
  const [open, setOpen] = useState(false);

  const closeHandler = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
          <DialogDescription>
            Get notified when the price crosses your set threshold.
          </DialogDescription>
        </DialogHeader>
        <CryptoNotificationInput onClose={closeHandler} />
      </DialogContent>
    </Dialog>
  );
}
