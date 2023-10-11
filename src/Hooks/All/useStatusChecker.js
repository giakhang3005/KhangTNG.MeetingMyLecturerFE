import { message } from "antd";
import { googleLogout } from "@react-oauth/google";
import axios from "axios";

export const useStatusChecker = () => {
  const statusChecking = (setUser, setRole) => {
    const thisUser = JSON.parse(atob(sessionStorage.user));
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/v1/user/get/${thisUser.userId}`
      )
      .then((response) => response.data.data)
      .then((fetchUser) => {
        if (fetchUser.status) {
          googleLogout();
          setUser(null);
          setRole(null);

          //! Delete user & role in session storage
          sessionStorage.removeItem("user");

          message.error("Your account have been disabled");
        }
      });
  };

  return statusChecking;
};
