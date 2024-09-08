import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth.provider";
import { useEffect } from "react";
import { Loading } from "@repo/lib";

export const withAuth = (Component: React.FC) => {
  const AuthenticatedComponent = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
      if (!currentUser) navigate("/auth/sign-in");
    }, [!currentUser]);

    return currentUser ? <Component /> : <Loading />;
  };

  return AuthenticatedComponent;
};

export const withoutAuth = (Component: React.FC) => {
  const NotAuthenticatedComponent = () => {
    const navigate = useNavigate();

    const { currentUser } = useAuth();

    useEffect(() => {
      if (currentUser) navigate("/");
    }, [!!currentUser]);

    return !currentUser ? <Component /> : <Loading />;
  };

  return NotAuthenticatedComponent;
};
