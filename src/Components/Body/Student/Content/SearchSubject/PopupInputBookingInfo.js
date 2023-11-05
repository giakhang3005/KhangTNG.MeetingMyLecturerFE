import { React, useState, useContext } from "react";
import { Typography, Input, Button, message, Row, Col, Tag, Spin } from "antd";
import { FormOutlined, LeftOutlined } from "@ant-design/icons";
import { Data } from "../../../Body";
import axios from "axios";
import { GooglemeetLogo } from "../../../../../Hooks/All/SVG";

export function PopupInputPassword(props) {
  const isSelectedSlot = props.isSelectedSlot,
    setIsSelectedSlot = props.setIsSelectedSlot;
  const { Title } = Typography;

  const { user } = useContext(Data);

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    const passwordInput =
      isSelectedSlot.password !== null
        ? document.querySelector("input").value
        : null;

    const bookingDeal = {
      studentInfo: { studentId: user.id },
      slotInfo: {
        id: isSelectedSlot.id,
        meetingDate: isSelectedSlot.meetingDay,
        startTime: isSelectedSlot.startTime,
        endTime: isSelectedSlot.endTime,
      },
      note: note,
    };

    //!Check note
    const noteErr = note === null || (note.length < 20 && true);

    //! Check password
    const passwordErr =
      isSelectedSlot.password !== null &&
      isSelectedSlot.password !== passwordInput &&
      true;

    //! Fetch
    if (!passwordErr && !noteErr) {
      // console.log(bookingDeal);
      setLoading(true);
      axios
        .post(
          `https://meet-production-52c7.up.railway.app/api/booking`,
          bookingDeal
        )
        .then((res) => {
          if (res.data.data === "sameTimeErr") {
            message.error(res.data.message);
          } else {
            message.success(
              `Booking successfully, please wait for lecturer ${isSelectedSlot.lecturerName} to respond`
            );
            setIsSelectedSlot([]);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      passwordErr && message.error("Incorrect password");
      noteErr && message.error("Note must be at least 20 characters long");
    }
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        BOOKING
      </Title>

      {/* Back button */}
      <Button
        // disabled={isLoading}
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setIsSelectedSlot([])}
        disabled={loading}
      >
        Back
      </Button>
      <Spin spinning={loading}>
        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* LECTURER */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Lecturer:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  {isSelectedSlot.lecturerName}
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* DATE */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Date:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  {isSelectedSlot.meetingDay}
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* START */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Start Time:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  {isSelectedSlot.startTime}
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* END */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  End Time:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  {isSelectedSlot.endTime}
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* subject */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Subjects:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  {isSelectedSlot.slotSubjectDTOS.map((subj, i) => {
                    return (
                      <Tag color="volcano" key={i}>
                        {subj.subjectCode}
                      </Tag>
                    );
                  })}
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* Location */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Location:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                {!isSelectedSlot.online ? (
                  <Title
                    className="InfoText id"
                    level={5}
                    style={{ fontWeight: "400" }}
                  >
                    {isSelectedSlot.locationName}
                    <br />
                    <i style={Object.assign({ fontSize: "13px" })}>
                      ({isSelectedSlot.locationAddress})
                    </i>
                  </Title>
                ) : (
                  <Tag
                    style={Object.assign(
                      { display: "flex" },
                      { alignItems: "center" },
                      { width: "106px" },
                      { justifyContent: "space-between" },
                      { margin: "11px 0 0 0" },
                      { cursor: "not-allowed" }
                    )}
                    icon={<GooglemeetLogo />}
                    color="geekblue"
                  >
                    Google Meet
                  </Tag>
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        {isSelectedSlot.password !== null && (
          <Row className="requestsInfo">
            <Col xs={1}></Col>
            <Col xs={23}>
              {/* Password */}
              <Row>
                <Col xs={9} md={3}>
                  <Title className="InfoText ID" level={5}>
                    Passcode: <span style={{ color: "red" }}>*</span>
                  </Title>
                </Col>
                <Col xs={15} md={10}>
                  <Title
                    className="InfoText id"
                    level={5}
                    style={{ fontWeight: "400" }}
                  >
                    <Input
                      placeholder="Enter password to book"
                      className="editInput"
                    ></Input>
                  </Title>
                </Col>
              </Row>
            </Col>
          </Row>
        )}

        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* Note */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Note: <span style={{ color: "red" }}>*</span>
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={Object.assign(
                    Object.assign({ fontWeight: "400" }, { minHeight: "65px" })
                  )}
                >
                  <Input.TextArea
                    placeholder="Questions for lecturer or Introduce about yourself"
                    className="editInput"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    showCount
                  ></Input.TextArea>
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Buttons */}
        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            <Row>
              <Col xs={9} md={3}></Col>
              <Col xs={15} md={10}>
                <Title className="InfoText id" level={5}>
                  <Button
                    loading={loading}
                    type="primary"
                    icon={<FormOutlined />}
                    onClick={handleSubmit}
                  >
                    Book
                  </Button>
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </>
  );
}
