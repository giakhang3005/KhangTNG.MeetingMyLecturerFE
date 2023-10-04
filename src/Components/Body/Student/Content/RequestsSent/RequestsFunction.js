import { Typography, Table, message, Popover } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { Accept, Decline, Pending } from "./RequestStatusTag";
import { ArrayToString } from "../../../../../ExtendedFunction/ArrayToString";

export const viewInfo = (booking, setRequestsView, setIsSelectedBooking) => {
  setIsSelectedBooking(booking);
  setRequestsView("info");
};

export const updateBooking = (updateData, setRequestsView) => {
  message.success("Updated successfully");
  console.log(updateData);
  setRequestsView("view");
};

export const cancelBooking = (id, setRequestsView) => {
  console.log(id);
  message.success("Deleted successfully");
  setRequestsView("view");
};


export const tableColumn = (setRequestsView, setIsSelectedBooking) => {
  return [
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
      render: (booking) => {
        return ArrayToString(booking.subject);
      },
    },
    // {
    //   key: "7",
    //   title: "Note",
    //   dataIndex: "note",
    // },
    {
      key: "7",
      title: "Status",
      render: (booking) => {
        switch (booking.status.toLowerCase()) {
          case "accept":
            return <Accept />;
          case "decline":
            return <Decline />;
          default:
            return <Pending />;
        }
      },
    },
    {
      key: "9",
      title: "",
      render: (booking) => {
        return (
          <>
            {/* <EditOutlined onClick={() => editBooking(booking)} />
                <DeleteOutlined
                  className="locationDeleteBtn"
                  onClick={() => deleteBooking(booking)}
                /> */}
            <Popover content="Click to view more booking info">
              <InfoCircleFilled
                style={Object.assign(
                  { color: "#1c62d4" },
                  { fontSize: "17px" }
                )}
                onClick={() =>
                  viewInfo(booking, setRequestsView, setIsSelectedBooking)
                }
              />
            </Popover>
          </>
        );
      },
    },
  ];
};
