import {
  Button,
  Checkbox,
  Col,
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
import { db, ISalaryAddition, ISalaryEmployee } from "@repo/lib";
import { DeleteIcon } from "@repo/icons";
import { useAuth } from "../../../utils/auth.provider";
import dayjs from "dayjs";

interface EmployeeSalaryProcessModalProps {
  salaryToEdit: ISalaryEmployee | null;
  setSalaryToEdit: React.Dispatch<React.SetStateAction<ISalaryEmployee | null>>;
}

const EmployeeSalaryProcessModal = ({
  salaryToEdit,
  setSalaryToEdit,
}: EmployeeSalaryProcessModalProps) => {
  const { currentUser } = useAuth();

  const [salaryForm] = Form.useForm();
  const additionsValue = Form.useWatch("additions", salaryForm);
  const deductionsValue = Form.useWatch("deductions", salaryForm);

  const handleCloseModal = () => {
    setSalaryToEdit(null);
  };

  const handleOnSuccess = (description: string) => {
    notification.open({
      type: "success",
      message: "Success",
      description,
    });
    handleCloseModal();
  };

  const handleFormConfirm = ({ endOfService, ...salary }: ISalaryEmployee) => {
    db.updateSalary({
      ...salary,
      id: salaryToEdit?.id,
      employeeId: salaryToEdit?.employeeId!,
      month: salaryToEdit?.month!,
      basicSalary: salaryToEdit?.employee.basicSalary ?? 0,
      salaryAllowances: salaryToEdit?.employee.salaryAllowances ?? [],
      paid: true,
    });
    db.addPayment({
      salaryId: salaryToEdit?.id!,
      organizationId: currentUser?.organizationId!,
      total:
        (salaryToEdit?.employee?.basicSalary ?? 0) +
        (salaryToEdit?.employee?.salaryAllowances?.reduce(
          (total, allowance) => total + allowance.amount,
          0
        ) ?? 0) +
        (additionsValue?.reduce(
          (total: number, addition: ISalaryAddition) =>
            total + (addition?.amount ?? 0),
          0
        ) ?? 0) -
        (deductionsValue?.reduce(
          (total: number, deduction: ISalaryAddition) =>
            total + (deduction?.amount ?? 0),
          0
        ) ?? 0),
      ref: `PAYMENT ${salaryToEdit?.employee.name.toUpperCase()} ${salaryToEdit?.id}`,
    });
    handleOnSuccess("Employee salary pay process confirmed.");
    if (endOfService && salaryToEdit?.employee) {
      db.updateEmployee({ ...salaryToEdit?.employee, endOfService });
      handleOnSuccess("Employee has end service.");
    }
  };

  return (
    <StyledEmployeeSalaryProcessModal
      getContainer="#salaries-modal"
      open={!!salaryToEdit}
      destroyOnClose
      width="50%"
      onCancel={handleCloseModal}
      footer={[
        <Button key="back" onClick={handleCloseModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => salaryForm.submit()}>
          Confirm
        </Button>,
      ]}
      title="Salary pay session process"
      styles={{
        wrapper: { position: "absolute" },
        mask: { position: "absolute" },
      }}
    >
      <Form layout="vertical" form={salaryForm} onFinish={handleFormConfirm}>
        <StyledLabel>Employee name</StyledLabel>
        <StyledValue>{salaryToEdit?.employee?.name}</StyledValue>
        <StyledLabel>Month</StyledLabel>
        <StyledValue>
          {dayjs(salaryToEdit?.month).format("MMMM YYYY")}
        </StyledValue>
        <StyledLabel>Basic salary</StyledLabel>
        <StyledValue>{salaryToEdit?.employee?.basicSalary} $</StyledValue>
        <StyledLabel>Total salary allowances</StyledLabel>
        <StyledValue>
          {salaryToEdit?.employee?.salaryAllowances.length
            ? salaryToEdit?.employee?.salaryAllowances?.map(
                ({ type, amount }) => (
                  <div key={type}>
                    {type}: {amount} $
                  </div>
                ),
                0
              )
            : "0 $"}
        </StyledValue>
        <StyledLabel>Additions</StyledLabel>
        <Form.List name="additions">
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
                      title="Are you sure to remove this addition?"
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
                Add an addition
              </Button>
            </div>
          )}
        </Form.List>
        <StyledLabel>Deductions</StyledLabel>
        <Form.List name="deductions">
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
                      title="Are you sure to remove this deduction?"
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
                Add a deduction
              </Button>
            </div>
          )}
        </Form.List>
        <StyledLabel>Total salary</StyledLabel>
        <StyledValue>
          {(salaryToEdit?.employee?.basicSalary ?? 0) +
            (salaryToEdit?.employee?.salaryAllowances?.reduce(
              (total, allowance) => total + allowance.amount,
              0
            ) ?? 0) +
            (additionsValue?.reduce(
              (total: number, addition: ISalaryAddition) =>
                total + (addition?.amount ?? 0),
              0
            ) ?? 0) -
            (deductionsValue?.reduce(
              (total: number, deduction: ISalaryAddition) =>
                total + (deduction?.amount ?? 0),
              0
            ) ?? 0)}
        </StyledValue>
        <Form.Item name="endOfService">
          <Checkbox>Mark as end of service.</Checkbox>
        </Form.Item>
      </Form>
    </StyledEmployeeSalaryProcessModal>
  );
};

export default EmployeeSalaryProcessModal;

const StyledEmployeeSalaryProcessModal = styled(Modal)`
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
  margin-top: 15px;

  ${(p) =>
    p.$required &&
    `margin-left: 10px;
    padding-bottom: 10px;

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

const StyledValue = styled.div`
  color: #8d8d8d;
`;
