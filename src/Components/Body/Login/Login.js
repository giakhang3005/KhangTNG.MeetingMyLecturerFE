import React, { useContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Button,
  Alert,
  Form,
  Input,
  Typography,
  message,
  Row,
  Col,
} from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Data } from "../Body";
import "./LoginStyle.css";
import { useAccountStatus } from "../../../Hooks/All/useAccountStatus";

export const Login = () => {
  const { Title } = Typography;
  // User -> user.name, email, picture, id, role...
  const { user, setUser, setRole } = useContext(Data);
  const [isErr, setIsErr] = useState(false);
  const validStatus = useAccountStatus();

  // Email check
  const fptEmail = "@fpt.edu.vn";
  const [checkMailErr, setCheckMailErr] = useState(false);
  const [disableAccount, setDisableAccount] = useState(false);

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
          //! validate @fpt.edu.vn
          if (res.data.email?.includes(fptEmail)) {
            setCheckMailErr(false);
            const userFromGg = res.data;
            //! call database, if database does not exist -> add data to database (default role: student)
            setGgLoading(true);
            axios
              .get(
                `https://meet-production-52c7.up.railway.app/api/v1/account/get/${userFromGg.id}`
              )
              //! account exist
              .then((response) => {
                if (response.data.status === "NOT_FOUND") {
                } else {
                  const userData = response.data.data;
                  const finalUser = {
                    id: userData.id,
                    name: userData.name,
                    picture: userFromGg.picture,
                    email: userData.email,
                    role: getRole(userData.role),
                    status: userData.status,
                  };
                  //check account if disabled
                  validStatus(finalUser, setUser, setRole, setDisableAccount);
                  setGgLoading(false);
                }
              })
              //! account not exist
              .catch((err) => {
                //get status error
                const statusMsg = err.response.data.status;
                //account not found
                if (statusMsg === "NOT_FOUND") {
                  //requests body
                  const createUser = {
                    name: userFromGg.name,
                    email: userFromGg.email,
                    password: "",
                    role: -1,
                    status: true,
                    id: userFromGg.id,
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
                      console.log(userData);
                      const finalUser = {
                        id: userData.id,
                        name: userData.name,
                        picture: userFromGg.picture,
                        email: userData.email,
                        role: getRole(userData.role),
                        status: userData.status,
                      };
                      //check account if disabled
                      validStatus(
                        finalUser,
                        setUser,
                        setRole,
                        setDisableAccount
                      );
                      setGgLoading(false);
                    })
                    .catch((err) => {
                      console.log(err);
                      message.error(`There is an internal error: ${statusMsg}`);
                    })
                    .finally(() => setGgLoading(false));
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
          validStatus(finalUser, setUser, setRole, setDisableAccount);
        } else {
          message.error("Invalid username or password!");
        }
      })
      .catch((err) =>{ console.log(err)})
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
        <Row>
          <Col xs={7}>
            <Title
              level={5}
              style={Object.assign(
                { margin: "0 0 32px 0" },
                { padding: 0 },
                { textAlign: "left" }
              )}
            >
              UserID<span style={{ color: "red" }}> *</span>
            </Title>
          </Col>
          <Col xs={1}></Col>
          <Col xs={16}>
            <Form.Item
              name="userId"
              style={Object.assign({ margin: 0 }, { padding: 0 })}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={7}>
            <Title
              level={5}
              style={Object.assign(
                { margin: "0 0 32px 0" },
                { padding: 0 },
                { textAlign: "left" }
              )}
            >
              Password<span style={{ color: "red" }}> *</span>
            </Title>
          </Col>
          <Col xs={1}></Col>
          <Col xs={16}>
            <Form.Item
              name="password"
              style={Object.assign({ margin: 0 }, { padding: 0 })}
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
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
          loading={ggLoading}
          icon={<GoogleOutlined />}
          onClick={() => handleSignin()}
        >
          Sign in with FPT Email
        </Button>
        {/* Email notification */}
        {checkMailErr && (
          <>
            <Alert
              message="Your account doesn't have permission to sign in!"
              type="error"
              banner
            />
            {() => setIsErr(false)}
            {() => setDisableAccount(false)}
          </>
        )}
        {/* Error notification */}
        {isErr && (
          <>
            <Alert
              message="There is an error, please try again!"
              type="error"
              banner
            />
            {() => setCheckMailErr(false)}
            {() => setDisableAccount(false)}
          </>
        )}
        {disableAccount && (
          <>
            <Alert
              message="Your account have been disabled!"
              type="error"
              banner
            />
            {() => setCheckMailErr(false)}
            {() => setIsErr(false)}
          </>
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
