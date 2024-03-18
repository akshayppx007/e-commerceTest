import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
  Badge,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logoutMutation from "../../actions/user/logoutUser";
import getCartQuery from "../../actions/cart/getUserCart";
import addToCartMutation from "../../actions/cart/addToCart";

const Header = ({ userData, handleSearchTerm, guestCartChange, guestCartDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cart, setCart] = useState([]);

  const { mutate: addToCart } = addToCartMutation();

  const { data: cartData } = getCartQuery();

  const [guestCart, setGuestCart] = useState([]);

  useEffect(() => {
    setGuestCart(JSON.parse(localStorage.getItem("guestCart")));
  }, [guestCartChange, guestCartDelete]);

  useEffect(() => {
    setCart(cartData?.cart[0]?.products);
  }, [cartData, userData]);

  useEffect(() => {
    if (userData && guestCart?.length > 0) {
      addToCart({userId: userData?.user._id, guestCart: guestCart})
      localStorage.removeItem("guestCart")
      setGuestCart([])
    }
  }, [userData, cartData]);

  const { mutate: logout } = logoutMutation();

  const handleLogout = () => {
    logout();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    <div className="sticky top-0 z-50">
      <Navbar className="mx-auto max-w-7xl px-4 py-2 lg:px-8 lg:py-4 bg-white">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Link to={"/"}>
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-medium text-gray-900"
            >
              E-Shop
            </Typography>
          </Link>
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="border-blue-gray-200 pr-10 pl-5 py-2 text-blue-gray-600 transition-all focus:border-x-blue-gray-800 focus:ring focus:ring-blue-gray-800 rounded-md focus:outline-none"
              />
              <Button
                type="submit"
                variant="text"
                color="blue-gray"
                onClick={() => handleSearchTerm(searchTerm)}
                className="!absolute right-1 top-1 rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
              >
                <MagnifyingGlassIcon className="h-4 w-4" strokeWidth={2} />
              </Button>
            </form>
            <IconButton
              variant="text"
              color="blue-gray"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              onClick={toggleMobileMenu}
            >
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            </IconButton>
            <Link to={"/cart"} className="hidden lg:inline-block">
              <Badge content={cart?.length || guestCart?.length || 0}>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="hidden lg:inline-block"
                >
                  <ShoppingBagIcon className="h-6 w-6" strokeWidth={2} />
                </Button>
              </Badge>
            </Link>
            {userData?.user ? (
              <Button
                className="hidden lg:inline-block"
                type="button"
                onClick={handleLogout}
              >
                logout
              </Button>
            ) : (
              <Link to={"/login"}>
                <Button className="hidden lg:inline-block">Sign in</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <Collapse
          open={showMobileMenu}
          onClose={toggleMobileMenu}
          className="lg:hidden"
        >
          <ul>
            <li>
            {userData?.user ? (
              <Button
                variant="text" color="blue-gray"
                type="button"
                onClick={handleLogout}
              >
                logout
              </Button>) : (
              <Link to={"/login"}>
                <Button variant="text" color="blue-gray">
                  Sign in
                </Button>
              </Link>)}
            </li>

            <li>
              <Link to={"/cart"}>
                <Button variant="text" color="blue-gray">
                  cart
                </Button>
              </Link>
            </li>
          </ul>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
