import React, { useContext, useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Button, Alert } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Data } from "../Body";

export const Login = () => {
  // User
  const { user, setUser } = useContext(Data);
  const [checkMailErr, setCheckMailErr] = useState(false)

  //   Email check
  const fptEmail = "@fpt.edu.vn",
    feEmail = "@fe.edu.vn";

  const login = useGoogleLogin({
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
            setCheckMailErr(false)
            setUser(res.data);
          }  else {
            setCheckMailErr(true)
          }
          //! call database, if database does not exist -> add data to database (default role: student)
          //! If user exists, get role
          //! Save to local storage
        })
        .catch((err) => console.log(err))
        .finally(() => {}),
    // error
    onError: (error) => console.log("Login Failed:", error),
  });

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <div>
      {user !== null ? (
        <>
          <h5>{user.id}</h5>
          <h5>{user.name}</h5>
          <h5>{user.email}</h5>
          <img src={user.picture} />
          <Button onClick={logOut}>Log out</Button>
        </>
      ) : (
        <>
          <Button icon={<GoogleOutlined />} onClick={login}>
            Sign in with Google
          </Button>
          {checkMailErr && <Alert message="Your email doesn't have permission to sign in!" type="error" banner />}
        </>
      )}
    </div>
  );
};
