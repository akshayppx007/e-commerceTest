import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getAllProducts() {
  const { data } = await axios.get("/api/v1/products");

  return data;
}

const getAllProductQuery = () => {
  return useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
    refetchOnWindowFocus: true,
  });
};

export default getAllProductQuery;
