import { createContext, useState, useContext } from "react";

// 1. Initialize the context
export const UserContext = createContext(null);

// 2. Create the provider component
export const UserProvider = ({ children }) => {
  
  const [user , setUser] = useState(()=>{
    const token = localStorage.getItem('accessToken');
    const savedUser = localStorage.getItem('userData');
    // if both exist , parse the user object instantly
    if( token && savedUser){
      return JSON.parse(savedUser);
    }
    return null;
  }); 

  return (
    <UserContext.Provider value={{ user , setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom hook for consuming the context
export const getData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
