import { ReactNode } from "react";

import MaxWidthWrapper from "@/app/_components/MaxWidthWrapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="flex flex-1 flex-col">
      {children}
    </MaxWidthWrapper>
  );
}
