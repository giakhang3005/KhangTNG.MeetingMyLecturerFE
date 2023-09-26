import { Button, Typography, Table, message } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

export const LecturerRequests = () => {
  const { Title } = Typography;

  //fetching data
  //   const {
  //     data: SlotList, //assign name for the data
  //     isLoading,
  //     isError,
  //     refetch,
  //   } = useQuery(["locations"], () => {
  //     return fetch("").then((res) => res.json()); //fetching and turn it into json
  //   });

  const columns = [
    {
      key: "1",
      title: "ID",
      //location.id
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Booker Name",
      dataIndex: "username",
    },
    {
      key: "3",
      title: "Date",
      dataIndex: "date",
    },
    {
      key: "4",
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      key: "5",
      title: "End Time",
      dataIndex: "endTime",
    },
    {
      key: "6",
      title: "",
      render: (booking) => {
        return (
          <>
            <CheckCircleFilled
              style={Object.assign(
                { color: "green" },
                { fontSize: "22px" },
                { margin: "0 7px 0 0" }
              )}
              onClick={() => acceptBooking(booking)}
            />
            <CloseCircleFilled
              style={Object.assign({ color: "red" }, { fontSize: "22px" })}
              onClick={() => declineBooking(booking)}
            />
          </>
        );
      },
    },
  ];

  //handle edit slot
  const acceptBooking = (booking) => {
    //! Place API here

    message.success(`Accepted ${booking.username}'s Booking`);
  };

  //handle delete click
  const declineBooking = (booking) => {
    //! Place API here

    message.error(`Declined ${booking.username}'s Booking`);
  };

  //test data
  const BookingList = [
    {
      id: 1,
      username: "Truong Nguyen Gia Khang (K17 HCM)",
      date: "01/10/2023",
      startTime: "13:30",
      endTime: "15:00",
    },
  ];

  return (
    <>
      <Title className="sectionTitle" level={3}>
        BOOKING REQUESTS
      </Title>

      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={BookingList}
        // loading={isLoading}
        rowKey="id"
      ></Table>
    </>
  );
};