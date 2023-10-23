import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "../../Lecturer.css";
import { Typography } from "antd";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Data } from "../../../Body";

export const RecentSlotsMonth = () => {
  const { Title } = Typography;

  const { user } = useContext(Data);
  const [graphData, setGraphData] = useState([]);
  const getData = () => {
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/lecturer/graph/${user.id}`
      )
      .then((response) => setGraphData(response.data.reverse()))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
  }, []);
  const data = [
    { month: "January", slots: 3 },
    { month: "Febuary", slots: 2 },
    { month: "March", slots: 5 },
    { month: "April", slots: 9 },
    { month: "May", slots: 0 },
    { month: "June", slots: 15 },
  ];
  return (
    <div className="Chart">
      <Title level={4}>Number of slots in recent months</Title>
      <Bar
        className="displayGraph"
        data={{
          labels: graphData.map((data) => data.month),
          datasets: [
            {
              label: "Slots",
              data: graphData.map((data) => data.slotCount),
              backgroundColor: "#fa8c16",
            },
          ],
        }}
        options={{}}
      />
    </div>
  );
};
