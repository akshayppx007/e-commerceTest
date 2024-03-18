import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import getCartQuery from "../actions/cart/getUserCart";
import deleteCartItemMutation from "../actions/cart/deleteCartItem";
import toast from "react-hot-toast";

const Cart = ({ userData, handleGuestCartDelete }) => {
  const { data: cartData } = getCartQuery();
  const [cartItems, setCartItems] = useState([]);
  const { mutate: deleteCartItem } = deleteCartItemMutation();
  
  useEffect(() => {
    if (!userData) {
      setCartItems(JSON.parse(localStorage.getItem("guestCart")));
    }
  }, []);

  useEffect(() => {
    if (userData && cartData) {
      setCartItems(cartData?.cart[0]?.products);
      
    }
  }, [cartData]);


  const calculateTotalPrice = () => {
    return cartItems?.reduce(
      (total, item) => total + (item.productId.price || item.price) * item.quantity,
      0
    );
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (itemId) => {
    if (userData) {
      console.log(itemId)
      deleteCartItem(itemId)
    } else {
      const index = cartItems.findIndex((item) => item.productId === itemId);
      cartItems.splice(index, 1);
      localStorage.setItem("guestCart", JSON.stringify(cartItems));
      setCartItems(JSON.parse(localStorage.getItem("guestCart")));
      toast.success("Item removed from cart successfully!");
      handleGuestCartDelete(itemId);
    }
  }

  const totalPrice = calculateTotalPrice();

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h4" className="mb-8">
        Shopping Cart
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {!cartItems ? (
            <Typography variant="h6" color="gray">
              Your cart is empty.
            </Typography>
          ) : (
            <div>
              {cartItems?.map((item) => (
                <Card key={item._id} className="mb-4">
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="relative"
                  >
                    <Avatar
                      src={item.productId.image || item.image}
                      alt={item.productId.name || item.name}
                      size="lg"
                      variant="circular"
                    />
                    <div className="ml-4">
                      <Typography variant="h6">{item.productId.name || item.name}</Typography>
                      <Typography color="gray" className="font-normal">
                        Price: ${(item.productId.price * item.quantity).toFixed(2)}
                      </Typography>
                      <div className="flex items-center">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => decreaseQuantity(item._id)}
                        >
                          <MinusIcon className="h-5 w-5" strokeWidth={2} />
                        </IconButton>
                        <Typography color="gray" className="font-normal mx-2">
                          {item.quantity}
                        </Typography>
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => increaseQuantity(item._id)}
                        >
                          <PlusIcon className="h-5 w-5" strokeWidth={2} />
                        </IconButton>
                      </div>
                    </div>
                    <IconButton
                      variant="text"
                      color="red"
                      className="!absolute right-4 top-4"
                      onClick={() => handleDelete(item.productId._id || item.productId)}
                    >
                      <TrashIcon className="h-5 w-5" strokeWidth={2} />
                    </IconButton>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader
              variant="gradient"
              color="blue-gray"
              className="mb-4 p-4 rounded-none relative"
            >
              <Typography variant="h6" color="white">
                Order Summary
              </Typography>
            </CardHeader>
            <CardBody>
              <Typography variant="h6" className="mb-2">
                Total Price: ${totalPrice?.toFixed(2)}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth>
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
