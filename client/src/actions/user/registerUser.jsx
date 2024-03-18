import { useMutation } from "@tanstack/react-query"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


async function register(input) {
   await axios.post("/api/v1/register", input) 
}

const registerUserMutation = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ["register"],
        mutationFn: (input) => register(input),
        onSuccess: (_data) => {
            toast.success("registration Successful");
            navigate("/");
          },
          onError: (error) => {
            const message = error.response.data.message;
            toast.error(message);
          },
    })
}

export default registerUserMutation;