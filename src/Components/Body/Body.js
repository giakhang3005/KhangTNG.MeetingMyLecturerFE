import { createContext, useState } from "react";
import { ConfigProvider } from "antd";
import { getCurrentDate, GetWeek } from "../../ExtendedFunction/Date";
import { Lecturer } from "./Lecturer/Lecturer";
import { Student } from "./Student/Student";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Login} from "./Login/Login";

export const Data = createContext();
export const Body = (props) => {
  const user = props.user,
  setUser = props.setUser;
  //Create new client
  const client = new QueryClient();

  //get user select option
  //default date = today
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedWeek, setSelectedWeek] = useState(GetWeek(selectedDate));

  //! Get role in localStorage 
  const startRole = sessionStorage.user === undefined ? null : JSON.parse(atob(sessionStorage.user)).role;
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
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#F15A25",
            },
          }}
        >
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
              <>Admin</>
            ) : (
              //others/no role
              <>
                <input
                  onChange={(event) => setInput(event.target.value)}
                />
                <button onClick={() => setRole(input)}>Add role</button>
                <br />
                lecturer, student, admin
                <Login />
              </>
            )
          }
        </ConfigProvider>
      </Data.Provider>
    </QueryClientProvider>
  );
};
