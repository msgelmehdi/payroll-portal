import { useRoutes } from "react-router-dom";
import { AuthRoutes } from "./routes/auth.routes";

const AuthApp = () => {
  const element = useRoutes(AuthRoutes);

  return <>{element}</>;
};

export default AuthApp;
