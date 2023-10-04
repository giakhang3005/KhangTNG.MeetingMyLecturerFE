import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Typography } from "antd";

export const RecentMeetingMonth = () => {
  const { Title } = Typography;
  const data = [
    { month: "January", meetings: 3 },
    { month: "Febuary", meetings: 2 },
    { month: "March", meetings: 5 },
    { month: "April", meetings: 9 },
    { month: "May", meetings: 7 },
    { month: "June", meetings: 15 },
  ];
  return (
    <div className="Chart">
      <Title level={4}>Number of meetings in recent months</Title>
      <Bar
        className="displayGraph"
        data={{
          labels: data.map((data) => data.month),
          datasets: [
            {
              label: "Meetings",
              data: data.map((data) => data.meetings),
              backgroundColor: "#fa8c16",
            },
          ],
        }}
        options={{}}
      />
    </div>
  );
};
