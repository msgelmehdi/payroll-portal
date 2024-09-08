import { styled } from "styled-components";
import { withAuth } from "../../../utils/hoc";

const SalariesPage = () => {
  return (
    <StyledSalariesPage>
      Salaries Page
      <></>
      creation with month year
      <></>
      same page as processing page combine them
      <></>
      mark employee as end of services add if there is gratuity payments
    </StyledSalariesPage>
  );
};

export default withAuth(SalariesPage);

const StyledSalariesPage = styled.div`
  height: calc(100vh - 100px);
  padding: 15px 40px;
`;
