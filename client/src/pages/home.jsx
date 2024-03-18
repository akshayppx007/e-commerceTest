import { useEffect, useState } from "react";
import getLoginUserQuery from "../actions/user/getLoginUser";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import ProductCard from "../components/productCards";
import getAllProductQuery from "../actions/product/getAllProducts";
import { useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const { data: userData } = getLoginUserQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isStale } = getAllProductQuery();
  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [guestCartChange, setGuestCartChange] = useState("");

  const handleSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.resetQueries({ queryKey: ["getAllProducts"], exact: true });
  }, [queryClient]);

  useEffect(() => {
    if (data) {
      setProductData(data.products);
      setFilteredProducts(data.products);
    }
  }, [data, isStale]);

  useEffect(() => {
    const filteredData = productData?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredData);
  }, [searchTerm]);

  const handleGuestCartChange = (data) => {
    setGuestCartChange(data);
  };

  return (
    <>
      <Header
        userData={userData}
        handleSearchTerm={handleSearchTerm}
        guestCartChange={guestCartChange}
      />
      <ProductCard productData={filteredProducts} userData={userData} guestCartChange={handleGuestCartChange} />
      <Footer />
    </>
  );
};

export default Home;
