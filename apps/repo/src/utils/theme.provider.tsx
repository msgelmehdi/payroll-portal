import { DatabaseOutlined } from "@ant-design/icons";
import { resetDatabase } from "@repo/lib";
import { ConfigProvider, FloatButton } from "antd";
import { ReactNode } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#e91419" },
        components: {
          Calendar: {
            itemActiveBg: "#fff",
            colorPrimary: "#000",
          },
        },
      }}
    >
      {children}
      <FloatButton
        onClick={() => resetDatabase()}
        icon={<DatabaseOutlined />}
        description="Reset local database"
        shape="square"
        type="primary"
        style={{
          height: "60px",
          fontWeight: "600",
          width: "150px",
          insetInlineEnd: 50,
        }}
      />
    </ConfigProvider>
  );
};
