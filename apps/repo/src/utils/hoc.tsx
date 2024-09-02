import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth.provider";
import { useEffect } from "react";
import { Loading } from "@repo/lib";

export const withAuth = (Component: React.FC) => {
  const AuthenticatedComponent = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (!isAuthenticated) navigate("/auth/sign-in");
    }, [isAuthenticated === false]);

    return isAuthenticated ? <Component /> : <Loading />;
  };

  return AuthenticatedComponent;
};

export const withoutAuth = (Component: React.FC) => {
  const NotAuthenticatedComponent = () => {
    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (isAuthenticated) navigate("/");
    }, [isAuthenticated === true]);

    return !isAuthenticated ? <Component /> : <Loading />;
  };

  return NotAuthenticatedComponent;
};
