import { createContext, useState } from "react";
import { ConfigProvider } from "antd";
import { useDate } from "../../Hooks/All/useDate";
import { Lecturer } from "./Lecturer/Lecturer";
import { Student } from "./Student/Student";
import { Admin } from "./Admin/Admin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from "./Login/Login";
import { message } from "antd";
import { googleLogout } from "@react-oauth/google";
import axios from "axios";

export const Data = createContext();
export const Body = (props) => {
  const user = props.user,
    setUser = props.setUser;

  const { getCurrentDate, GetWeek } = useDate();

  //!Kick user when account is disable
  //check 10 minutes
  const [currentNoti, setCurrentNoti] = useState(false);
  setTimeout(() => {
    if (user !== null && user !== undefined) {
      axios
        .get(
          `https://meet-production-52c7.up.railway.app/api/v1/account/get/${user.id}`
        )
        .then((response) => response.data.data)
        .then((fetchUser) => {
          if (!fetchUser.status) {
            googleLogout();
            setUser(null);
            setRole(null);

            //! Delete user & role in session storage
            sessionStorage.removeItem("user");
            !currentNoti && message.error("Your account have been disabled");
            setCurrentNoti(true);
          }
        })
        .catch((error) => {});
    }
  }, 1000 * 60 * 10);

  //Create new client
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  //get user select option
  //default date = today
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedWeek, setSelectedWeek] = useState(GetWeek(selectedDate));

  //! Get role in localStorage
  const startRole =
    sessionStorage.user === undefined
      ? null
      : JSON.parse(atob(sessionStorage.user)).role;
  const [role, setRole] = useState(startRole);

  //default MenuOpt
  const [menuOpt, setMenuOpt] = useState("default");

  //TODO: for backend
  const [input, setInput] = useState();

  return (
    //pass value to all component inside
    <QueryClientProvider client={client}>
      <Data.Provider
        value={{
          menuOpt,
          setMenuOpt,
          selectedDate,
          setSelectedDate,
          selectedWeek,
          setSelectedWeek,
          user,
          setUser,
          setRole,
        }}
      >
        <ConfigProvider theme={{ token: { colorPrimary: "#F15A25" } }}>
          {/* show component base on user role */}
          {
            //if role === lecturer
            role === "lecturer" ? (
              //return
              <>
                <Lecturer setMenuOpt={setMenuOpt} menuOpt={menuOpt} />
              </>
            ) : // else if role === student
            role === "student" ? (
              <Student setMenuOpt={setMenuOpt} menuOpt={menuOpt} />
            ) : // else if role === admin
            role === "admin" ? (
              <Admin setMenuOpt={setMenuOpt} menuOpt={menuOpt} />
            ) : (
              //others/no role
              <>
                <Login />
              </>
            )
          }
        </ConfigProvider>
      </Data.Provider>
    </QueryClientProvider>
  );
};
