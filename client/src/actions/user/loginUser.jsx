import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

async function login(input) {
  const { data } = await axios.post("/api/v1/login", input);
  return data;
}

const loginUserMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (input) => login(input),
    onSuccess: (_data) => {
      toast.success("Login Successful");
      navigate("/");
    },
    onError: (error) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default loginUserMutation;
