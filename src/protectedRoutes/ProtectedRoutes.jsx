import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";
import Navbar from "../components/navBar/navBar";

const ProtectedRoutes = ({ children }) => {
  const { isUserLoggedIn, authLoading } = useContext(AuthContext)

  if (authLoading) {
    return (
      <>
        <Navbar></Navbar>
      </>
    )
  }

  if (!isUserLoggedIn) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoutes