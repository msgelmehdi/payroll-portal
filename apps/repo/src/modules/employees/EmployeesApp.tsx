import { useRoutes } from "react-router-dom";
import { EmployeesRoutes } from "./routes/employees.routes";
import styled from "styled-components";

const EmployeesApp = () => {
  const element = useRoutes(EmployeesRoutes);

  return (
    <StyledEmployeesApp id="employees-modal">{element}</StyledEmployeesApp>
  );
};

export default EmployeesApp;

const StyledEmployeesApp = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;
