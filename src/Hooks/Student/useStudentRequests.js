import { Tag, message, Popover, Col, Row } from "antd";
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
        title: "Meeting Date",
        render: (booking) => {
          return <>{booking.slotInfo.meetingDate}</>;
        },
      },
      {
        key: "3",
        title: "Start Time",
        render: (booking) => {
          return <>{booking.slotInfo.startTime}</>;
        },
      },
      {
        key: "4",
        title: "End Time",
        render: (booking) => {
          return <>{booking.slotInfo.endTime}</>;
        },
      },
      {
        key: "5",
        title: "Lecturer",
        render: (booking) => (
          <Popover
            title="Other Informations"
            content={
              booking.status === 2 ? (
                <span
                  style={Object.assign(
                    { lineHeight: "30px" },
                    { minWidth: "300px" }
                  )}
                >
                  {/* Email */}
                  <Row style={{ width: "300px" }}>
                    <Col xs={7}>
                      <b>Email:</b>
                    </Col>
                    <Col xs={17}> {booking.contactInfo.lecturerEmail} </Col>
                  </Row>
                  {/* Email */}
                  <Row style={{ width: "300px" }}>
                    <Col xs={7}>
                      <b>Phone:</b>
                    </Col>
                    <Col xs={17}> {booking.contactInfo.lecturerPhone} </Col>
                  </Row>
                </span>
              ) : (
                "Request have to be accepted to view other informations"
              )
            }
          >
            <Tag>{booking.slotInfo.lecturerName}</Tag>
          </Popover>
        ),
      },
      {
        key: "6",
        title: "Subject",
        dataIndex: "subject",
      },
      {
        key: "7",
        title: "Location",
        render: (booking) => {
          return !booking.slotInfo.online ? (
            <Popover content={booking.slotInfo.locationAddress}>
              <Tag color="volcano">{booking.slotInfo.locationName}</Tag>
            </Popover>
          ) : booking.status === 2 ? (
            <a
              href={`https://${booking.slotInfo.lecturerLinkMeet}`}
              target="_blank"
            >
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
            </a>
          ) : (
            <Tag
              style={Object.assign(
                { display: "flex" },
                { alignItems: "center" },
                { width: "106px" },
                { justifyContent: "space-between" },
                { cursor: "not-allowed" }
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
