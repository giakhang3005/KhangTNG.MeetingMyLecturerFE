import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Typography } from "antd";

export const RecentSlotsMonth = () => {
  const { Title } = Typography;
  const meetings = [
    { month: "January", meetings: 3, users: 10 },
    { month: "Febuary", meetings: 2, users: 12 },
    { month: "March", meetings: 5, users: 20 },
    { month: "April", meetings: 9, users: 50 },
    { month: "May", meetings: 0, users: 60 },
    { month: "June", meetings: 15, users: 70 },
  ];
  
  return (
    <div className="Chart">
      <Title level={4}>Number of slots & users in recent months</Title>
      <Bar
        className="displayGraph"
        data={{
          labels: meetings.map((data) => data.month),
          datasets: [
            {
              label: "Meetings",
              data: meetings.map((data) => data.meetings),
              backgroundColor: "#fa541c",
            },
            {
              label: "Users",
              data: meetings.map((data) => data.users),
              backgroundColor: "#fa8c16",
            },
          ],
        }}
        options={{}}
      />
    </div>
  );
};
