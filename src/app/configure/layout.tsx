import { ReactNode } from "react";

import MaxWidthWrapper from "@/app/_components/MaxWidthWrapper";
import Steps from "../_components/Steps";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="flex flex-1 flex-col">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
}
