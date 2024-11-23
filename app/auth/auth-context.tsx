import React, {
    createContext,
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
  } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  type User = {
    id: string;
    username: string;
    email: string;
  };
  
  type AuthContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
  };
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  }
  
  const SessionProvider = (props: { children: ReactNode }): ReactElement => {
      const [user, setUser] = useState<User | null>(null);
  
      useEffect(() => {
          const loadUser = async () => {
              const storedUser = await AsyncStorage.getItem("user");
              if (storedUser) setUser(JSON.parse(storedUser));
          };
          loadUser();
      }, []);
  
      useEffect(() => {
          const saveUser = async () => {
              if (user) {
                  await AsyncStorage.setItem("user", JSON.stringify(user));
              } else {
                  await AsyncStorage.removeItem("user");
              }
              setUser(user);
          };
          saveUser();
      }), [user];
  
      
  
      return <AuthContext.Provider {...props} value={{ user, setUser }} />;
  };
  
  export { SessionProvider, useAuth };
  