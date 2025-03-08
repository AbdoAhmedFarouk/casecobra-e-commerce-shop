import { useRouter } from "next/navigation";
import { useToast } from "@/app/_components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { saveConfig as saveConfigAction, SaveConfigArgs } from "./actions";
import { useUploadThing } from "@/app/_lib/uploadthing";
import { saveConfiguration } from "./saveConfigurationService";

export interface SaveConfiguratorFnProps {
  phoneCaseRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  renderedPosition: { x: number; y: number };
  renderedDimensions: { width: number; height: number };
  imageUrl: string;
  configId: string;
}

export function useSaveConfig() {
  const router = useRouter();

  const { toast } = useToast();
  const { startUpload } = useUploadThing("imageUploader");

  const { mutate: saveConfig } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: {
      configProps: SaveConfiguratorFnProps;
      saveArgs: SaveConfigArgs;
    }) => {
      const { configProps, saveArgs } = args;

      const [_, configId] = await Promise.all([
        saveConfiguration(configProps, startUpload),
        saveConfigAction(saveArgs),
      ]);

      return configId;
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. please try again.",
        variant: "destructive",
      });
    },
    onSuccess: (configId) => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  return { saveConfig };
}
