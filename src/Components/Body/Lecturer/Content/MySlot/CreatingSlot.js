import {
  Select,
  Form,
  Input,
  Button,
  Typography,
  message,
  TimePicker,
  DatePicker,
  Radio,
  Spin,
} from "antd";
import "../../Lecturer.css";
import dayjs from "dayjs";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Data } from "../../../Body";

export const CreatingSlot = (props) => {
  const { Option } = Select;
  const { Title } = Typography;

  const setCreatedSlotView = props.setCreatedSlotView;
  const { user } = useContext(Data);

  //check mode
  const [isAssignMode, setIsAssignMode] = useState(false);

  //handle cancel
  const handleCancel = () => {
    message.error("Canceled create slot");
    setCreatedSlotView("");
  };

  //handle submit update
  const handleSubmit = (data) => {
    //current date
    const now = new dayjs();
    const mustCreateAfter = now.add(8, "hour");

    //parse end time and start time from user input
    const createDate = data.date,
      startTime = data.startTime
        .date(createDate.$D)
        .month(createDate.$M)
        .year(createDate.$y),
      endTime = data.endTime
        .date(createDate.$D)
        .month(createDate.$M)
        .year(createDate.$y);

    //Convert to string
    const dateString = `${createDate.$D}/${
      createDate.$M + 1 < 10 ? `0${createDate.$M + 1}` : createDate.$M + 1
    }/${createDate.$y}`;
    const startTimeString = `${startTime.$H}:${
      startTime.$m < 10 ? `0${startTime.$m}` : startTime.$m
    }`;
    const endTimeString = `${endTime.$H}:${
      endTime.$m < 10 ? `0${endTime.$m}` : endTime.$m
    }`;

    // Error
    const handleError = () => {
      message.error(
        `START TIME must be EARLIER than END TIME and AFTER ${mustCreateAfter.$d.getDate()}/${
          mustCreateAfter.$d.getMonth() + 1
        }/${mustCreateAfter.$y} ${
          mustCreateAfter.$d.getHours() < 10
            ? `0${mustCreateAfter.$d.getHours()}`
            : mustCreateAfter.$d.getHours()
        }:${
          mustCreateAfter.$d.getMinutes() < 10
            ? `0${mustCreateAfter.$d.getMinutes()}`
            : mustCreateAfter.$d.getMinutes()
        }`
      );
    };

    // on success
    const handleSuccess = () => {
      //Success
      if (!isAssignMode) {
        data = { ...data, studentemail: null };
      }

      //! Place fetching UPDATE API here

      message.success(
        `Created slot at ${data.date.$d.getDate()}/${
          data.date.$d.getMonth() + 1
        }/${data.date.$y} ${
          startTime.$d.getHours() < 10
            ? `0${startTime.$d.getHours()}`
            : startTime.$d.getHours()
        }:${
          startTime.$d.getMinutes() < 10
            ? `0${startTime.$d.getMinutes()}`
            : startTime.$d.getMinutes()
        } - ${
          endTime.$d.getHours() < 10
            ? `0${endTime.$d.getHours()}`
            : endTime.$d.getHours()
        }:${
          endTime.$d.getMinutes() < 10
            ? `0${endTime.$d.getMinutes()}`
            : endTime.$d.getMinutes()
        }`
      );
      //forward to view
      setCreatedSlotView("");
      //TODO: For Backend

      const result = {
        studentemail: data.studentemail,
        mode: data.mode,
        location: data.location,
        subject: data.subject,
        password:
          data.password === null || data.password === undefined
            ? null
            : data.password.trim() === ""
            ? null
            : data.password.trim(),
        startTime: startTimeString,
        endTime: endTimeString,
        date: dateString,
        //! Add lecturer
        lecturer: null,
      };
      console.log(result);
    };

    //Check condition
    if (startTime < mustCreateAfter) {
      handleError();
    } else {
      if (startTime < endTime) {
        handleSuccess();
      } else {
        handleError();
      }
    }
  };

  //submit antispam
  const [clickSubmit, setClickSubmit] = useState(0);
  //cooldown 3s if users click over 2 times
  setTimeout(() => {
    clickSubmit > 0 && setClickSubmit(clickSubmit - 1);
  }, 3000);
  //checker
  const handleSubmitAntispam = (data) => {
    clickSubmit === 2 && message.error("Please try again in 3 seconds");
    clickSubmit < 3 && setClickSubmit(clickSubmit + 1);
    if (clickSubmit < 2) {
      handleSubmit(data);
    }
  };

  //Handle Subject
  //! subject from API
  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const getSubjects = () => {
    setSubjectsLoading(true);
    axios
      .get("https://meet-production-52c7.up.railway.app/api/subject/status")
      .then((response) => setSubjects(response.data))
      .catch((error) => console.error(error))
      .finally(() => setSubjectsLoading(false));
  };

  const [emails, setEmails] = useState([]);
  const [emailsLoading, setEmailsLoading] = useState(false);
  const getEmails = () => {
    setEmailsLoading(true);
    axios
      .get(
        "https://meet-production-52c7.up.railway.app/api/v1/student/get/emails"
      )
      .then((response) => setEmails(response.data.data))
      .catch((error) =>
        console.error(error).finally(() => setEmailsLoading(false))
      );
  };

  const [locationsList, setLocationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getLocations = () => {
    setIsLoading(true);
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/location/personal?Lecturer-id=${user.id}`
      )
      .then(
        (response) => (
          setLocationsList(response.data.data), setIsLoading(false)
        )
      )
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    getSubjects();
    getEmails();
    getLocations();
  }, []);


  return (
    <>
      <Title className="sectionTitle" level={3}>
        CREATING SLOT
      </Title>

      <Spin
        spinning={subjectsLoading}
        size="large"
        tip="Preparing your data..."
      >
        <div className="editLocationForm">
          <Form onFinish={handleSubmitAntispam}>
            {/*  ID */}
            <Form.Item name="id" label="ID" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            {/* Date */}
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>

            {/* Start time */}
            <Form.Item
              name="startTime"
              label="Start Time"
              rules={[{ required: true }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>

            {/* End time */}
            <Form.Item
              name="endTime"
              label="End Time"
              rules={[{ required: true }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>

            {/* </Form.Item> */}
            <Form.Item name="mode" label="Mode" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio.Button
                  value="Manual approve"
                  onClick={() => setIsAssignMode(false)}
                >
                  Manual approve
                </Radio.Button>
                <Radio.Button
                  value="Accept the first Booker"
                  onClick={() => setIsAssignMode(false)}
                >
                  Accept the first Booker
                </Radio.Button>
                <Radio.Button
                  value="Assign student"
                  onClick={() => setIsAssignMode(true)}
                >
                  Assign student
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            {/* Student email */}
            {isAssignMode && (
              <Form.Item
                name="studentemail"
                label="Student Email"
                rules={[{ required: isAssignMode ? true : false }]}
              >
                <Select allowClear={true} showSearch>
                  {emails?.map((email) => {
                    return <Option key={email}>{email}</Option>;
                  })}
                </Select>
              </Form.Item>
            )}

            {/* Location */}
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true }]}
            >
              <Select>
                {locationsList?.map((location) => {
                  return <Option key={location.id}>{location.name}</Option>;
                })}
              </Select>
            </Form.Item>

            {/* Subject */}
            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true }]}
            >
              <Select mode="multiple" allowClear={true}>
                {subjects?.map((subject) => {
                  return <Option key={subject?.code}>{subject?.code}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>
            {/* Cancel */}
            <Form.Item>
              <Button
                onClick={handleCancel}
                style={{ margin: "0 8px 0 0" }}
                type="default"
                danger
              >
                Cancel
              </Button>
              {/* Save */}
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </>
  );
};
