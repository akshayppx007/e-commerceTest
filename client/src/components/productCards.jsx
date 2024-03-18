import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import addToCartMutation from "../actions/cart/addToCart";
import toast from "react-hot-toast";

export function ProductCard({productData, userData, guestCartChange}) {
  // const [cartItems, setCartItems] = useState([]);
  const { mutate: addToCart } = addToCartMutation();

  const [productQuantities, setProductQuantities] = useState({});

  const incrementQuantity = (productId) => {
    const product = productData.find((prod) => prod._id === productId);

    const currentQuantity = productQuantities[productId] || 1;

    if (currentQuantity < product.stock) {
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: currentQuantity + 1,
      }));
    }
  };

  const decrementQuantity = (productId) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 1) - 1, 0),
    }));
  };

  // set cart

  const addCart = async (productId) => {
    const product = productData.find((prod) => prod._id === productId);
    const quantity = productQuantities[productId] || 1;
    guestCartChange(productId);
  
    if (userData) {
      try {
        addToCart({
          userId: userData.user._id,
          productId,
          quantity,
          guestCart: JSON.parse(localStorage.getItem('guestCart')) || []
        });
        localStorage.removeItem('guestCart');
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
      const existingCartItem = guestCart.find((item) => item.productId === productId);
  
      if (existingCartItem) {
        if (existingCartItem.quantity + quantity <= product.stock) {
          existingCartItem.quantity += quantity;
        }
      } else {
        guestCart.push({ _id: guestCart.length + 1, productId, image: product.image, name: product.name, stock: product.stock, price: product.price, quantity });
      }
  
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
      toast.success("item added to cart");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto mt-5">
        {productData?.map((product) => (
          <div key={product._id} className="flex justify-center">
            <Card className="w-96 mt-8">
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src={product.image}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography color="blue-gray" className="font-medium">
                    {product.name}
                  </Typography>

                  <Typography color="blue-gray" className="font-medium">
                    $
                    {(
                      product.price * (productQuantities[product._id] || 1)
                    ).toFixed(2)}
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75"
                >
                  {product.description &&
                    product.description.substring(0, 90) + "..."}
                </Typography>
                <div className="flex items-center mt-2">
                  <Button
                    onClick={() => decrementQuantity(product._id)}
                    className="mr-2"
                    size="sm"
                    color="gray"
                  >
                    -
                  </Button>
                  <Typography color="blue-gray" className="font-medium">
                    {productQuantities[product._id] || 1}
                  </Typography>
                  <Button
                    onClick={() => incrementQuantity(product._id)}
                    className="ml-2"
                    size="sm"
                    color="gray"
                  >
                    +
                  </Button>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  onClick={() => addCart(product._id)}
                  ripple={false}
                  fullWidth={true}
                  className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductCard;
