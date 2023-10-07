import { React } from "react";
import {
  DatePicker,
  Row,
  Col,
  Typography,
  message,
  Button,
  Popover,
} from "antd";
import { SwapRightOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export function PickDate(props) {
  const fromDatePicker = props.fromDatePicker,
    setFromDatePicker = props.setFromDatePicker,
    toDatePicker = props.toDatePicker,
    setToDatePicker = props.setToDatePicker,
    handleClearDate = props.handleClearDate;

  const { Text, Title } = Typography;

  const today = new dayjs().hour(0).minute(0).second(0);

  const onChangeFromDate = (date, dateString) => {
    const fromDate = date.hour(1);

    if (fromDate < today) {
      message.error(
        `Start date must begin from Today (${today.$D}/${today.$M + 1}/${
          today.$y
        })`
      );
    } else {
      setFromDatePicker(date);
      if (toDatePicker === null || fromDate > toDatePicker) {
        setToDatePicker(date.add(1, "date"));
      }
    }
  };

  const onChangeToDate = (date, dateString) => {
    const toDate = date.hour(0).minute(0).second(0);

    if (toDate < fromDatePicker) {
      message.error(
        `To date must be after 'From date' (${fromDatePicker.$D}/${
          fromDatePicker.$M + 1
        }/${fromDatePicker.$y})`
      );
    } else {
      setToDatePicker(date);
    }
  };

  return (
    <>
      {/* Title */}
      <Row>
        {/* From */}
        <Col xs={9} md={7}>
          <Title level={5} style={{ margin: "5px 0 5px 0" }}>
            From
          </Title>
        </Col>

        <Col xs={3} md={7}></Col>

        {/* To */}
        <Col xs={9} md={7}>
          <Title level={5} style={{ margin: "5px 0 5px 0" }}>
            To
          </Title>
        </Col>

        {/* Content */}
      </Row>

      <Row>
        {/* From date */}
        <Col xs={9} md={7}>
          <DatePicker
            format="DD/MM/YYYY"
            onChange={onChangeFromDate}
            value={fromDatePicker === null ? today : fromDatePicker}
          />
        </Col>

        {/* Arrow */}
        <Col
          xs={3}
          md={7}
          style={Object.assign(
            { display: "flex" },
            { justifyContent: "center" },
            { fontSize: "18px" }
          )}
        >
          <SwapRightOutlined />
        </Col>

        {/* To date */}
        <Col xs={9} md={7}>
          <DatePicker
            format="DD/MM/YYYY"
            onChange={onChangeToDate}
            value={toDatePicker === null ? today : toDatePicker}
          />
        </Col>

        <Col xs={1}></Col>

        {/* Clear button */}
        <Col xs={2}>
          <Popover content="Clear 'From date' and 'To date'">
            <Button
              onClick={handleClearDate}
              danger
              icon={<DeleteOutlined />}
              type="primary"
              style={Object.assign({ height: "100%" }, { width: "100%" })}
            ></Button>
          </Popover>
        </Col>
      </Row>
      <div style={{ height: "10px" }}></div>
    </>
  );
}
