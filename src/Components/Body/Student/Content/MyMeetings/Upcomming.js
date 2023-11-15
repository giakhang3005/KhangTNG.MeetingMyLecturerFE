import { Table, Typography, Popover, Tag, Button, Row, Col } from "antd";
import {
  InfoCircleFilled,
  LeftOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useArray } from "../../../../../Hooks/All/useArray";
import { useStudentRequests } from "../../../../../Hooks/Student/useStudentRequests";
import { useState, useContext } from "react";
import { Data } from "../../../Body";
import axios from "axios";
import { React, useEffect } from "react";
import { GooglemeetLogo } from "../../../../../Hooks/All/SVG";

export function Upcomming() {
  const { Title } = Typography;
  const { user } = useContext(Data);
  const ArrayToString = useArray();
  const { Accept, Decline, Pending } = useStudentRequests();
  const [meetingInfo, setMeetingInfo] = useState({});
  const [meetingList, setMeetingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);

  //!Fetch
  const getData = () => {
    if (
      localStorage.getItem("upcommingMeeting") !== null &&
      localStorage.getItem("upcommingMeeting") !== "undefined"
    ) {
      setHideLoading(true);
      setMeetingList(JSON.parse(localStorage.getItem("upcommingMeeting")));
    } else {
      setLoading(true);
    }
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/booking/upmeeting?id=${user.id}`
      )
      .then(
        (response) => (
          setMeetingList(response.data),
          localStorage.setItem(
            "upcommingMeeting",
            JSON.stringify(response.data)
          )
        )
      )
      .catch((error) => console.error(error))
      .finally(() => (setLoading(false), setHideLoading(false)));
  };

  useEffect(() => {
    getData();
  }, []);

  //check for status & return tag
  const setStatusTag = (status) => {
    switch (status) {
      case 2:
        return <Accept />;
      case 0:
        return <Decline />;
      default:
        return <Pending />;
    }
  };

  //table variables
  const columns = [
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
          <a href={`https://${booking.slotInfo.lecturerLinkMeet}`} target="_blank">
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
            <Popover content="Click to view more booking info">
              <InfoCircleFilled
                style={Object.assign(
                  { color: "#1c62d4" },
                  { fontSize: "17px" }
                )}
                onClick={() => setMeetingInfo(booking)}
              />
            </Popover>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        UPCOMMING MEETINGS
        {/* Back button */}
        {JSON.stringify(meetingInfo) === "{}" && (
          <Button
            icon={<ReloadOutlined />}
            onClick={getData}
            loading={hideLoading}
          >
            {hideLoading ? "Checking for updates..." : "Refresh"}
          </Button>
        )}
      </Title>

      {JSON.stringify(meetingInfo) === "{}" ? (
        // Table of data
        <Table
          className="tableOfLocations"
          columns={columns}
          dataSource={meetingList}
          loading={loading}
          rowKey="id"
          key="key"
        ></Table>
      ) : (
        <>
          <Button
            icon={<LeftOutlined />}
            type="text"
            onClick={() => setMeetingInfo({})}
          >
            Back
          </Button>

          {/* Info section */}
          <Row className="requestsInfo">
            <Col xs={1}></Col>
            <Col xs={23}>
              {/* Lecturer */}
              <Row>
                <Col xs={9} md={3}>
                  <Title className="InfoText" level={5}>
                    Lecturer:
                  </Title>
                </Col>
                <Col xs={15} md={10}>
                  <Title
                    className="InfoText"
                    level={5}
                    style={{ fontWeight: "400" }}
                  >
                    {meetingInfo.slotInfo.lecturerName}
                  </Title>
                </Col>
              </Row>

              {/* Date */}
              <Row>
                <Col xs={9} md={3}>
                  <Title className="InfoText" level={5}>
                    Date:
                  </Title>
                </Col>
                <Col xs={15} md={10}>
                  <Title
                    className="InfoText"
                    level={5}
                    style={{ fontWeight: "400" }}
                  >
                    {meetingInfo.slotInfo.meetingDate}
                  </Title>
                </Col>
              </Row>

              {/* Start Time */}
              <Row>
                <Col xs={9} md={3}>
                  <Title className="InfoText" level={5}>
                    Start Time:
                  </Title>
                </Col>
                <Col xs={15} md={10}>
                  <Title
                    className="InfoText"
                    level={5}
                    style={{ fontWeight: "400" }}
                  >
                    {meetingInfo.slotInfo.startTime}
                  </Title>
                </Col>
              </Row>

              {/* End Time */}
              <Row>
                <Col xs={9} md={3}>
                  <Title className="InfoText" level={5}>
                    End Time:
                  </Title>
                </Col>
                <Col xs={15} md={10}>
                  <Title
                    className="InfoText"
                    level={5}
                    style={{ fontWeight: "400" }}
                  >
                    {meetingInfo.slotInfo.endTime}
                  </Title>
                </Col>
              </Row>

              {/* Location */}
              <Row>
                <Col xs={9} md={3}>
                  <Title className="InfoText" level={5}>
                    Location:
                  </Title>
                </Col>
                <Col xs={15} md={10}>
                  <Title
                    className="InfoText"
                    level={5}
                    style={{ fontWeight: "400" }}
                  >
                    {!meetingInfo.slotInfo.online ? (
                      <Title
                        className="InfoText id"
                        level={5}
                        style={{ fontWeight: "400" }}
                      >
                        {meetingInfo.slotInfo.locationName}
                        <br />
                        <i style={Object.assign({ fontSize: "13px" })}>
                          ({meetingInfo.slotInfo.locationAddress}){" "}
                        </i>
                      </Title>
                    ) : (
                      <a
                        href={`https://${meetingInfo.slotInfo.lecturerLinkMeet}`}
                        target="_blank"
                      >
                        <Tag
                          style={Object.assign(
                            { display: "flex" },
                            { alignItems: "center" },
                            { width: "106px" },
                            { justifyContent: "space-between" },
                            { margin: "11px 0 0 0" }
                          )}
                          icon={<GooglemeetLogo />}
                          color="geekblue"
                        >
                          Google Meet
                        </Tag>
                      </a>
                    )}
                  </Title>
                </Col>
              </Row>

              {/* Subject */}
              <Row>
                <Col xs={9} md={3}>
                  <Title className="InfoText" level={5}>
                    Subject:
                  </Title>
                </Col>
                <Col xs={15} md={10}>
                  <Title
                    className="InfoText"
                    level={5}
                    style={{ fontWeight: "400" }}
                  >
                    {meetingInfo.subjectSlot.map((subject, i) => {
                      return (
                        <Tag color="volcano" key={i}>
                          {subject.subjectCode}
                        </Tag>
                      );
                    })}
                  </Title>
                </Col>
              </Row>

              {/* Status */}
              <Row>
                <Col xs={9} md={3}>
                  <Title className="InfoText" level={5}>
                    Status:
                  </Title>
                </Col>
                <Col xs={15} md={10}>
                  <Title
                    className="InfoText"
                    level={5}
                    style={{ fontWeight: "400" }}
                  >
                    {setStatusTag(meetingInfo.status)}
                  </Title>
                </Col>
              </Row>

              {/* Note */}
              <Row>
                <Col xs={9} md={3}>
                  <Title className="InfoText" level={5}>
                    Note:
                  </Title>
                </Col>
                <Col xs={15} md={10}>
                  <Title
                    className="InfoText"
                    level={5}
                    style={Object.assign(
                      { fontWeight: "400" },
                      { padding: "0px 0 7px 0" },
                      { fontSize: "14px" }
                    )}
                  >
                    {meetingInfo.note}
                  </Title>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
