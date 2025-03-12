import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    let user = useSelector(st => st.user.currentUser)

    if (!user || user.role != "admin")
        return <Navigate to="/login" />
    return children;
}

export default ProtectedRoute;