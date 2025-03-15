import { useMutation } from "@tanstack/react-query";
import { changeOrderStatus } from "./actions";
import { useRouter } from "next/navigation";

export function useChangeOrderStatus() {
  const router = useRouter();

  const { mutate: mutateOrderStatus } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onSuccess: () => router.refresh(),
  });

  return { mutateOrderStatus };
}
