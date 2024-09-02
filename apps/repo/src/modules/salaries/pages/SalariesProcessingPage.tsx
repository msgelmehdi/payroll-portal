import { styled } from "styled-components";
import { withAuth } from "../../../utils/hoc";

const SalariesProcessingPage = () => {
  return (
    <StyledSalariesProcessingPage>
      Salaries Processing Page
    </StyledSalariesProcessingPage>
  );
};

export default withAuth(SalariesProcessingPage);

const StyledSalariesProcessingPage = styled.div`
  height: calc(100vh - 100px);
  padding: 15px 40px;
`;
