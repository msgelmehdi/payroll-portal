import { styled } from "styled-components";
import { withAuth } from "../../../utils/hoc";
import { db, IPayment, SearchInput, useDebounce } from "@repo/lib";
import { useLiveQuery } from "dexie-react-hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../../../utils/auth.provider";
import type { ColumnsType } from "antd/es/table";
import { Table, Row } from "antd";

const SalariesPaymentsPage = () => {
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [searchEmployee, setSearchEmployee] = useState("");

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

  const payments = useLiveQuery(
    () =>
      db.Payments.where({
        organizationId: currentUser?.organizationId,
      })
        .toArray()
        .then((records) =>
          records.filter((record) =>
            record.ref
              .toLowerCase()
              .includes(debouncedSearch?.toLowerCase() || "")
          )
        ),
    [currentUser?.organizationId, debouncedSearch]
  );

  const columns: ColumnsType<IPayment> = [
    {
      title: "Ref",
      dataIndex: "ref",
      key: "ref",
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => <>{record.total} $</>,
    },
  ];

  return (
    <StyledSalariesPaymentsPage>
      <Row style={{ marginBottom: "5px" }}>
        <SearchInput
          defaultValue={""}
          isSearchLoading={isSearchLoading}
          handleSearchChange={handleSearchChange}
          placeholder={"Search ..."}
        />
      </Row>
      <Table
        dataSource={payments}
        columns={columns}
        pagination={{ position: ["topLeft"] }}
      />
    </StyledSalariesPaymentsPage>
  );
};

export default withAuth(SalariesPaymentsPage);

const StyledSalariesPaymentsPage = styled.div`
  height: calc(100vh - 166px);
  padding: 0 40px 40px;
  overflow: auto;
`;
