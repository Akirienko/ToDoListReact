import { AuthContext } from "./AuthContext";
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { User } from "../../types"


interface AuthProviderProps {
  children: React.ReactNode;
}


export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [user, setUser] = useLocalStorage<User | null>('user', null)

  const isAuthenticated = user !== null

  const login = (user: User) => {
    setUser(user);
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, login, logout, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}