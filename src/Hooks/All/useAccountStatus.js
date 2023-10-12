import { message } from "antd";

export const useAccountStatus = () => {
  const validStatus = (finalUser, setUser, setRole, setDisableAccount) => {
    if (finalUser.status === false) {
      setDisableAccount(true)
    } else {
      setUser(finalUser);
      setRole(finalUser.role);
      const encodedUser = btoa(JSON.stringify(finalUser));
      sessionStorage.setItem("user", encodedUser);
    }
  };

  return validStatus;
};
