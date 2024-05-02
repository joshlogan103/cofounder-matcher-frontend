import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";

const ProtectedRoutes = ({children}) => {
  const { isUserLoggedIn } = useContext(AuthContext)

  if (!isUserLoggedIn) {
    return <Navigate to='/login' replace />
  }
  
  return children
}

export default ProtectedRoutes