import { Navigate, Outlet } from "react-router-dom";
import getLoginUserQuery from "../actions/user/getLoginUser";
import Loader from "../components/layouts/loader";

const AdminRoutes = () => {
  const { data: userData, isLoading } = getLoginUserQuery();

  if (isLoading) {
    return <Loader />;
  } else if (
    userData &&
    userData.user &&
    userData.user.isAdmin === true
  ) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminRoutes;
