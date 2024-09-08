import { styled } from "styled-components";
import { withAuth } from "../../../utils/hoc";
import { Button, Flex, Pagination, Row } from "antd";
import { EmployeePlusIcon } from "@repo/icons";
import { db, IEmployee, SearchInput, useDebounce } from "@repo/lib";
import { ChangeEvent, useEffect, useState } from "react";
import UpdateEmployeeModal from "../components/UpdateEmployeeModal";
import { useLiveQuery } from "dexie-react-hooks";
import { useAuth } from "../../../utils/auth.provider";
import EmployeeCard from "../components/EmployeeCard";

const elementsPerPage = 10;

const EmployeesPage = () => {
  const [employeeToEdit, setEmployeeToEdit] = useState<IEmployee | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [isSearchLoading, setSearchLoading] = useState(false);
  const [searchDashboard, setSearchDashboard] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const { currentUser } = useAuth();

  const debouncedSearch = useDebounce(searchDashboard);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchLoading(true);
    setSearchDashboard(value);
    if (value === debouncedSearch) setSearchLoading(false);
  };

  useEffect(() => {
    setSearchLoading(false);
  }, [debouncedSearch]);

  const employees =
    useLiveQuery(
      () =>
        db.Employees.where({
          organizationId: currentUser?.organizationId,
        })
          .toArray()
          .then((records) =>
            records.filter((record) =>
              record.name
                .toLowerCase()
                .includes(debouncedSearch?.toLowerCase() || "")
            )
          ),
      [currentUser?.organizationId, debouncedSearch]
    ) ?? [];

  const showModal = () => {
    setEmployeeToEdit(null);
    setModalOpen(true);
  };

  return (
    <StyledEmployeesPage>
      <Row style={{ marginBottom: "20px" }} justify="space-between">
        <SearchInput
          defaultValue={""}
          isSearchLoading={isSearchLoading}
          handleSearchChange={handleSearchChange}
          placeholder={"Search ..."}
        />
        <Button type="primary" icon={<EmployeePlusIcon />} onClick={showModal}>
          Add employee
        </Button>
      </Row>
      {!!employees?.length && (
        <Pagination
          style={{ marginBottom: "20px" }}
          showSizeChanger={false}
          pageSize={elementsPerPage}
          current={currentPage}
          onChange={setCurrentPage}
          total={employees.length}
        />
      )}
      <Flex wrap gap={30}>
        {employees
          ?.slice(
            (currentPage - 1) * elementsPerPage,
            (currentPage - 1) * elementsPerPage + elementsPerPage
          )
          .map((employee) => (
            <EmployeeCard
              employee={employee}
              setEmployeeToEdit={setEmployeeToEdit}
              setModalOpen={setModalOpen}
            />
          ))}
      </Flex>
      <UpdateEmployeeModal
        header={employeeToEdit ? "Update employee" : "New employee"}
        employeeToEdit={employeeToEdit}
        isModalOpen={isModalOpen}
        setEmployeeToEdit={setEmployeeToEdit}
        setModalOpen={setModalOpen}
      />
    </StyledEmployeesPage>
  );
};

export default withAuth(EmployeesPage);

const StyledEmployeesPage = styled.div`
  height: calc(100vh - 64px);
  padding: 40px;
  overflow: auto;
`;
