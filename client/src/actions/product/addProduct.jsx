import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


async function addProduct(input) {
   await axios.post("/api/v1/product/create", input)
}

const addProductMutation = () => {
    return useMutation({
        mutationKey: ["addProduct"],
        mutationFn: (input) => addProduct(input),
        onSuccess: () => {
            toast.success("product added successfully")
        },
        onError: (error) => {
            const message = error.response.data.message;
            toast.error(message);
          },
    })
}

export default addProductMutation;