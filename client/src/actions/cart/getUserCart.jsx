import { useQuery } from "@tanstack/react-query"
import axios from "axios"


async function getUserCart() {
    const {data} = await axios.get("/api/v1/user/cart")
    return data
}

const getCartQuery = () => {
    return useQuery({
        queryKey: ["userCart"],
        queryFn: getUserCart
    })
}

export default getCartQuery