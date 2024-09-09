import { styled } from "styled-components";
import { withAuth } from "../../../utils/hoc";
import { db, ISalaryEmployee, SearchInput, useDebounce } from "@repo/lib";
import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../../../utils/auth.provider";
import { useLiveQuery } from "dexie-react-hooks";
import { Button, Row, Space, Table } from "antd";
import EmployeeSalaryProcessModal from "../components/EmployeeSalaryProcessModal";

const SalariesProcessingPage = () => {
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [salaryToEdit, setSalaryToEdit] = useState<ISalaryEmployee | null>(
    null
  );

  const { currentUser } = useAuth();

  const debouncedSearch = useDebounce(searchEmployee);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchLoading(true);
    setSearchEmployee(value);
    if (value === debouncedSearch) setSearchLoading(false);
  };

  useEffect(() => {
    setSearchLoading(false);
  }, [debouncedSearch]);

  const salaries = useLiveQuery(async () => {
    const employees = await db.Employees.where({
      organizationId: currentUser?.organizationId,
    })
      .toArray()
      .then((records) =>
        records.filter((record) =>
          record.name
            .toLowerCase()
            .includes(debouncedSearch?.toLowerCase() || "")
        )
      );

    if (employees.length === 0) return [];

    const employeeIds = employees.map((employee) => employee.id!);
    const employeesSalaries = await db.Salaries.where("employeeId")
      .anyOf(employeeIds)
      .toArray()
      .then((records) =>
        records.map((record) => ({
          ...record,
          employee: employees.find(
            (employee) => employee.id === record.employeeId
          )!,
        }))
      );

    return employeesSalaries;
  }, [currentUser?.organizationId, debouncedSearch]);

  const columns: ColumnsType<ISalaryEmployee> = [
    {
      title: "Employee name",
      dataIndex: "name",
      render: (_, record) => record.employee.name,
    },
    {
      title: "Month",
      key: "joiningDate",
      render: (_, record) => dayjs(record.month).format("MMMM YYYY"),
    },
    {
      title: "Total salary",
      key: "salary",
      render: (_, record) => (
        <>
          {record.employee?.basicSalary +
            (record.employee?.salaryAllowances?.reduce(
              (total, allowance) => total + allowance.amount,
              0
            ) ?? 0) +
            (record.additions?.reduce(
              (total, addition) => total + addition.amount,
              0
            ) ?? 0) -
            (record.deductions?.reduce(
              (total, deduction) => total + deduction.amount,
              0
            ) ?? 0)}{" "}
          $
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => setSalaryToEdit(record)}>
            Process
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <StyledSalariesProcessingPage>
      <Row style={{ marginBottom: "5px" }}>
        <SearchInput
          defaultValue={""}
          isSearchLoading={isSearchLoading}
          handleSearchChange={handleSearchChange}
          placeholder={"Search ..."}
        />
      </Row>
      <Table
        dataSource={salaries}
        columns={columns}
        pagination={{ position: ["topLeft"] }}
      />
      <EmployeeSalaryProcessModal
        salaryToEdit={salaryToEdit}
        setSalaryToEdit={setSalaryToEdit}
      />
    </StyledSalariesProcessingPage>
  );
};

export default withAuth(SalariesProcessingPage);

const StyledSalariesProcessingPage = styled.div`
  height: calc(100vh - 166px);
  padding: 0 40px 40px;
  overflow: auto;
`;
