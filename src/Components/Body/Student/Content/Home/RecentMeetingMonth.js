import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Typography } from "antd";
import { useState, useEffect, useContext } from "react";
import { Data } from "../../../Body";
import axios from "axios";

export const RecentMeetingMonth = () => {
  const { user } = useContext(Data);
  const [graphData, setGraphData] = useState([]);
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
      <Title level={4}>Number of meetings in recent months</Title>
      <Bar
        className="displayGraph"
        data={{
          labels: graphData.map((data) => data.month),
          datasets: [
            {
              label: "Meetings",
              data: graphData.map((data) => data.meetings),
              backgroundColor: "#fa8c16",
            },
          ],
        }}
        options={{}}
      />
    </div>
  );
};
