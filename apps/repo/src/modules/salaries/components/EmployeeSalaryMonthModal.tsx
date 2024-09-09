import { Badge, Calendar, CalendarProps, Modal, notification } from "antd";
import { styled } from "styled-components";
import { db, IEmployeeSalaries } from "@repo/lib";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import CalendarHeaderRender from "./CalendarHeaderRender";
import type { SelectInfo } from "antd/es/calendar/generateCalendar";

interface EmployeeSalaryMonthModalProps {
  employeeSalaryMonth: IEmployeeSalaries | null;
  setEmployeeSalaryMonth: React.Dispatch<
    React.SetStateAction<IEmployeeSalaries | null>
  >;
}

const EmployeeSalaryMonthModal = ({
  employeeSalaryMonth,
  setEmployeeSalaryMonth,
}: EmployeeSalaryMonthModalProps) => {
  const handleCloseModal = () => {
    setEmployeeSalaryMonth(null);
  };

  const monthSelectedSalary = (value: Dayjs) => {
    const selectedSalary = employeeSalaryMonth?.salaries.find((salary) =>
      isSameMonth(salary.month, value.toISOString())
    );
    if (selectedSalary) return selectedSalary;
    return null;
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current: Dayjs) => {
    const salary = monthSelectedSalary(current);
    return salary ? (
      <div
        className={
          salary.paid ? "calendar-paid-month" : "calendar-selected-month"
        }
      />
    ) : null;
  };

  const isSameMonth = (d1: string, d2: string): boolean => {
    return dayjs(d1).isSame(dayjs(d2), "month");
  };

  const handleSelectMonth = (selected: Dayjs, { source }: SelectInfo) => {
    if (source === "month") {
      const selectedSalary = employeeSalaryMonth?.salaries?.find((salary) =>
        isSameMonth(salary.month, selected.toISOString())
      );
      if (selectedSalary?.paid) {
        notification.open({
          type: "info",
          message: "Info",
          description: "Salary month already paid.",
        });
      } else {
        if (!!selectedSalary) db.deleteSalary(selectedSalary.id!);
        else {
          db.addSalary({
            employeeId: employeeSalaryMonth?.id!,
            month: selected.toISOString(),
            deductions: [],
            additions: [],
            paid: false,
            basicSalary: 0,
            salaryAllowances: [],
          });
        }
        notification.open({
          type: "success",
          message: "Success",
          description: `Month ${selectedSalary ? "removed" : "added"} successfully.`,
        });
      }
    }
  };

  const disabledBeforeDate = (current: Dayjs) => {
    return current && current < dayjs(employeeSalaryMonth?.joiningDate);
  };

  return (
    <StyledEmployeeSalaryMonthModal
      getContainer="#salaries-modal"
      open={!!employeeSalaryMonth}
      destroyOnClose
      width="50%"
      onCancel={handleCloseModal}
      footer={false}
      title={"Employee salary months"}
      styles={{
        wrapper: { position: "absolute" },
        mask: { position: "absolute" },
      }}
    >
      <Calendar
        mode="year"
        headerRender={CalendarHeaderRender}
        disabledDate={disabledBeforeDate}
        cellRender={cellRender}
        onSelect={handleSelectMonth}
      />
      <Badge color="#ffa7a2" text="Selected month" />
      <br /> <Badge color="#a2dcff" text="Paid month" />
    </StyledEmployeeSalaryMonthModal>
  );
};

export default EmployeeSalaryMonthModal;

const StyledEmployeeSalaryMonthModal = styled(Modal)`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-modal-content {
    min-width: 344px;
    padding: 20px 25px;
  }

  .ant-picker-cell-inner:has(.calendar-selected-month) {
    background: #ffcece !important;
  }
  .ant-picker-cell-inner:has(.calendar-paid-month) {
    background: #a2dcff !important;
  }
`;
