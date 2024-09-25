const { Navigate } = require("react-router-dom");
const { useAuth } = require("~/auth/AuthContext")

const ProtectedRoute = ({children}) =>{
    const{isAuthenticated, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if(!isAuthenticated){
        return <Navigate to="/"/>;
    }

    return children;
}

export default ProtectedRoute;