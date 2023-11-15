import { React, useState, useEffect } from "react";
import { Table, Typography, Button, Popover, Row, Col } from "antd";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import axios from "axios";

export function StudentsManage({ setStudentEdit, setMenuOpt }) {
  const { Title } = Typography;

  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);
  const getData = () => {
    if (
      localStorage.getItem("Astudents") !== null &&
      localStorage.getItem("Astudents") !== "undefined"
    ) {
      setHideLoading(true);
      setStudentList(JSON.parse(localStorage.getItem("Astudents")));
    } else {
      setLoading(true);
    }
    axios
      .get("https://meet-production-52c7.up.railway.app/api/v1/student/all")
      .then(
        (response) => (
          setStudentList(response.data.data),
          localStorage.setItem("Astudents", JSON.stringify(response.data.data))
        )
      )
      .catch((error) => console.error(error))
      .finally(() => (setLoading(false), setHideLoading(false)));
  };
  useEffect(() => {
    getData();
  }, []);

  //Handle Edit
  const handleEdit = (student) => {
    setStudentEdit(student);
    setMenuOpt("editStudent");
  };

  const columns = [
    // {
    //   key: "1",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "2",
      title: "Name",
      render: (student) => (
        <Popover
        title="Other Informations"
          content={
            <span
              style={Object.assign(
                { lineHeight: "30px" },
                { minWidth: "300px" }
              )}
            >
              {/* ID */}
              <Row style={{ width: "300px" }}>
                <Col xs={7}>
                  <b>ID:</b>
                </Col>
                <Col xs={17}> {student.id} </Col>
              </Row>
              {/* Email */}
              <Row style={{ width: "300px" }}>
                <Col xs={7}>
                  <b>Email:</b>
                </Col>
                <Col xs={17}> {student.email} </Col>
              </Row>
              {/* Email */}
              <Row style={{ width: "300px" }}>
                <Col xs={7}>
                  <b>Phone:</b>
                </Col>
                <Col xs={17}> {student.phone} </Col>
              </Row>
            </span>
          }
        >
          {student.name}
        </Popover>
      ),
    },
    {
      key: "3",
      title: "MSSV",
      dataIndex: "code",
    },
    {
      key: "4",
      title: "DOB",
      dataIndex: "dob",
    },
    // {
    //   key: "5",
    //   title: "Phone",
    //   dataIndex: "phone",
    // },
    // {
    //   key: "6",
    //   title: "Email",
    //   dataIndex: "email",
    // },
    {
      key: "7",
      title: "Curriculum",
      dataIndex: "curriculum",
    },
    {
      key: "8",
      title: "Major",
      dataIndex: "majorName",
    },
    {
      key: "9",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "10",
      label: "",
      render: (student) => {
        return (
          <>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(student)}
            ></Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        STUDENTS
        <Button
          disabled={loading}
          icon={<ReloadOutlined />}
          onClick={getData}
          style={{ margin: "0 5px 0 0" }}
          loading={hideLoading}
        >
          {hideLoading ? "Checking for updates..." : "Refresh"}
        </Button>
      </Title>
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={studentList}
        loading={loading}
        rowKey="id"
      ></Table>
    </>
  );
}
