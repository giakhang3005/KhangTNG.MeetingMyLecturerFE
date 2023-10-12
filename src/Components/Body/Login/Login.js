import React, { useContext, useState, useCallback } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button, Alert, Form, Input, Typography, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Data } from "../Body";
import "./LoginStyle.css";
import { useAccountStatus } from "../../../Hooks/All/useAccountStatus";

export const Login = () => {
  const { Title } = Typography;
  // User -> user.name, email, picture, id, role...
  const { user, setUser, setRole } = useContext(Data);
  const { isErr, setIsErr } = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const validStatus = useAccountStatus();

  // Email check
  const fptEmail = "@fpt.edu.vn",
    feEmail = "@fe.edu.vn";
  const [checkMailErr, setCheckMailErr] = useState(false);

  const [ggLoading, setGgLoading] = useState(false);
  //Handle login by gmail
  const loginWithGG = useGoogleLogin({
    // Succes
    onSuccess: (codeResponse) =>
      // Fetch User data
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          //! validate @fpt.edu.vn and @fe.edu.vn
          if (
            res.data.email.includes(fptEmail) ||
            res.data.email.includes(feEmail)
          ) {
            setCheckMailErr(false);
            const userFromGg = res.data;
            //! call database, if database does not exist -> add data to database (default role: student)
            setGgLoading(true);
            axios
              .get(
                `https://meet-production-52c7.up.railway.app/api/v1/account/get/${userFromGg.id}`
              )
              //! account exist
              .then((response) => response.data.data)
              .then((userData) => {
                const finalUser = {
                  id: userData.id,
                  name: userData.name,
                  picture: userFromGg.img,
                  email: userData.email,
                  role: getRole(userData.role),
                  status: userData.status,
                };
                //check account if disabled
                validStatus(finalUser, setUser, setRole);
              })
              //! account not exist
              .catch((err) => {
                //get status error
                const statusMsg = err.response.data.status;
                //account not found
                if (statusMsg === "NOT_FOUND") {
                  //requests body
                  const createUser = {
                    id: userFromGg.id,
                    name: userFromGg.name,
                    email: userFromGg.email,
                    password: null,
                    // role: 2,
                    status: true,
                  };
                  //!start create account
                  axios
                    .post(
                      "https://meet-production-52c7.up.railway.app/api/v1/account/post",
                      createUser
                    )
                    //!get api response with new user data
                    .then((response) => response.data.data)
                    .then((userData) => {
                      const finalUser = {
                        id: userData.id,
                        name: userData.name,
                        picture: userFromGg.img,
                        email: userData.email,
                        role: getRole(userData.role),
                        status: userData.status,
                      };
                      //check account if disabled
                      validStatus(finalUser, setUser, setRole);
                    })
                    .finally(() => setGgLoading(false))
                } else {
                  message.error(`There is an internal error: ${statusMsg}`);
                  setGgLoading(false);
                }
              });
          } else {
            setCheckMailErr(true);
          }
        })
        .catch((err) => {
          setIsErr(true);
          console.log(err);
        })
        .finally(() => {
          // setIsLoading(false)
        }),
    // error
    onError: (error) => {
      setIsErr(true);
      // setIsLoading(false)
      console.log("Login Failed:", error);
    },
  });

  const handleSignin = () => {
    // setIsLoading(true)
    loginWithGG();
  };
  const getRole = (roleId) => {
    switch (roleId) {
      case 0:
        return "admin";
      case 1:
        return "lecturer";
      case 2:
        return "student";
      default:
        return "";
    }
  };
  // Handle login by username & password
  const [loading, setLoading] = useState(false);
  const handleLoginByUsernameFinish = (data) => {
    setLoading(true);
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/v1/account/get/${data.userId}`
      )
      .then((response) => response.data.data)
      .then((userData) => {
        if (userData.password === data.password) {
          const finalUser = {
            id: userData.id,
            name: userData.name,
            picture: null,
            email: userData.email,
            role: getRole(userData.role),
            status: userData.status,
          };
          //check account if disabled
          validStatus(finalUser, setUser, setRole);
        } else {
          message.error("Invalid username or password!");
        }
      })
      .catch((err) => message.error("Invalid username or password!"))
      .finally(() => setLoading(false));
  };

  //submit antispam
  const [clickSubmit, setClickSubmit] = useState(0);
  //cooldown 3s if users click over 2 times
  setTimeout(() => {
    clickSubmit > 0 && setClickSubmit(clickSubmit - 1);
  }, 3000);
  //checker
  const handleSubmitAntispam = (data) => {
    clickSubmit === 2 && message.error("Please try again in 3 seconds");
    clickSubmit < 3 && setClickSubmit(clickSubmit + 1);
    if (clickSubmit < 2) {
      handleLoginByUsernameFinish(data);
    }
  };

  return (
    <div className="backgroundLogin">
      <Form className="loginForm" onFinish={handleSubmitAntispam}>
        <Title className="loginTitle" level={3}>
          Login Form
        </Title>
        <Form.Item
          name="userId"
          label="UserID"
          className="input"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          className="input"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            className="loginBtn"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>

        {/* signin with google */}
        <Button
          style={Object.assign(
            { width: "100%" },
            { margin: "0 0 10px 0" },
            { height: "40px" }
          )}
          loading={isLoading}
          icon={<GoogleOutlined />}
          onClick={() => handleSignin()}
        >
          Sign in with Google
        </Button>
        {/* Email notification */}
        {checkMailErr && (
          <Alert
            message="Your email doesn't have permission to sign in!"
            type="error"
            banner
          />
        )}
        {/* Error notification */}
        {isErr && (
          <Alert
            message="There is an error, please try again!"
            type="error"
            banner
          />
        )}
      </Form>
      <ul className="background">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};
