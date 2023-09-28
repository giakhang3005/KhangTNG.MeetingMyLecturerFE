import { createContext, useState } from "react";
import { ConfigProvider } from "antd";
import { getCurrentDate, GetWeek } from "../../ExtendedFunction/Date";
import { Lecturer } from "./Lecturer/Lecturer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Data = createContext();
export const Body = () => {
  //Create new client
  const client = new QueryClient();
  //get user select option
  //default date = today
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedWeek, setSelectedWeek] = useState(GetWeek(selectedDate));
  const [role, setRole] = useState("lecturer");
  //default MenuOpt
  const [menuOpt, setMenuOpt] = useState(
    role === "lecturer" ? "lecturerDashboard" : ""
  );

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
                <Lecturer />
              </>
            ) : // else if role === student
            role === "student" ? (
              <>Student</>
            ) : // else if role === admin
            role === "admin" ? (
              <>Admin</>
            ) : (
              //others/no role
              <>
                {/* <>Login</> */}
                <input /> <button>Add role</button>
              </>
            )
          }
        </ConfigProvider>
      </Data.Provider>
    </QueryClientProvider>
  );
};
