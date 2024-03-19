import { useEffect, useRef, useState } from "react";
import getLoginUserQuery from "../actions/user/getLoginUser";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import ProductCard from "../components/productCards";
import getAllProductQuery from "../actions/product/getAllProducts";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../components/layouts/loader";

const Home = () => {
  const { data: userData } = getLoginUserQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = getAllProductQuery();
  const [guestCartChange, setGuestCartChange] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(data?.products);
  const [productData, setProductData] = useState(data?.products)

  const handleSearchTerm = (term) => {
    setSearchTerm(term);
  };
  console.log(searchTerm)

  useEffect(() => {
    if (data) {
     setProductData(data.products);
     setFilteredProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const filteredData = productData?.filter((item) =>
        item.name.toLowerCase().includes(searchTerm?.toLowerCase() || "")
      );
      console.log(filteredData)
     setFilteredProducts(filteredData);
    }
  }, [searchTerm]);

  const handleGuestCartChange = (data) => {
    setGuestCartChange(data);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            userData={userData}
            handleSearchTerm={handleSearchTerm}
            guestCartChange={guestCartChange}
          />
          <ProductCard
            productData={filteredProducts}
            userData={userData}
            guestCartChange={handleGuestCartChange}
          />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
