import { React, useState, useContext } from "react";
import { Upload, message, Button, Col, Row, Popover, Spin } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useExcel } from "../../../../../Hooks/All/useExcel";
import { Data } from "../../../Body";
import dayjs from "dayjs";

export function UploadExcel({ subjects, locationsList, subjectsLoading, getData }) {
  const { Dragger } = Upload;
  const { exportExcel, readExcelFile } = useExcel();
  const { user } = useContext(Data);

  const handleExportMaterials = () => {
    const today = new dayjs();
    const todayString = `[MML] Materials ${today.$D}_${today.$M + 1}_${
      today.$y
    }`;

    //data
    const downloadSubjectsList = subjects.map((subject) => {
      return { STT: subject.id, CODE: subject.code, NAME: subject.name };
    });

    let downloadLocationsList = locationsList.map((loc) => {
      return { ID: loc.id, NAME: loc.name, ADDRESS: loc.address };
    });
    downloadLocationsList.push({ ID: "online", NAME: "", ADDRESS: "" });

    const slotMode = [
      {
        MODE: 0,
        NAME: "Manual Approve",
        NOTE: "Do not fill student email for slots using this mode",
      },
      {
        MODE: 1,
        NAME: "Accept the first booker",
        NOTE: "Do not fill student email for slots using this mode",
      },
      {
        MODE: 2,
        NAME: "Assign Student",
        NOTE: "Remember to fill student email",
      },
    ];

    exportExcel(
      downloadSubjectsList,
      "Subjects List",
      todayString,
      slotMode,
      "Slot Modes List",
      downloadLocationsList,
      "Locations List"
    );
  };
  const handleExportTemplate = () => {
    //data
    const dataTemplates = [
      {
        meetingDay: "01/01/2023",
        startTime: "12:15",
        endTime: "13:45",
        locationId: 6,
        subjects: "DBI202, PRO192",
        mode: 0,
        studentEmail: "",
        password: "",
      },
      {
        meetingDay: "01/01/2023",
        startTime: "14:15",
        endTime: "15:00",
        locationId: 6,
        subjects: "DBI202",
        mode: 2,
        studentEmail: "testStudent@fpt.edu.vn",
        password: "12345",
      },
      {
        meetingDay: "01/01/2023",
        startTime: "19:15",
        endTime: "20:00",
        locationId: "online",
        subjects: "SWP391",
        mode: 1,
        studentEmail: "",
        password: "",
      },
    ];
    exportExcel(dataTemplates, "Slot", "[MML] Import Slots Template");
  };

  const [uploadedData, setUploadedData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const props = {
    onRemove: () => {
      setUploadedData([]);
    },
    beforeUpload: (file) => {
      setLoading(true);
      readExcelFile(file, setUploadedData, setLoading);
      return false;
    },
  };

  const handleUpload = () => {
    setUploading(true);

    //Formatted data
    let Err = false;
    const formatedData = uploadedData.map((row) => {
      //push into the date format dd/mm/yyyy
      if (typeof row.meetingDay === "number" || typeof row.startTime === "number" || typeof row.endTime === "number") {
        Err = true;
        message.error(
          `Failed to upload: You have to format meetingDate, startTime, endTime as a String/Text in Excel (Row ${row.__rowNum__})`
        );
        setUploading(false);
      } else {
        const dateSplit = row.meetingDay?.split("/");
        const date =
          dateSplit[0]?.length < 2 ? `0${dateSplit[0]}` : dateSplit[0];
        const month =
          dateSplit[1]?.length < 2 ? `0${dateSplit[1]}` : dateSplit[1];
        const year = dateSplit[2];

        return {
          meetingDay: `${date}/${month}/${year}`,
          startTime: row.startTime?.toString(),
          endTime: row.endTime?.toString(),
          locationId: row.locationId?.toString(),
          subjects: row.subjects,
          mode: row.mode?.toString(),
          studentEmail: row.studentEmail === null || row.studentEmail === undefined ? "" : row.studentEmail,
          password: row.password === null || row.password === undefined ? "" : row.password,
        };
      }
    });

    console.log(formatedData);
    if (!Err) {
      axios
        .post(
          `https://meet-production-52c7.up.railway.app/api/v1/slot/import?id=${user.id}`,
          formatedData
        )
        .then((res) => {
          message.success("Uploaded completed");
          message.info(res.data.data);
          console.log(res)
          setUploadedData([]);
          getData()
        })
        .catch((err) => {
          console.error(err);
          message.error("There is an internal error");
        })
        .finally(() => {
          setUploading(false);
        });
    }
    // console.log(JSON.stringify(formatedData));
  };
  return (
    <div className="requestsInfo">
      <Row style={{ margin: "15px 0 40px 0" }}>
        <Col xs={4}></Col>

        <Col xs={16}>
          <Spin spinning={loading}>
            <Dragger
              {...props}
              type="file"
              accept=".xlsx"
              maxCount={1}
              // onChange={(file) => handleChange(file)}
              style={Object.assign({ width: "100%" })}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag the excel (.xlsx) file to this area to upload
              </p>
              <p className="ant-upload-hint">
                You can only upload 1 file at a time, but in your excel file can
                contain multiple slots. Your file must follow the{" "}
                <b>Template</b>.
              </p>
            </Dragger>
          </Spin>
        </Col>
      </Row>

      <Row>
        <Col xs={4}></Col>
        <Col xs={5}>
          <Row>
            <Col xs={24} style={Object.assign({ margin: "0 0 5px 0" })}>
              <Button
                style={{ width: "100%" }}
                icon={<CloudDownloadOutlined />}
                onClick={handleExportTemplate}
              >
                Download Template
              </Button>
            </Col>
            <Col xs={24}>
              <Popover
                content={
                  <>
                    In this file will contain a <b>Subjects list</b>,{" "}
                    <b>Slot modes list</b> and <b>Locations list</b> help you to
                    fill in the template
                  </>
                }
              >
                <Button
                  style={{ width: "100%" }}
                  icon={<DownloadOutlined />}
                  disabled={subjectsLoading}
                  onClick={handleExportMaterials}
                >
                  {subjectsLoading ? "Preparing..." : "Download Materials list"}
                </Button>
              </Popover>
            </Col>
          </Row>
        </Col>
        <Col xs={11}>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={uploadedData?.length === 0}
            loading={uploading}
            style={Object.assign(
              { width: "100%" },
              { height: "68px" },
              { margin: "0 0 0 5px" },
              { fontSize: "15px" },
              { fontWeight: 600 }
            )}
          >
            {uploading ? "Uploading..." : "Start Upload"}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
