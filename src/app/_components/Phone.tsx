import Image from "next/image";
import { HTMLAttributes } from "react";
import { cn } from "@/app/_lib/utils";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

export default function Phone({
  imgSrc,
  className,
  dark = false,
  ...props
}: PhoneProps) {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        className="pointer-events-none z-50 select-none"
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        alt="phone-frame"
      />

      <div className="absolute -z-10 inset-0">
        <Image
          width="100"
          height="100"
          className="object-cover min-w-full min-h-full"
          src={imgSrc}
          alt="overlaying phone image"
          unoptimized
        />
      </div>
    </div>
  );
}
