import { Tag, message, Popover } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { useArray } from "../All/useArray";
import {
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { GooglemeetLogo } from "../All/SVG";

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

  const tableColumn = (setRequestsView, setIsSelectedBooking) => {
    return [
      // {
      //   key: "1",
      //   title: "ID",
      //   dataIndex: "id",
      // },
      {
        key: "2",
        title: "Date",
        render: (booking) => {
          return <>{booking.slotInfo.meetingDate}</>;
        },
      },
      {
        key: "3",
        title: "Start",
        render: (booking) => {
          return <>{booking.slotInfo.startTime}</>;
        },
      },
      {
        key: "4",
        title: "End",
        render: (booking) => {
          return <>{booking.slotInfo.endTime}</>;
        },
      },
      {
        key: "5",
        title: "Lecturer",
        render: (booking) => {
          return <>{booking.slotInfo.lecturerName}</>;
        },
      },
      {
        key: "6",
        title: "Subject",
        render: (booking) => {
          let subjectList = [];
          booking.subjectSlot.map((subject) => {
            subjectList.push(subject.subjectCode);
          });

          return ArrayToString(subjectList);
        },
      },
      {
        key: "7",
        title: "Location",
        render: (booking) => {
          return !booking.slotInfo.online ? (
            <Popover content={booking.slotInfo.locationAddress}>
              <Tag color="volcano">{booking.slotInfo.locationName}</Tag>
            </Popover>
          ) : (
            <Tag
              style={Object.assign(
                { display: "flex" },
                { alignItems: "center" },
                { width: "106px" },
                { justifyContent: "space-between" }
              )}
              icon={<GooglemeetLogo />}
              color="geekblue"
            >
              Google Meet
            </Tag>
          );
        },
      },
      {
        key: "8",
        title: "Status",
        render: (booking) => {
          switch (booking.status) {
            case 0:
              return <Decline />;
            case 1:
              return <Pending />;
            case 2:
              return <Accept />;
          }
        },
      },
      {
        key: "9",
        title: "",
        render: (booking) => {
          return (
            <>
              <Popover
                content="Click to view more booking info"
                placement="left"
              >
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

  const FilterList = (requestsList, status, setList) => {
    const list = requestsList.filter((request) => {
      return request.status === status && request;
    });
    setList(list);
  };

  return {
    Accept,
    Decline,
    Pending,
    viewInfo,
    tableColumn,
    FilterList,
  };
};
