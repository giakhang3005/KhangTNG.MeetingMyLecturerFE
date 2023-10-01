import { Button, Table, message, Popover, Alert } from "antd";
import { LockFilled, UnlockFilled } from "@ant-design/icons";

//Handle success -> Book -> export for popup input password
export const BookingSuccess = (booking) => {
  //TODO: For Backend
  //! Place API here

  message.success(`Requets sent to ${booking.lecturer}`);
  message.info(
    `Slot Info: ${booking.date} ${booking.startTime} - ${booking.endTime}`
  );
};

export const ResultDisplay = (props) => {
  const setSlotView = props.setSlotView,
    setIsSelectedSlot = props.setIsSelectedSlot,
    isSearchingSubject = props.isSearchingSubject;

  //table variables
  const columns = [
    {
      key: "1",
      title: "ID",
      //location.id
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Lecturer",
      dataIndex: "lecturer",
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
      title: "",
      render: (booking) => {
        return (
          <>
            {/* Slot does not have password */}
            {booking.password === null || booking.password === "" ? (
              <Popover content="Click to send a booking request!">
                <UnlockFilled
                  style={Object.assign(
                    { color: "green" },
                    { fontSize: "22px" },
                    { margin: "0 7px 0 0" }
                  )}
                  onClick={() => Book(booking)}
                />
              </Popover>
            ) : (
              // Slot have password
              <Popover content="This slot have a password, Click to enter password!">
                <LockFilled
                  style={Object.assign(
                    { color: "red" },
                    { fontSize: "22px" },
                    { margin: "0 7px 0 0" }
                  )}
                  onClick={() => Book(booking)}
                />
              </Popover>
            )}
          </>
        );
      },
    },
  ];

  //handle book action
  const Book = (booking) => {
    //!fetch...... -> return true/false (1)
    const bookAldreadyID = 3;
    //check if user booked aldredy or not
    //if (1) return true -> show aldready booked message
    if (booking.id === bookAldreadyID) {
      message.error(
        "You have booked this slot aldready, please check the 'Requests sent' category to view booking status!"
      );
    } else {
      setIsSelectedSlot(booking);
    }
  };

  //test data (ACC101)
  //! Fetch API here -> BookingList by Subject ID
  const BookingList = [];

  //fetch...... {isSearchingSubject}
  //after fetch: (demo)
  if (isSearchingSubject === "SWP391") {
    BookingList.push({
      id: 1,
      slotId: 'b',
      lecturer: "Test có pass",
      date: "01/10/2023",
      startTime: "13:30",
      endTime: "15:00",
      subject: "SWP391",
      password: "abc",
    });
    BookingList.push({
      id: 2,
      slotId: 'a',
      lecturer: "Test không có pass",
      date: "01/10/2023",
      startTime: "16:30",
      endTime: "17:00",
      subject: "SWP391",
      password: null,
    });
    BookingList.push({
      id: 3,
      slotId: 'c',
      lecturer: "test đã book",
      date: "01/10/2023",
      startTime: "16:30",
      endTime: "17:00",
      subject: "SWP391",
      password: null,
    });
  }
  if (isSearchingSubject === "SWT301") {
    BookingList.push({
      id: 1,
      slotId: 'c',
      lecturer: "Truong Nguyen Gia Khang (K17 HCM)",
      date: "01/10/2023",
      startTime: "13:30",
      endTime: "15:00",
      subject: "SWT301",
      password: "abc",
    });
    BookingList.push({
      id: 2,
      slotId: 'c',
      lecturer: "Tran Cong Lam (K17 HCM)",
      date: "01/10/2023",
      startTime: "16:30",
      endTime: "17:00",
      subject: "SWT301",
      password: null,
    });
  }

  return (
    <>
      {isSearchingSubject !== "" && (
        <Alert
          message={`Found ${BookingList.length} slots for subject ${isSearchingSubject}`}
          type="info"
          showIcon
        />
      )}
      {/* Table of result */}
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={BookingList}
        // loading={isLoading}
        rowKey="id"
        key="key"
      ></Table>
    </>
  );
};
