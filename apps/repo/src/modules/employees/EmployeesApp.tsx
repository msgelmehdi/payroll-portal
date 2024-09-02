import { useRoutes } from "react-router-dom";
import { EmployeesRoutes } from "./routes/employees.routes";
import styled from "styled-components";

const EmployeesApp = () => {
  const element = useRoutes(EmployeesRoutes);

  return (
    <StyledEmployeesApp id="package-management-modal">
      {element}
    </StyledEmployeesApp>
  );
};

export default EmployeesApp;

const StyledEmployeesApp = styled.div`
  height: calc(100vh - 80px);
`;
