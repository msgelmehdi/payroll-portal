import { styled } from "styled-components";
import { withAuth } from "../../../utils/hoc";

const SalariesPaymentsPage = () => {
  return (
    <StyledSalariesPaymentsPage>history of payments</StyledSalariesPaymentsPage>
  );
};

export default withAuth(SalariesPaymentsPage);

const StyledSalariesPaymentsPage = styled.div`
  height: calc(100vh - 100px);
  padding: 15px 40px;
`;
