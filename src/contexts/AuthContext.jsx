import { createContext, useState, useEffect } from "react"
import { verifyLoggedIn } from "../services/apiServices"

export const AuthContext = createContext(null)

export const AuthContextComponent = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    const initializeContext = async () => {
      try {
        const isUserValid = await verifyLoggedIn()
        setIsUserLoggedIn(!!isUserValid)
      } catch (error) {
        console.error(error)
      }
    }
    initializeContext()
  },[])

  return (
    <AuthContext.Provider value={{isUserLoggedIn, setIsUserLoggedIn}}>
    {children}
    </AuthContext.Provider>
  )
}