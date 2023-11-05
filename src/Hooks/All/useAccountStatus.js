export const useAccountStatus = () => {
  const validStatus = (finalUser, setUser, setRole, setDisableAccount) => {
    if (finalUser.status === false) {
      setDisableAccount(true);
    } else {
      setUser(finalUser);
      setRole(finalUser.role);
      const encodeInfo = {
        id: finalUser.id,
        picture: finalUser.picture,
        email: finalUser.email,
        role: finalUser.role,
        status: finalUser.status,
      };
      const saveToSession = {
        name: finalUser.name,
        info: btoa(JSON.stringify(encodeInfo))
      }
      sessionStorage.setItem("user", JSON.stringify(saveToSession));
    }
  };

  return validStatus;
};
