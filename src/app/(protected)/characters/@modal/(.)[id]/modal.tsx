"use client";

import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";

// todo: use the /ui dialog instead; apply generic changes to it (e.g. close button)
export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <DialogRoot
      open
      size="xl"
      placement="center"
      motionPreset="slide-in-bottom"
      onOpenChange={(open) => {
        if (open) {
          router.back();
        }
      }}
    >
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="bg-slate-950 text-slate-50">
          <DialogHeader className="flex justify-end">
            <DialogCloseTrigger className="flex h-8 w-8 items-center justify-center rounded-full p-2 text-lg font-bold hover:bg-slate-50 hover:text-slate-950">
              ✕
            </DialogCloseTrigger>
          </DialogHeader>
          <DialogBody>{children}</DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
