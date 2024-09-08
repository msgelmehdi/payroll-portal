import { styled } from "styled-components";
import { Button, Card, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../utils/auth.provider";
import { withoutAuth } from "../../../utils/hoc";
import { LogoIcon } from "@repo/icons";
import { db, ICurrentUser, ISignInBody, setUser } from "@repo/lib";

const SignInPage = () => {
  const navigate = useNavigate();

  const [signInForm] = Form.useForm();

  const { setCurrentUser } = useAuth();

  const handleSubmit = async (values: ISignInBody) => {
    const user = await db.Users.where("email")
      .equals(values.email)
      .and((v) => v.password === values.password)
      .first();
    if (user) {
      const organization = await db.Organizations.where("userId")
        .equals(user.id!)
        .first();
      if (organization) {
        const currentUser: ICurrentUser = {
          id: user.id!,
          organizationId: organization.id!,
          email: user.email,
          name: user.name,
          organizationName: organization.name,
        };
        setCurrentUser(currentUser);
        setUser(currentUser);
        notification.open({
          type: "info",
          message: "Info",
          description: `Welcome back ${user.name}`,
        });
      } else
        notification.open({
          type: "error",
          message: "Error",
          description: "Organization not found.",
        });
    } else
      notification.open({
        type: "error",
        message: "Error",
        description: "Incorrect email or password.",
      });
  };

  return (
    <StyledSignInPage>
      <StyledLogo>
        <LogoIcon />
      </StyledLogo>
      <Form
        form={signInForm}
        onFinish={handleSubmit}
        initialValues={{ email: "elmehdi@example.com", password: "Admin@123" }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              whitespace: true,
              required: true,
              message: "Email is required.",
            },
            {
              type: "email",
              message: "Email is invalid.",
            },
          ]}
        >
          <Input
            autoComplete="new-password"
            placeholder="Enter your email"
            maxLength={255}
            name="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              whitespace: true,
              required: true,
              message: "Password is required.",
            },
          ]}
        >
          <Input.Password
            autoComplete="new-password"
            placeholder="Enter your password"
            name="password"
          />
        </Form.Item>
        <Link to="/auth/sign-in">Forget password</Link>

        <Form.Item style={{ marginTop: "30px" }}>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          Don't have an account? <Link to={"/auth/sign-up"}>Register here</Link>
        </Form.Item>
      </Form>
    </StyledSignInPage>
  );
};

export default withoutAuth(SignInPage);

const StyledSignInPage = styled(Card)`
  width: 500px;
  margin: auto;
  margin-top: 100px;
`;

const StyledLogo = styled.div`
  font-size: 60px;
  text-align: center;
  border-bottom: 1px solid #cbcbcb;
  color: #e91419;
  margin-bottom: 30px;
`;
