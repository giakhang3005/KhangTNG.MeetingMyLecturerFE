import { Button, Typography, Table, message, Popover } from "antd";
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
      title: "Subject",
      dataIndex: "subject",
    },
    {
      key: "7",
      title: "This slot Bookers",
      render: (booking) => {
        return (
          <>
            <Popover
              title="Students also book this slot"
              content={
                <ol>
                  {booking.alsoBookThisSlot.name.map((studentName) => {
                    return <li>{studentName}</li>;
                  })}
                </ol>
              }
            >
              {booking.alsoBookThisSlot.amount} (Hover to view)
            </Popover>
          </>
        );
      },
    },
    {
      key: "8",
      title: "Note",
      dataIndex: "note",
    },
    {
      key: "9",
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
    //TODO: For Backend
    console.log(booking)

    //! Place API here

    message.success(`Accepted ${booking.username}'s Booking`);
  };

  //handle delete click
  const declineBooking = (booking) => {
    //! Place API here

    message.error(`Declined ${booking.username}'s Booking`);
  };

  //test data
  //! Fetch API here -> BookingList
  const BookingList = [
    {
      id: 1,
      username: "Truong Nguyen Gia Khang (K17 HCM)",
      date: "01/10/2023",
      startTime: "13:30",
      endTime: "15:00",
      subject: "ACC101",
      alsoBookThisSlot: {
        amount: 2,
        name: ["Tran Cong Lam (K17 HCM)", "Truong Nguyen Gia Khang (K17 HCM)"],
      },
    },
  ];

  return (
    <>
      {console.log("INPUT BOOKING")}
      {console.log(BookingList)}
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
