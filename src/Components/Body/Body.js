import { createContext, useState } from "react";
import { ConfigProvider } from "antd";
import { getCurrentDate, GetWeek } from "../../ExtendedFunction/Date";
import { Lecturer } from "./Lecturer/Lecturer";

export const Data = createContext();
export const Body = () => {
  //get user select option 
  //default MenuOpt
  const [menuOpt, setMenuOpt] = useState("createdSlot");
  //default date = today
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedWeek, setSelectedWeek] = useState(GetWeek(selectedDate))
  const [role, setRole] = useState("lecturer");

  return (
    //pass value to all component inside
    <Data.Provider
      value={{ menuOpt, setMenuOpt, selectedDate, setSelectedDate, selectedWeek, setSelectedWeek }}
    >
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#F15A25",

            // Alias Token
            colorBgContainer: "#fffff",
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
      </ConfigProvider>
    </Data.Provider>
  );
};
