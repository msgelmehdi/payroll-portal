import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Employees", "employees", <>11</>),
  getItem("Salaries", "salaries", <>22</>),
];

export const SharedLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(
    location.pathname.split("/")?.[1] ?? ""
  );

  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKey(key);
    navigate(`/${key}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={[selectedKey === "" ? "employees" : selectedKey]}
          mode="inline"
          items={items}
          onClick={handleClickMenu}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "green" }} />
        <Content style={{ margin: "0 16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};
