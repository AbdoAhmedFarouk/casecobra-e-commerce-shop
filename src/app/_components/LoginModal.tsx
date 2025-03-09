import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { buttonVariants } from "./ui/button";

export default function LoginModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="absolute z-[99999999]">
        <DialogHeader>
          <div className="relative mx-auto size-24 mb-2">
            <Image
              src="/snake-1.png"
              alt="snake image"
              fill
              className="object-contain"
            />
          </div>

          <DialogTitle
            className="text-3xl text-center font-bold
            tracking-tight text-gray-900"
          >
            Log in to continue
          </DialogTitle>

          <DialogDescription className="text-base text-center py-2">
            <span className="font-medium text-zinc-900">
              Your configuration was saved!
            </span>{" "}
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
          <LoginLink className={buttonVariants({ variant: "outline" })}>
            Login
          </LoginLink>
          <RegisterLink className={buttonVariants({ variant: "default" })}>
            Sign up
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}
