// import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext.tsx";

// const RoleProtectedRoute = ({ role, children }: any) => {
//   const auth = useContext(AuthContext);

//   if (auth?.loading) return null;
//   if (!auth?.user) return <Navigate to="/login" />;
//   if (auth.user.role !== role) return <Navigate to="/unauthorized" />;

//   return children;
// };

// export default RoleProtectedRoute;
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";

const RoleProtectedRoute = ({ role, children }: any) => {
  const auth = useContext(AuthContext);

  if (auth?.loading) return null;

  if (!auth?.user) {
    return <Navigate to="/login" replace />;
  }

  // Case insensitive role check
  if (auth.user.role?.toUpperCase() !== role?.toUpperCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
