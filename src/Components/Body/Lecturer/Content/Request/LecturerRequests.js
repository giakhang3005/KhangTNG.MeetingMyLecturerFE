import { Button, Typography, Table, message, Popover, Tag } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useArray } from "../../../../../Hooks/All/useArray";
import { useState, useEffect, useContext } from "react";
import { Data } from "../../../Body";
import axios from "axios";

export const LecturerRequests = () => {
  const { Title } = Typography;
  const ArrayToString = useArray();
  const { user } = useContext(Data);

  const [numOfRequests, setNumOfRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  const getNumberOfRequests = () => {
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/booking/count/${user.id}`
      )
      .then((response) => setNumOfRequests(response.data.bookingCount))
      .catch((error) => console.error(error));
  };

  const [BookingList, setBookingList] = useState([]);
  const getData = () => {
    setLoading(true);
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/booking/pending/${user.id}`
      )
      .then((response) => setBookingList(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
    getNumberOfRequests();
  }, []);

  const columns = [
    // {
    //   key: "1",
    //   title: "ID",
    //   //location.id
    //   dataIndex: "id",
    // },
    {
      key: "2",
      title: "Booker Name",
      render: (booking) => {
        return booking.studentInfo.studentName;
      },
    },
    {
      key: "3",
      title: "Date",
      render: (booking) => {
        return booking.slotInfo.meetingDate;
      },
    },
    {
      key: "4",
      title: "Start Time",
      render: (booking) => {
        return booking.slotInfo.startTime;
      },
    },
    {
      key: "5",
      title: "End Time",
      render: (booking) => {
        return booking.slotInfo.endTime;
      },
    },
    {
      key: "6",
      title: "Subject",
      render: (booking) => {
        return (
          <Popover
            content={booking.subjectSlot.map((subj) => {
              return <Tag color="volcano">{subj.subjectCode}</Tag>;
            })}
          >
            <Tag color="volcano">{booking.subjectSlot.length} Subjects</Tag>
          </Popover>
        );
      },
    },
    {
      key: "7",
      title: "Location",
      render: (booking) => {
        return (
          <Popover content={booking.slotInfo.locationAddress}>
            {booking.slotInfo.locationName}
          </Popover>
        );
      },
    },
    // {
    //   key: "7",
    //   title: "This slot Bookers",
    //   render: (booking) => {
    //     return (
    //       <>
    //         <Popover
    //           title="Students also book this slot"
    //           content={
    //             <ol>
    //               {booking.alsoBookThisSlot.name.map((studentName) => {
    //                 return <li key={studentName}>{studentName}</li>;
    //               })}
    //             </ol>
    //           }
    //         >
    //           {booking.alsoBookThisSlot.amount} (Hover to view)
    //         </Popover>
    //       </>
    //     );
    //   },
    // },
    {
      key: "9",
      title: "Note",
      dataIndex: "note",
    },
    {
      key: "10",
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
    const result = {
      id: booking.id,
      slotInfo: {
        id: booking.slotInfo.id,
      },
      status: 2,
    };
    
    setLoading(true)
    axios.put(`https://meet-production-52c7.up.railway.app/api/booking/status/${result.id}`, result)
    .then((response) => (message.success(`Accepted ${booking.studentInfo.studentName}'s Booking`), getData()))
    .catch((error) => (console.error(error)))
    .finally(() => setLoading(false));
  };

  //handle delete click
  const declineBooking = (booking) => {
    const result = {
      id: booking.id,
      slotInfo: {
        id: booking.slotInfo.id,
      },
      status: 0,
    };
    
    setLoading(true)
    axios.put(`https://meet-production-52c7.up.railway.app/api/booking/status/${result.id}`, result)
    .then((response) => (message.success(`Accepted ${booking.studentInfo.studentName}'s Booking`), getData()))
    .catch((error) => (console.error(error)))
    .finally(() => setLoading(false));
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        BOOKING REQUESTS ({numOfRequests})
      </Title>

      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={BookingList}
        loading={loading}
        rowKey="id"
        key="key"
      ></Table>
    </>
  );
};
