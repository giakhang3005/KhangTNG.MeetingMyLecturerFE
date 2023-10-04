import React from "react";
import { Table, Typography, Tag, Popover } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";

export const UsersManage = () => {
  const { Title } = Typography;

  //test data
  const users = [
    {
      id: "10019293123123",
      name: "Truong Nguyen Gia Khang (K17 HCM)",
      email: "khangtngse171927@fpt.edu.vn",
      role: "student",
      password: null,
      status: false,
    },
    {
      id: "10019293123123",
      name: "Truong Nguyen Gia Khang (K17 HCM)",
      email: "khangtngse171927@fpt.edu.vn",
      role: "student",
      password: null,
      status: true,
    },
  ];
  //columns of table
  const columns = [
    {
      key: "1",
      title: "ID",
      //location.id
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Role",
      dataIndex: "role",
    },
    {
      key: "5",
      title: "Password",
      dataIndex: "password",
    },
    {
      key: "6",
      title: "Status",
      render: (user) => {
        return user.status ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Disabled</Tag>
        );
      },
    },
    {
      key: "7",
      title: "",
      render: (user) => {
        return (
          <>
            {user.status ? (
              <Popover content={`Click to disable ${user.name}'s account`}>
                <PoweroffOutlined
                  style={Object.assign(
                    { fontSize: "18px" },
                    { color: "green" }
                  )}
                />
              </Popover>
            ) : (
              <Popover content={`Click to active ${user.name}'s account`}>
                <PoweroffOutlined
                  style={Object.assign({ fontSize: "18px" }, { color: "red" })}
                />
              </Popover>
            )}
          </>
        );
      },
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        USERS MANAGEMENT
      </Title>
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={users}
        // loading={isLoading}
        rowKey="id"
      ></Table>
    </>
  );
};
