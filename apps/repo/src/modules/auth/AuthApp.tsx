import { useRoutes } from "react-router-dom";
import { AuthRoutes } from "./routes/auth.routes";
import { Card } from "antd";
import styled from "styled-components";
import { LogoIcon } from "@repo/icons";

const AuthApp = () => {
  const element = useRoutes(AuthRoutes);

  return (
    <StyledAuthApp>
      <StyledLogo>
        <LogoIcon />
      </StyledLogo>
      {element}
    </StyledAuthApp>
  );
};

export default AuthApp;

const StyledAuthApp = styled(Card)`
  width: 500px;
  margin: auto;
  margin-top: 100px;
`;

const StyledLogo = styled.div`
  font-size: 60px;
  text-align: center;
  border-bottom: 1px solid #cbcbcb;
  color: #e91419;
  margin-bottom: 30px;
`;
