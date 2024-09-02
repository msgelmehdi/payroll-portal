import { useRoutes } from "react-router-dom";
import { SalariesRoutes } from "./routes/salaries.routes";
import styled from "styled-components";

const SalariesApp = () => {
  const element = useRoutes(SalariesRoutes);

  return <StyledSalariesApp id="salaries-modal">{element}</StyledSalariesApp>;
};

export default SalariesApp;

const StyledSalariesApp = styled.div`
  height: calc(100vh - 80px);
`;
