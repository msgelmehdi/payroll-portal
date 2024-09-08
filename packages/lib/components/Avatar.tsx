import styled from "styled-components";
import { EmployeeIcon } from "@repo/icons";

interface AvatarProps {
  title: string;
  description: string;
}

export const Avatar = ({ title, description }: AvatarProps) => {
  return (
    <StyledAvatar>
      <StyledAvatarIcon>
        <EmployeeIcon />
      </StyledAvatarIcon>
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
    </StyledAvatar>
  );
};

const StyledAvatar = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledAvatarIcon = styled.div`
  background: #fff;
  outline: 3px solid #fff;
  border: 1px solid #e91419;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #e91419;
`;

const StyledTitle = styled.div`
  height: 17px;
  margin-top: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
`;

const StyledDescription = styled.div`
  height: 16px;
  font-size: 13px;
  color: #959595;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
`;
