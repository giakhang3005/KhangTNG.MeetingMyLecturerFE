import { createContext, useState } from "react";
import { Layout, ConfigProvider, Col, Row } from "antd";
import { LecturerSider } from "./Lecturer/LecturerSider";
import { LecturerContent } from "./Lecturer/LecturerContent";
import {getCurrentDate} from "../../ExtendedFunction/getCurrentDate"

export const Data = createContext();
export const Body = () => {
  //get user select option 
  const[menuOpt, setMenuOpt] = useState('createdSlot');
  const[selectedDate, setSelectedDate] = useState(getCurrentDate());

  return (
    //pass value to all component inside
    <Data.Provider value={{menuOpt, setMenuOpt, selectedDate, setSelectedDate}}>
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
        <Row>
          <Col xs={24} sm={10} md={7} xl={5}>
            <LecturerSider />
          </Col>
          <Col xs={24} sm={14} md={17} xl={19}>
            <LecturerContent />
          </Col>
        </Row>
      </ConfigProvider>
    </Data.Provider>
  );
};
