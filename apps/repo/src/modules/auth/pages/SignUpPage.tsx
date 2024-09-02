import { Input, notification } from "antd";
import styled from "styled-components";
import { Button, Form } from "antd";
import { Link } from "react-router-dom";
import { withoutAuth } from "../../../utils/hoc";
import { ISignUpBody } from "@repo/lib";

const SignUpPage = () => {
  const [signUpForm] = Form.useForm();

  const onFinish = (values: ISignUpBody) => {
    console.log(values);
    notification.open({
      type: "info",
      message: "Info",
      description: `Welcome ${values.firstName}`,
    });
  };

  return (
    <StyledSignUpPage>
      <Form
        onFinish={onFinish}
        initialValues={{ remember: true }}
        form={signUpForm}
      >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: `Field_firstName`,
            },
          ]}
        >
          <StyledInput
            autoComplete="new-password"
            size="large"
            placeholder="firstName"
            maxLength={255}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: `Field_lastName`,
            },
          ]}
        >
          <StyledInput
            autoComplete="new-password"
            size="large"
            placeholder={"lastName"}
            maxLength={255}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: `Field_email`,
            },
            {
              type: "email",
              message: `Error_email`,
            },
          ]}
        >
          <StyledInput
            autoComplete="new-password"
            size="large"
            placeholder="Enter your email"
            maxLength={255}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: `Field_password` },
            {
              validator: (_, value) => {
                if (value && value.length < 8) {
                  return Promise.reject(new Error(`Password_length2`));
                }
                if (value && !/[A-Z]/.test(value)) {
                  return Promise.reject(new Error(`Uppercase_password`));
                }
                if (value && !/[a-z]/.test(value)) {
                  return Promise.reject(new Error(`Lowercase_password`));
                }
                if (value && !/[-+_!@#$%^&*,.?]/.test(value)) {
                  return Promise.reject(new Error(`Symbol_password`));
                }
                if (value && !/[0-9]/.test(value)) {
                  return Promise.reject(new Error(`Digit_password`));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <StyledPasswordInput
            autoComplete="new-password"
            size="large"
            placeholder="Enter password"
            maxLength={16}
          />
        </Form.Item>

        <Form.Item>
          <Button size="large" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: "center" }}>
            Already have an account? <Link to={"/auth/sign-in"}>Login</Link>
          </div>
        </Form.Item>
      </Form>
    </StyledSignUpPage>
  );
};

export default withoutAuth(SignUpPage);

const StyledSignUpPage = styled.div`
  display: flex;
  padding: 10px;
  height: calc(100vh - 20px);
`;

const StyledInput = styled(Input)`
  background-color: #e8f0fe !important;
  border: none;
  font-size: 14px;
  padding: 13px !important;
  height: 40px;
`;

const StyledPasswordInput = styled(Input.Password)`
  background-color: #e8f0fe !important;
  border: none;
  font-size: 14px;
  height: 40px;
  padding-top: 4px;
`;
