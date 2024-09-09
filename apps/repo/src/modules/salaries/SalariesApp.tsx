import { useNavigate, useRoutes, useLocation } from "react-router-dom";
import { SalariesRoutes } from "./routes/salaries.routes";
import styled from "styled-components";
import { Tabs, type TabsProps } from "antd";
import { useState } from "react";

const items: TabsProps["items"] = [
  {
    key: "",
    label: "Salary months",
  },
  {
    key: "processing",
    label: "Salary processing",
  },
  {
    key: "payments",
    label: "Payments",
  },
];

const SalariesApp = () => {
  const element = useRoutes(SalariesRoutes);

  const navigate = useNavigate();
  const lastPathSegment = useLocation()?.pathname.split("/").at(-1);
  const [activeTab] = useState<string>(lastPathSegment ?? "");

  return (
    <StyledSalariesApp id="salaries-modal">
      <Tabs
        defaultActiveKey={activeTab}
        items={items}
        onChange={(tab) => navigate(tab)}
      />
      {element}
    </StyledSalariesApp>
  );
};

export default SalariesApp;

const StyledSalariesApp = styled.div`
  height: 100%;
  width: 100%;
  position: relative;

  .ant-tabs {
    padding: 20px 40px;
  }
`;
