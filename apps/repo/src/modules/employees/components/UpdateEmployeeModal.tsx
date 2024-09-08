import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Popconfirm,
  Row,
  Tooltip,
} from "antd";
import { styled } from "styled-components";
import { db, IEmployee } from "@repo/lib";
import { DeleteIcon } from "@repo/icons";
import { useAuth } from "../../../utils/auth.provider";
import dayjs from "dayjs";
import { useEffect } from "react";

interface UpdateEmployeeModalProps {
  header: string;
  employeeToEdit: IEmployee | null;
  isModalOpen: boolean;
  setEmployeeToEdit: React.Dispatch<React.SetStateAction<IEmployee | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateEmployeeModal = ({
  header,
  employeeToEdit,
  isModalOpen,
  setEmployeeToEdit,
  setModalOpen,
}: UpdateEmployeeModalProps) => {
  const { currentUser } = useAuth();

  const [employeeForm] = Form.useForm();

  const handleCloseModal = () => {
    setEmployeeToEdit(null);
    setModalOpen(false);
  };

  const handleOnSuccess = (description: string) => {
    notification.open({
      type: "success",
      message: "Success",
      description,
    });
    handleCloseModal();
  };

  const handleFormConfirm = (employee: IEmployee) => {
    const formattedDate = (employee.joiningDate as any).toISOString();
    if (employeeToEdit) {
      db.updateEmployee({
        ...employee,
        joiningDate: formattedDate,
        organizationId: currentUser?.organizationId!,
        id: employeeToEdit.id,
      });
      handleOnSuccess("Employee updated successfully.");
    } else {
      db.addEmployee({
        ...employee,
        joiningDate: formattedDate,
        organizationId: currentUser?.organizationId!,
      });
      handleOnSuccess("Employee added successfully.");
    }
  };

  useEffect(() => {
    employeeForm.setFieldsValue(
      employeeToEdit
        ? {
            ...employeeToEdit,
            joiningDate: dayjs(employeeToEdit?.joiningDate),
          }
        : {
            name: "",
            joiningDate: "",
            basicSalary: null,
            salaryAllowances: [],
          }
    );
  }, [employeeToEdit, employeeForm]);

  return (
    <StyledUpdateEmployeeModal
      getContainer="#employees-modal"
      open={isModalOpen}
      destroyOnClose
      width="50%"
      onCancel={handleCloseModal}
      footer={[
        <Button key="back" onClick={handleCloseModal}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => employeeForm.submit()}
        >
          Save
        </Button>,
      ]}
      title={header}
      styles={{
        wrapper: { position: "absolute" },
        mask: { position: "absolute" },
      }}
    >
      <Form
        layout="vertical"
        form={employeeForm}
        onFinish={handleFormConfirm}
        {...(employeeToEdit && {
          initialValues: {
            ...employeeToEdit,
            joiningDate: dayjs(employeeToEdit.joiningDate),
          },
        })}
      >
        <Form.Item
          name="name"
          rules={[
            {
              whitespace: true,
              required: true,
              message: "Name is required.",
            },
          ]}
          label={<StyledLabel>Name</StyledLabel>}
        >
          <Input placeholder="Full name" maxLength={255} />
        </Form.Item>
        <Form.Item
          name="joiningDate"
          rules={[
            {
              required: true,
              message: "Joining date is required.",
            },
          ]}
          label={<StyledLabel>Joining date</StyledLabel>}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="basicSalary"
          rules={[
            {
              required: true,
              message: "Salary is required.",
            },
          ]}
          label={<StyledLabel>Basic salary</StyledLabel>}
        >
          <InputNumber
            placeholder="Salary"
            min={1}
            prefix="$"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <StyledLabel $required>Salary allowances</StyledLabel>
        <Form.List name="salaryAllowances">
          {(fields, { add, remove }) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {fields.map((field) => (
                <Row style={{ margin: 0 }} gutter={[15, 0]} key={field.key}>
                  <Col span={11}>
                    <Form.Item
                      name={[field.name, "type"]}
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message: "Type is required.",
                        },
                      ]}
                    >
                      <Input placeholder="Type" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name={[field.name, "amount"]}
                      rules={[
                        {
                          required: true,
                          message: "Amount is required.",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Amount"
                        min={1}
                        prefix="$"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col style={{ marginTop: "5px" }} span={1}>
                    <Popconfirm
                      title="Are you sure to remove this allowance?"
                      onConfirm={() => remove(field.name)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Tooltip title="Remove">
                        <span style={{ cursor: "pointer", color: "#e91419" }}>
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </Popconfirm>
                  </Col>
                </Row>
              ))}
              <Button type="default" onClick={() => add()} block>
                Add an allowance
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </StyledUpdateEmployeeModal>
  );
};

export default UpdateEmployeeModal;

const StyledUpdateEmployeeModal = styled(Modal)`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-modal-content {
    min-width: 344px;
    padding: 20px 25px;
  }
`;

const StyledLabel = styled.div<{ $required?: boolean }>`
  color: #040726;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.27px;
  position: relative;

  ${(p) =>
    p.$required &&
    `margin-left: 10px;

    &::before { 
    display: inline-block;
    left: -10px;
    color: rgb(255, 77, 79);
    position: absolute;
    font-size: 13px;
    font-family: SimSun, sans-serif;
    content: "*";
  }`};
`;
