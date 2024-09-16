const { createContext, useState, useContext, useEffect } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateUser = (updateUser) =>{
        setUser(updateUser);
        sessionStorage.setItem("user", JSON.stringify(updateUser));
    }

    useEffect(() =>{
        const storedUser = sessionStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (userData) =>{
        setIsAuthenticated(true);
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        sessionStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout, loading, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
};

//custom hook 
export const useAuth = () =>{
    return useContext(AuthContext);
}