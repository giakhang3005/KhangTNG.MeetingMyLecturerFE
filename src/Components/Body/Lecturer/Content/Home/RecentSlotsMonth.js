import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "../../Lecturer.css";
import { Typography, Tabs, Row, Col, Menu } from "antd";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Data } from "../../../Body";

export const RecentSlotsMonth = () => {
  const { Title } = Typography;

  const { user } = useContext(Data);
  const [graphData, setGraphData] = useState([]);
  const [graphDataWeek, setGraphDataWeek] = useState([]);
  const [mode, setMode] = useState("1");
  const getData = () => {
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/lecturer/graph/${user.id}`
      )
      .then((response) => setGraphData(response.data.reverse()))
      .catch((error) => console.error(error));
  };
  const getDataWeek = () => {
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/lecturer/graph/week/${user.id}`
      )
      .then((response) => setGraphDataWeek(response.data.reverse()))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
    getDataWeek();
  }, []);

  //Item for menu
  const menuItems = [
    { label: "Rencent Months", key: "1" },
    { label: "Recent Weeks", key: "2" },
  ];
  return (
    <Row>
      <Col xs={20}>
        <div className="Chart">
          <Title level={4} style={{ margin: "20px 0 0 0" }}>
            Number of slots in recent {mode === "1" ? "months" : "weeks"}
          </Title>
          <Bar
            className="displayGraph"
            data={{
              labels:
                mode === "1"
                  ? graphData.map((data) => data.month)
                  : graphDataWeek.map((data) => data.month),
              datasets: [
                {
                  label: "Slots",
                  data:
                    mode === "1"
                      ? graphData.map((data) => data.slotCount)
                      : graphDataWeek.map((data) => data.slotCount),
                  backgroundColor: "#fa8c16",
                },
              ],
            }}
            options={{}}
          />
        </div>
      </Col>
      <Col xs={4}>
        <Menu
          style={{margin: '15px 0 0 0'}}
          mode="inline"
          items={menuItems}
          defaultSelectedKeys="1"
          selectedKeys={mode}
          onClick={(selectedOpt) => {
            setMode(selectedOpt.key);
          }}
        />
      </Col>
    </Row>
  );
};
