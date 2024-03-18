import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

async function logout() {
  await axios.get("/api/v1/logout");
}

const logoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["loginUser"] });
      queryClient.resetQueries({ queryKey: ["userCart"], exact: true });
      navigate("/");
      toast.success("Logged out successfully");
    },
  });
};

export default logoutMutation;
