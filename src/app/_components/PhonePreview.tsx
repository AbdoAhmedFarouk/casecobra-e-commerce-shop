"use client";

import { useEffect, useRef, useState } from "react";
import { CaseColor } from "@prisma/client";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "../_lib/utils";
import Image from "next/image";

export default function PhonePreview({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: CaseColor;
}) {
  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (!ref.current) return;

    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimensions({ width, height });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let caseBackgroundColor = "bg-zinc-950";
  if (color === "blue") caseBackgroundColor = "bg-blue-950";
  if (color === "rose") caseBackgroundColor = "bg-rose-950";

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
      >
        <Image
          width={renderedDimensions.width / (3000 / 637)}
          height="100"
          className={cn(
            "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
            caseBackgroundColor
          )}
          src={croppedImageUrl}
          alt="user-case-image"
        />
      </div>

      <div className="relative size-full z-40">
        <Image
          fill
          src="/clearphone.png"
          alt="phone"
          className="pointer-events-none size-full antialiased rounded-md"
        />
      </div>
    </AspectRatio>
  );
}
