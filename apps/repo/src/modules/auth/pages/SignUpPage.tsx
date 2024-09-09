import { Input, notification } from "antd";
import { Button, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { withoutAuth } from "../../../utils/hoc";
import { db, ICurrentUser, ISignUpBody, setUser } from "@repo/lib";
import { useAuth } from "../../../utils/auth.provider";

const SignUpPage = () => {
  const [signUpForm] = Form.useForm();
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async ({
    email,
    name,
    password,
    organizationName,
  }: ISignUpBody) => {
    const userId = await db.Users.add({ email, name, password });
    const organizationId = await db.Organizations.add({
      userId,
      name: organizationName,
    });
    notification.open({
      type: "info",
      message: "Info",
      description: `Welcome ${name}`,
    });
    const currentUser: ICurrentUser = {
      id: userId,
      organizationId,
      email,
      name,
      organizationName,
    };
    setCurrentUser(currentUser);
    setUser(currentUser);
    navigate("/");
  };

  return (
    <Form onFinish={handleSubmit} form={signUpForm}>
      <Form.Item
        name="name"
        rules={[
          {
            whitespace: true,
            required: true,
            message: "Name is required.",
          },
        ]}
      >
        <Input autoComplete="new-password" placeholder="name" maxLength={255} />
      </Form.Item>
      <Form.Item
        name="organizationName"
        rules={[
          {
            whitespace: true,
            required: true,
            message: "Organization is required.",
          },
        ]}
      >
        <Input
          autoComplete="new-password"
          placeholder={"Organization name"}
          maxLength={255}
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            whitespace: true,
            required: true,
            message: "Email is required",
          },
          {
            type: "email",
            message: "Email is invalid",
          },
        ]}
      >
        <Input
          autoComplete="new-password"
          placeholder="Enter your email"
          maxLength={255}
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
          {
            validator: (_, value) => {
              if (value && value.length < 8) {
                return Promise.reject(
                  new Error("Password must be 8 or more characters in length.")
                );
              }
              if (value && !/[A-Z]/.test(value)) {
                return Promise.reject(
                  new Error(
                    "Password must contain 1 or more uppercase characters."
                  )
                );
              }
              if (value && !/[a-z]/.test(value)) {
                return Promise.reject(
                  new Error(
                    "Password must contain 1 or more lowercase characters."
                  )
                );
              }
              if (value && !/[-+_!@#$%^&*,.?]/.test(value)) {
                return Promise.reject(
                  new Error(
                    "Password must contain 1 or more special characters."
                  )
                );
              }
              if (value && !/[0-9]/.test(value)) {
                return Promise.reject(
                  new Error("Password must contain 1 or more digit characters.")
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input.Password
          autoComplete="new-password"
          placeholder="Enter your password"
          maxLength={255}
        />
      </Form.Item>

      <Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <Form.Item>
        <div style={{ textAlign: "center" }}>
          Already have an account? <Link to={"/auth/sign-in"}>Login</Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default withoutAuth(SignUpPage);
