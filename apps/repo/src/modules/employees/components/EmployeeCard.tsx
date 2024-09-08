import { Avatar, db, IEmployee } from "@repo/lib";
import { Button, Descriptions, Dropdown, notification, Space } from "antd";
import styled from "styled-components";
import type { MenuProps } from "antd";
import { ThreeDotsIcon } from "@repo/icons";
import dayjs from "dayjs";

interface EmployeeCardProps {
  employee: IEmployee;
  setEmployeeToEdit: React.Dispatch<React.SetStateAction<IEmployee | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmployeeCard = ({
  employee,
  setEmployeeToEdit,
  setModalOpen,
}: EmployeeCardProps) => {
  const handleEdit = () => {
    setEmployeeToEdit(employee);
    setModalOpen(true);
  };

  const handleRemove = () => {
    db.deleteEmployee(employee.id!);
    notification.open({
      type: "info",
      message: "Info",
      description: "Employee removed successfully.",
    });
  };

  const dropDownItems: MenuProps["items"] = [
    {
      label: <Space onClick={handleEdit}>Update employee</Space>,
      key: "1",
    },
    {
      label: <Space onClick={handleRemove}>Remove employee</Space>,
      key: "2",
    },
  ];

  const joinedAt = dayjs(employee.joiningDate).format("D MMMM YYYY");
  const totalAllowances =
    employee.salaryAllowances?.reduce(
      (total, allowance) => total + allowance.amount,
      0
    ) ?? 0;

  return (
    <StyledCard>
      <Dropdown menu={{ items: dropDownItems }} trigger={["click"]}>
        <StyledMoreButton type="text" shape="circle" icon={<ThreeDotsIcon />} />
      </Dropdown>
      <Avatar title={employee.name} description={`joined at ${joinedAt}`} />
      <StyledSalariesInfo>
        <Descriptions>
          <Descriptions.Item label="Basic salary">
            {employee.basicSalary} $
          </Descriptions.Item>
          <Descriptions.Item label="Total salary allowances">
            {totalAllowances} $
          </Descriptions.Item>
        </Descriptions>
      </StyledSalariesInfo>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  position: relative;
  background: #fff1ef;
  border-radius: 10px;
  max-width: 300px;
  padding: 10px;
  border-bottom: 2px solid #e91419;
`;

const StyledMoreButton = styled(Button)`
  position: absolute;
  right: 10px;
`;

const StyledSalariesInfo = styled.div`
  margin-top: 10px;
  padding: 5px 5px 0;
  border-top: 1px solid #ffa2a2;

  .ant-descriptions-row {
    display: flex;
    flex-direction: column;
  }
`;

export default EmployeeCard;
