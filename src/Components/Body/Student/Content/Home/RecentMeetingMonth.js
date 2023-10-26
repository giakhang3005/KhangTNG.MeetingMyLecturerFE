import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Typography, Tabs } from "antd";
import { useState, useEffect, useContext } from "react";
import { Data } from "../../../Body";
import axios from "axios";

export const RecentMeetingMonth = () => {
  const { user } = useContext(Data);
  const [graphData, setGraphData] = useState([]);
  const [graphDataWeek , setGraphDataWeek] = useState([]);
  const [mode, setMode] = useState("1")
  const getData = () => {
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/v1/student/graph/${user.id}`
      )
      .then((response) => setGraphData(response.data.reverse()))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
  }, []);
  const { Title } = Typography;
  return (
    <div className="Chart">
      <Tabs
        style={Object.assign({ margin: "0" })}
        defaultActiveKey="1"
        onChange={(key) => setMode(key)}
        items={[
          {
            key: "1",
            label: "Recent months",
          },
          {
            key: "2",
            label: "Recent weeks",
          }
        ]}
      />
      <Title level={4} style={{margin: 0}}>Number of meetings in recent {mode === "1" ? "months" : "weeks"}</Title>
      <Bar
        className="displayGraph"
        data={{
          labels:  mode === "1" ? graphData.map((data) => data.month) : graphDataWeek.map((data) => data.month),
          datasets: [
            {
              label: "Meetings",
              data:  mode === "1" ? graphData.map((data) => data.slotCount) : graphDataWeek.map((data) => data.slotCount),
              backgroundColor: "#fa8c16",
            },
          ],
        }}
        options={{}}
      />
    </div>
  );
};
