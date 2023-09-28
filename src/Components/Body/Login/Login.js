import React, { useContext } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Data } from "../Body";

export const Login = () => {
  // User
  const { user, setUser} = useContext(Data);

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
          setUser(res.data);
        })
        .catch((err) => console.log(err)),
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
          <h3>{user.id}</h3>
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
          <img src={user.picture} />
          <Button onClick={logOut}>Log out</Button>
        </>
      ) : (
        <Button icon={<GoogleOutlined />} onClick={login}>
          Sign in with Google
        </Button>
      )}
    </div>
  );
};
