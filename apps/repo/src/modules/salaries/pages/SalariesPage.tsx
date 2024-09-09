import { styled } from "styled-components";
import { withAuth } from "../../../utils/hoc";
import { useLiveQuery } from "dexie-react-hooks";
import { db, IEmployeeSalaries, SearchInput, useDebounce } from "@repo/lib";
import { useAuth } from "../../../utils/auth.provider";
import { ChangeEvent, useEffect, useState } from "react";
import { Row, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditIcon } from "@repo/icons";
import EmployeeSalaryMonthModal from "../components/EmployeeSalaryMonthModal";
import dayjs from "dayjs";

const elementsPerPage = 10;

const SalariesPage = () => {
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [employeeSalaryMonth, setEmployeeSalaryMonth] =
    useState<IEmployeeSalaries | null>(null);

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

  const employees = useLiveQuery(async () => {
    const records = await db.Employees.where({
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

    const recordSalaries = await Promise.all(
      records.map(async (record) => {
        const salaries = await db.Salaries.where("employeeId")
          .equals(record.id!)
          .toArray();
        return {
          ...record,
          salaries,
        };
      })
    );

    return recordSalaries;
  }, [currentUser?.organizationId, debouncedSearch]);

  const columns: ColumnsType<IEmployeeSalaries> = [
    {
      title: "Employee name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Employee since",
      key: "joiningDate",
      render: (_, record) => dayjs(record.joiningDate).format("D MMMM YYYY"),
    },
    {
      title: "Basic salary",
      dataIndex: "basicSalary",
      key: "basicSalary",
    },
    {
      title: "Total salary allowances",
      key: "salaryAllowances",
      render: (_, record) =>
        record.salaryAllowances?.reduce(
          (total, allowance) => total + allowance.amount,
          0
        ) ?? 0,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Update salary months">
            <span
              onClick={() => setEmployeeSalaryMonth(record)}
              style={{ cursor: "pointer" }}
            >
              <EditIcon />
            </span>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const liveEmployeeSalaryMonth =
    employees?.find((employee) => employee.id === employeeSalaryMonth?.id) ??
    null;

  return (
    <StyledSalariesPage>
      <Row style={{ marginBottom: "5px" }}>
        <SearchInput
          defaultValue={""}
          isSearchLoading={isSearchLoading}
          handleSearchChange={handleSearchChange}
          placeholder={"Search ..."}
        />
      </Row>
      <Table
        dataSource={employees}
        columns={columns}
        pagination={{ position: ["topLeft"] }}
      />
      <EmployeeSalaryMonthModal
        employeeSalaryMonth={liveEmployeeSalaryMonth}
        setEmployeeSalaryMonth={setEmployeeSalaryMonth}
      />
    </StyledSalariesPage>
  );
};

export default withAuth(SalariesPage);

const StyledSalariesPage = styled.div`
  height: calc(100vh - 166px);
  padding: 0 40px 40px;
  overflow: auto;
`;
