import { createContext, useState, useEffect } from "react"
import { verifyLoggedIn } from "../services/apiServices"

export const AuthContext = createContext(null)

export const AuthContextComponent = ({ children }) => {
  const [ isUserLoggedIn, setIsUserLoggedIn ] = useState(false)
  const [ authLoading, setAuthLoading ] = useState(true)

  useEffect(() => {
    const initializeContext = async () => {
      try {
        const isUserValid = await verifyLoggedIn()
        setIsUserLoggedIn(!!isUserValid)
      } catch (error) {
        console.error(error)
      } finally {
        setAuthLoading(false)
      }
    }
    initializeContext()
  },[])

  return (
    <AuthContext.Provider value={{isUserLoggedIn, setIsUserLoggedIn, authLoading}}>
    {children}
    </AuthContext.Provider>
  )
}