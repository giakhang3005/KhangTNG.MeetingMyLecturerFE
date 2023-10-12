import { message } from "antd";

export const useAccountStatus = () => {
  const validStatus = (finalUser, setUser, setRole) => {
    if (finalUser.status === false) {
      message.error("Your account have been disabled");
    } else {
      setUser(finalUser);
      setRole(finalUser.role);
      const encodedUser = btoa(JSON.stringify(finalUser));
      sessionStorage.setItem("user", encodedUser);
    }
  };

  return validStatus;
};
