import { notFound } from "next/navigation";

import DesignConfigurator from "./DesignConfigurator";
import { db } from "@/app/_db";
import { PageProps } from "@/app/_validators/searchParams-validator";

export default async function Page({ searchParams }: PageProps) {
  const { id } = searchParams;

  if (!id || typeof id !== "string") notFound();

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) notFound();

  const { imageUrl, width, height } = configuration;

  return (
    <DesignConfigurator
      configId={configuration.id}
      imageDimensions={{ width, height }}
      imageUrl={imageUrl}
    />
  );
}
