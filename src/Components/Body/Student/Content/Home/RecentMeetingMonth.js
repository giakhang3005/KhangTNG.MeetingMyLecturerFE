import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Typography } from "antd";

export const RecentMeetingMonth = () => {
  const { Title } = Typography;
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
      <Title level={4}>Number of meetings in recent months</Title>
      <Bar
        className="displayGraph"
        data={{
          labels: data.map((data) => data.month),
          datasets: [
            {
              label: "Slots",
              data: data.map((data) => data.slots),
              backgroundColor: "#FFC77D",
            },
          ],
        }}
        options={{}}
      />
    </div>
  );
};
