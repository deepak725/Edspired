import { Navigate } from "react-router-dom";
const Protected = ({ User, children }) => {
  if (!User) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;