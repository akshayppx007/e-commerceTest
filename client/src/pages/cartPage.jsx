import { useState } from "react";
import getLoginUserQuery from "../actions/user/getLoginUser";
import Cart from "../components/cart"
import Footer from "../components/layouts/footer"
import Header from "../components/layouts/header"

const CartPage = () => {
    const { data: userData } = getLoginUserQuery();
    const [guestCartDelete, setGuestCartDelete] = useState("")

    const handleGuestCartDelete = (data) => {
        setGuestCartDelete(data)
    }

    return (
        <>
        <div class="min-h-screen flex flex-col justify-between">
            <Header userData={userData} guestCartDelete={guestCartDelete} />
            <Cart className="flex-grow" userData={userData} handleGuestCartDelete={handleGuestCartDelete} />
            <Footer />
            </div>
        </>
    )
}

export default CartPage;