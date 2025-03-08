import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { createCheckoutSession } from "./actions";

import { useToast } from "@/app/_components/ui/use-toast";

export default function useCreatePaymentSession() {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) {
        router.push(url);
      } else {
        throw new Error("Unable to retrieve payment URL.");
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end, Please try again.",
        variant: "destructive",
      });
    },
  });

  return { createPaymentSession };
}
