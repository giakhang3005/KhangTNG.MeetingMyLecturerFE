import { Tag, message, Popover } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { useArray } from "../All/useArray";
import {
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export const useStudentRequests = () => {
  const ArrayToString = useArray();

  //   ----------------------------------------------------------------
  //!  Tag
  const Accept = () => {
    return (
      <Tag icon={<CheckCircleOutlined />} color="green">
        <b>ACCEPTED</b>
      </Tag>
    );
  };

  const Decline = () => {
    return (
      <Tag icon={<CloseCircleOutlined />} color="red">
        <b>DECLINED</b>
      </Tag>
    );
  };

  const Pending = () => {
    return (
      <Tag icon={<SyncOutlined spin />} color="yellow">
        <b>PENDING</b>
      </Tag>
    );
  };

  //   ----------------------------------------------------------------
  //! functions
  const viewInfo = (booking, setRequestsView, setIsSelectedBooking) => {
    setIsSelectedBooking(booking);
    setRequestsView("info");
  };

  const updateBooking = (updateData, setRequestsView) => {
    message.success("Updated successfully");
    console.log(updateData);
    setRequestsView("view");
  };

  const cancelBooking = (id, setRequestsView) => {
    console.log(id);
    message.success("Deleted successfully");
    setRequestsView("view");
  };

  const tableColumn = (setRequestsView, setIsSelectedBooking) => {
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
          switch (booking.status) {
            case 0: return <Decline />;
            case 1: return <Pending />;
            case 2: return <Accept />;
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

  return {
    Accept,
    Decline,
    Pending,
    viewInfo,
    updateBooking,
    cancelBooking,
    tableColumn,
  };
};
