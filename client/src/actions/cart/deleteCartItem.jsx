import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

async function deleteCartItem(productId) {
  await axios.put(`/api/v1/cart/delete`, productId);
}

const deleteCartItemMutation = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteCartItem"],
    mutationFn: (productId) => deleteCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userCart"], exact: true });
      toast.success("Cart item deleted successfully");
    },
    onError: (error) => {
      console.log("Error deleting cart item", error);
    },
  });
};

export default deleteCartItemMutation;
