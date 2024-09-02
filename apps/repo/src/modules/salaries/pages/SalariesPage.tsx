import { styled } from "styled-components";
import { withAuth } from "../../../utils/hoc";

const SalariesPage = () => {
  return <StyledSalariesPage>Salaries Page</StyledSalariesPage>;
};

export default withAuth(SalariesPage);

const StyledSalariesPage = styled.div`
  height: calc(100vh - 100px);
  padding: 15px 40px;
`;
