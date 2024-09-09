import { styled } from "styled-components";
import { withAuth } from "../../../utils/hoc";

const SalariesProcessingPage = () => {
  return (
    <StyledSalariesProcessingPage>
      Salaries Processing Page
      <></>
      select month and year then each employee shows
      <></>
      from creation at salariespage month year
      <></>
      shows total salary to be payed after adjusting additions and deductions
      columns
      <></>
      process salary pay action change status from paid unpaid role
      <></>
      with total to pay
      <></>
      checkbox if payments as end-of-service
      <></> show optional (gratuity {"{type, amount}[]"}) payments if applicable
      mark employee as end of services add if there is gratuity payments
    </StyledSalariesProcessingPage>
  );
};

export default withAuth(SalariesProcessingPage);

const StyledSalariesProcessingPage = styled.div`
  height: calc(100vh - 166px);
  padding: 0 40px 40px;
  overflow: auto;
`;
