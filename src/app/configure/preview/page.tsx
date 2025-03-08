import { notFound } from "next/navigation";

import { db } from "@/app/_db";
import { PageProps } from "@/app/_validators/searchParams-validator";
import DesignPreview from "./DesignPreview";

export default async function Page({ searchParams }: PageProps) {
  const { id } = searchParams;

  if (!id || typeof id !== "string") notFound();

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) notFound();

  return <DesignPreview configuration={configuration} />;
}
