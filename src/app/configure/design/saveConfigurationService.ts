import { toast } from "@/app/_hooks/use-toast";
import { ClientUploadedFileData } from "uploadthing/types";
import { base64ToBlob } from "./base64ToBlobService";
import { SaveConfiguratorFnProps } from "./useSaveConfig";

export async function saveConfiguration(
  {
    phoneCaseRef,
    containerRef,
    renderedPosition,
    renderedDimensions,
    imageUrl,
    configId,
  }: SaveConfiguratorFnProps,
  startUpload: (
    files: File[],
    options: { configId: string }
  ) => Promise<ClientUploadedFileData<{ configId: string }>[] | undefined>
): Promise<void> {
  try {
    if (!phoneCaseRef.current || !containerRef.current) {
      throw new Error("References are not available.");
    }

    const {
      left: caseLeft,
      top: caseTop,
      width,
      height,
    } = phoneCaseRef.current.getBoundingClientRect();
    const { left: containerLeft, top: containerTop } =
      containerRef.current.getBoundingClientRect();

    const leftOffset = caseLeft - containerLeft;
    const topOffset = caseTop - containerTop;

    const actualX = renderedPosition.x - leftOffset;
    const actualY = renderedPosition.y - topOffset;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const userImage = new Image();
    userImage.crossOrigin = "anonymous";
    userImage.src = imageUrl;
    await new Promise((resolve) => (userImage.onload = resolve));

    ctx?.drawImage(
      userImage,
      actualX,
      actualY,
      renderedDimensions.width,
      renderedDimensions.height
    );

    const base64 = canvas.toDataURL();
    const base64Data = base64.split(",")[1];

    const blob = base64ToBlob(base64Data, "image/png");
    const file = new File([blob], "filename.png", { type: "image/png" });

    await startUpload([file], { configId }).catch((uploadError) => {
      console.error("Upload failed:", uploadError);
    });
  } catch (err) {
    console.error("Error in saveConfiguration:", err);

    toast({
      title: "Something went wrong",
      description: "There was a problem saving your config, please try again.",
      variant: "destructive",
    });
  }
}
