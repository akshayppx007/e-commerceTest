import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


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
        },
        onError: (error) => {
            console.log(error);
        },
    })
}

export default addToCartMutation;