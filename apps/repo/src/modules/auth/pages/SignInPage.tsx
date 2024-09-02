import { styled } from "styled-components";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../utils/auth.provider";
import { withoutAuth } from "../../../utils/hoc";

const SignInPage = () => {
  const navigate = useNavigate();

  const [signInForm] = Form.useForm();

  const { setAuthenticated } = useAuth();

  const handleSubmit = () => {
    setAuthenticated(true);
    navigate("/");
  };

  return (
    <StyledSignInPage>
      <Form
        form={signInForm}
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Field_email",
            },
            {
              type: "email",
              message: "Error_email",
            },
          ]}
        >
          <StyledInput
            size="large"
            placeholder="Enter email"
            maxLength={255}
            name="username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: `Field_password`,
            },
          ]}
        >
          <StyledPasswordInput
            autoComplete="off"
            size="large"
            placeholder="Enter password"
            name="password"
          />
        </Form.Item>
        <Link to="/auth/sign-in">Forget password</Link>

        <Form.Item style={{ textAlign: "center", marginTop: "50px" }}>
          <Button size="large" htmlType="submit">
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

const StyledSignInPage = styled.div`
  display: flex;
  padding: 10px;
  height: calc(100vh - 20px);
`;

const StyledInput = styled(Input)`
  border: 1px solid rgba(4, 7, 38, 0.4);
  background-color: #e8f0fe !important;
  border: none;
  font-size: 14px;
  height: 40px;
`;

const StyledPasswordInput = styled(Input.Password)`
  border: 1px solid rgba(4, 7, 38, 0.4);
  background-color: #e8f0fe !important;
  font-size: 14px;
  border: none;
  height: 40px;
`;
