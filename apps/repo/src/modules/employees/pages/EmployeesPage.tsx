import { styled } from "styled-components";
import { withAuth } from "../../../utils/hoc";

const EmployeesPage = () => {
  return <StyledEmployeesPage>Employees Page</StyledEmployeesPage>;
};

export default withAuth(EmployeesPage);

const StyledEmployeesPage = styled.div`
  height: calc(100vh - 100px);
  padding: 15px 40px;
`;
