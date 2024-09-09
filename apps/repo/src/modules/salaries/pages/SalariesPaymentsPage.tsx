import { styled } from "styled-components";
import { withAuth } from "../../../utils/hoc";

const SalariesPaymentsPage = () => {
  return (
    <StyledSalariesPaymentsPage>history of payments</StyledSalariesPaymentsPage>
  );
};

export default withAuth(SalariesPaymentsPage);

const StyledSalariesPaymentsPage = styled.div`
  height: calc(100vh - 166px);
  padding: 0 40px 40px;
  overflow: auto;
`;
