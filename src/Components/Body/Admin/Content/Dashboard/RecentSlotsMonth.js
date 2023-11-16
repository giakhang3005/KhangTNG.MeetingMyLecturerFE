import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Spin, Typography, DatePicker, Button, message } from "antd";
import { SwapRightOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export const RecentSlotsMonth = () => {
  const { Title } = Typography;
  // const meetings = [
  //   { month: "January", meetings: 3, users: 10 },
  //   { month: "Febuary", meetings: 2, users: 12 },
  //   { month: "March", meetings: 5, users: 20 },
  //   { month: "April", meetings: 9, users: 50 },
  //   { month: "May", meetings: 0, users: 60 },
  //   { month: "June", meetings: 15, users: 70 },
  // ];

  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = () => {
    setLoading(true);
    axios
      .get(
        "https://meet-production-52c7.up.railway.app/api/dashboard/admin/graph/week"
      )
      .then((response) => response.data.reverse())
      .then((data) => {
        setMeetings(data);
        getFirstLastDateOfData(data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  //search date handler
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const getFirstLastDateOfData = (data) => {
    const firstDate = data[0].month.slice(0, 10).split("/");
    const lastDate = data[data.length - 1].month.slice(13, 23).split("/");

    setStartDate(
      dayjs()
        .date(firstDate[0])
        .month(firstDate[1] - 1)
        .year(firstDate[2])
    );
    setEndDate(
      dayjs()
        .date(lastDate[0])
        .month(lastDate[1] - 1)
        .year(lastDate[2])
    );
  };

  const handleStartDateChange = (newDate) => {
    if (newDate >= endDate) {
      message.error("Start date must be before End date");
    } else {
      setStartDate(newDate);
    }
  };

  const handleEndDateChange = (newDate) => {
    if (newDate <= startDate) {
      message.error("End date must be after Start date");
    } else {
      setEndDate(newDate);
    }
  };

  const handleSearchDate = () => {
    const startDateString = `${
      startDate.date() < 10 ? `0${startDate.date()}` : startDate.date()
    }/${
      startDate.month() + 1 < 10
        ? `0${startDate.month() + 1}`
        : startDate.month() + 1
    }/${startDate.year()}`;

    const endDateString = `${
      endDate.date() < 10 ? `0${endDate.date()}` : endDate.date()
    }/${
      endDate.month() + 1 < 10 ? `0${endDate.month() + 1}` : endDate.month() + 1
    }/${endDate.year()}`;

    setLoading(true);
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/dashboard/admin/graph/week?startDay=${startDateString}&endDay=${endDateString}`
      )
      .then((response) => response.data.reverse())
      .then((data) => {
        setMeetings(data);
        getFirstLastDateOfData(data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="Chart">
      <Title level={3}>Statistic Graph</Title>
      <span>
        <DatePicker
          allowClear={false}
          disabled={loading}
          format="DD/MM/YYYY"
          value={startDate}
          onChange={(newDate) => handleStartDateChange(newDate)}
        />
        <SwapRightOutlined style={{ margin: "0 8px 0 8px" }} />{" "}
        <DatePicker
          allowClear={false}
          disabled={loading}
          format="DD/MM/YYYY"
          value={endDate}
          onChange={(newDate) => handleEndDateChange(newDate)}
        />
        <Button
          disabled={loading}
          style={{ margin: "0 0 0 8px" }}
          icon={<SearchOutlined />}
          type="primary"
          onClick={handleSearchDate}
        ></Button>
      </span>
      <Spin spinning={loading} style={{ margin: "60px 0 0 0" }}>
        <Line
          className="displayGraph"
          style={{ padding: "8px 1% 1% 0" }}
          data={{
            labels: meetings.map((data) => data.month),
            datasets: [
              {
                label: "Slots",
                data: meetings.map((data) => data.slotCount),
                borderColor: "#fc784c",
                backgroundColor: "#fc784c",
              },
              {
                label: "Meetings",
                data: meetings.map((data) => data.meetingCount),
                borderColor: "#73C5C5",
                backgroundColor: "#73C5C5",
              },
              {
                label: "Total Hours",
                data: meetings.map((data) => {
                  if (data.totalMeetingTime !== null) {
                    const meetingTime = data.totalMeetingTime.split(":"),
                      hours = parseInt(meetingTime[0]),
                      minutes = parseInt(meetingTime[1]),
                      seconds = parseInt(meetingTime[2]),
                      totalTime = hours + minutes / 60 + seconds / (60 * 60);
                    return totalTime;
                  } else {
                    return 0;
                  }
                }),
                borderColor: "#7CC674",
                backgroundColor: "#7CC674",
              },
            ],
          }}
          options={{}}
        />
      </Spin>
    </div>
  );
};
