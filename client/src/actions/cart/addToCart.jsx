import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


async function addToCart(input) {
  await axios.post("/api/v1/cart/add", input);
}

const addToCartMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["addToCart"],
        mutationFn: (input) => addToCart(input),
        onSuccess: () => {
           queryClient.invalidateQueries({ queryKey: ["userCart"], exact: true });
           toast.success("item added to cart");
        },
        onError: (error) => {
            console.log(error);
        },
    })
}

export default addToCartMutation;