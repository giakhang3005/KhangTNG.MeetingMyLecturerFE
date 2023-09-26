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
  //default MenuOpt
  const [menuOpt, setMenuOpt] = useState("lecturerDashboard");
  //default date = today
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedWeek, setSelectedWeek] = useState(GetWeek(selectedDate));
  const [role, setRole] = useState("lecturer");

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
              <Lecturer />
            ) : // else if role === student
            role === "student" ? (
              <>Student</>
            ) : // else if role === admin
            role === "admin" ? (
              <>Admin</>
            ) : (
              //others/no role
              <>Login</>
            )
          }
          {/* Version */}
          <p
            style={Object.assign(
              { padding: 0 },
              { margin: 0 },
              { "font-size": "9px" },
              { color: "grey" },
              {position: "sticky"},
              {bottom: "3px"},
              {transform: 'translateX(3px)'}
            )}
          >
            Version 1.0
          </p>
        </ConfigProvider>
      </Data.Provider>
    </QueryClientProvider>
  );
};
