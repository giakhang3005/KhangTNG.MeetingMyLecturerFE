import { React, useState } from "react";
import { Typography, Table, Row, Col, Button, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function PublicLocations() {
  const { Title, Text } = Typography;
  const [otherLoading, setOtherLoading] = useState(false);

  //! Get
  const [locations, setLocations] = useState([]);
  const {
    // data: subjects,
    isLoading,
    refetch,
  } = useQuery(["loc"], () => {
    return axios
      .get("https://meet-production-52c7.up.railway.app/api/location/public")
      .then((response) => setLocations(response.data.data));
  });

  //! Delete
  const handleDelete = (location) => {
    setOtherLoading(true);
    axios
      .delete(
        `https://meet-production-52c7.up.railway.app/api/location/delete?id=${location.id}`
      )
      .then(() => {
        message.success("Deleted successfully");
        refetch();
      })
      .catch(message.error("Deleted failed"))
      .finally(setOtherLoading(false));
  };

  //table columns
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "4",
      label: "",
      render: (location) => {
        return (
          <>
            <Button type="text" icon={<EditOutlined />}></Button>
            <Button
              onClick={(location) => handleDelete(location)}
              type="text"
              icon={<DeleteOutlined />}
              danger
            ></Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        PUBLIC LOCATIONS
        <Button
          icon={<PlusOutlined />}
          // onClick={() => handleRefetch()}
          loading={isLoading || otherLoading}
        >
          Add Location
        </Button>
      </Title>
      {/* Table of result */}
      <Row style={{ overflow: "scroll" }}>
        <Col xs={24}>
          <Table
            className="tableOfLocations"
            columns={columns}
            dataSource={locations}
            loading={isLoading || otherLoading}
            rowKey="id"
          ></Table>
        </Col>
      </Row>
    </>
  );
}
