"use client";

import { useState } from "react";

import Dropzone, { FileRejection } from "react-dropzone";

import { cn } from "@/lib/utils";

export default function Page() {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const onDropRejected = () => {};
  const onDropAccepted = () => {};
  return (
    <div
      className={cn(
        "relative flex-1 my-16 size-full rounded-xl ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center p-2 bg-gray-900/5",
        { "ring-blue-900/25 bg-blue-900/10": isDragOver }
      )}
    >
      <div
        className="relative flex flex-1 flex-col items-center
        justify-center w-full"
      >
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="size-full flex-1 flex flex-col items-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}
