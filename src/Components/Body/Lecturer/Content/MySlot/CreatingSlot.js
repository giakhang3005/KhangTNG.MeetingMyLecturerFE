import { Select, Button, Typography, message, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import "../../Lecturer.css";
import dayjs from "dayjs";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Data } from "../../../Body";
import { UploadExcel } from "./UploadExcel";
import { CreateSlotForm } from "./CreateSlotForm";

export const CreatingSlot = (props) => {
  const { Option } = Select;
  const { Title } = Typography;
  const [isUploadMode, setIsUploadMode] = useState(false);

  const setCreatedSlotView = props.setCreatedSlotView,
    getData = props.getData;
  const { user } = useContext(Data);

  //Handle Subject
  //! subject from API
  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const getSubjects = () => {
    if (
      localStorage.getItem("subjects") !== null &&
      localStorage.getItem("subjects") !== "undefined"
    ) {
      setSubjects(JSON.parse(localStorage.getItem("subjects")));
    } else {
      setSubjectsLoading(true);
      axios
        .get("https://meet-production-52c7.up.railway.app/api/subject/status")
        .then(
          (response) => (
            setSubjects(response.data),
            localStorage.setItem("subjects", JSON.stringify(response.data))
          )
        )
        .finally(() => setSubjectsLoading(false));
    }
  };

  const [emails, setEmails] = useState([]);
  const [emailsLoading, setEmailsLoading] = useState(false);
  const getEmails = () => {
    setEmailsLoading(true);
    axios
      .get("https://meet-production-52c7.up.railway.app/api/v1/student/emails")
      .then((response) => setEmails(response.data.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const [locationsList, setLocationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getLocations = () => {
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/location/personal?Lecturer-id=${user.id}`
      )
      .then((response) => setLocationsList(response.data.data))
      .catch((err) => console.log(err));
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
        <Button
          disabled={subjectsLoading || isLoading}
          onClick={() => setIsUploadMode(!isUploadMode)}
        >
          {!isUploadMode ? "Upload Excel File" : "Create new slot"}
        </Button>
      </Title>

      {/* Back button */}
      <Button
        disabled={isLoading}
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setCreatedSlotView("")}
      >
        Back
      </Button>

      {isUploadMode ? (
        <UploadExcel subjects={subjects} locationsList={locationsList} />
      ) : (
        <Spin spinning={isLoading}>
          <CreateSlotForm
            isLoading={isLoading}
            subjectsLoading={subjectsLoading}
            subjects={subjects}
            emails={emails}
            locationsList={locationsList}
            setCreatedSlotView={setCreatedSlotView}
            setIsLoading={setIsLoading}
            getData={getData}
          />
        </Spin>
      )}
    </>
  );
};
