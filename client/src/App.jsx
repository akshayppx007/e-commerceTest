import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import CartPage from "./pages/cartPage";
import AddProductPage from "./pages/addProduct";
import { Toaster } from "react-hot-toast";
import AdminRoutes from "./utils/protectedRoutes";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route element={<AdminRoutes />}>
            <Route path="/product" element={<AddProductPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
