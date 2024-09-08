import { LogoutOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { EmployeesIcon, LogoIcon, SalariesIcon } from "@repo/icons";
import { Avatar, removeUser } from "@repo/lib";
import { Button, Col, Layout, Menu, Row, Space } from "antd";
import type { MenuProps } from "antd";
import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../utils/auth.provider";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: ReactNode,
  key: React.Key,
  icon?: ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};

const items: MenuItem[] = [
  getItem("Employees", "employees", <Icon component={EmployeesIcon} />),
  getItem("Salaries", "salaries", <Icon component={SalariesIcon} />),
];

export const SharedLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, setCurrentUser } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(
    location.pathname.split("/")?.[1] ?? ""
  );

  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKey(key);
    navigate(`/${key}`);
  };

  const logout = () => {
    setCurrentUser(null);
    removeUser();
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        width="230px"
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <StyledLogo>
          <LogoIcon />
        </StyledLogo>
        <Avatar
          title={collapsed ? "" : currentUser?.name!}
          description={collapsed ? "" : currentUser?.email!}
        />
        <Menu
          style={{ marginTop: "30px", padding: "10px" }}
          mode="inline"
          defaultSelectedKeys={[selectedKey === "" ? "employees" : selectedKey]}
          items={items}
          onClick={handleClickMenu}
        />
      </Sider>
      <Layout style={{ background: "#fff", borderLeft: "1px solid #cbcbcb" }}>
        <Header
          style={{
            background: "#fff",
            borderBottom: "1px solid #cbcbcb",
          }}
        >
          <Row justify="space-between">
            <Col>
              <h2 style={{ margin: 0, color: "#e91419" }}>
                {currentUser?.organizationName}
              </h2>
            </Col>
            <Col>
              <Button
                onClick={logout}
                type="text"
                icon={<LogoutOutlined />}
                style={{ color: "#e91419" }}
              />
            </Col>
          </Row>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

const StyledLogo = styled.div`
  font-size: 40px;
  text-align: center;
  padding-block: 12px 2px;
  border-bottom: 1px solid #cbcbcb;
  color: #e91419;
  margin-bottom: 50px;
`;
