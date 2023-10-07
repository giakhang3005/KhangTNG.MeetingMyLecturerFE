import { React, useState } from "react";
import {
  Table,
  Typography,
  Tag,
  Popover,
  Select,
  Button,
  message,
  Modal,
} from "antd";
import {
  PoweroffOutlined,
  SearchOutlined,
  SettingFilled,
  MailFilled,
} from "@ant-design/icons";
import { AdvancePopover } from "./AdvancePopover";
import { UserResultDisplay } from "./UserResultDisplay";

export const UsersManage = () => {
  const { Title } = Typography;
  // State
  const [searchRole, setSearchRole] = useState(null);
  const [searchStatus, setSearchStatus] = useState(null);
  const [finalSearch, setFinalSearch] = useState({
    email: null,
    role: searchRole,
    status: searchStatus,
  });
  const [recentSearch, setRecentlSearch] = useState(finalSearch);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setSearchRole(finalSearch.role);
    setSearchStatus(finalSearch.status);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setFinalSearch({ ...finalSearch, role: searchRole, status: searchStatus });
    message.success("Saved Advanced option");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      id: "10019293123124",
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
                  onClick={() => activeUser(user)}
                  style={Object.assign(
                    { fontSize: "18px" },
                    { color: "green" }
                  )}
                />
              </Popover>
            ) : (
              <Popover content={`Click to active ${user.name}'s account`}>
                <PoweroffOutlined
                  onClick={() => disableUser(user)}
                  style={Object.assign({ fontSize: "18px" }, { color: "red" })}
                />
              </Popover>
            )}
          </>
        );
      },
    },
  ];

  //disable user
  const disableUser = (user) => {};

  //disable user
  const activeUser = (user) => {};

  //handle search user
  const handleUserInput = (email) => {
    setFinalSearch({ ...finalSearch, email: email });
  };

  //handle search
  const handleSearch = () => {
    setRecentlSearch(finalSearch)
    console.log(finalSearch);
    //!fetch finalSearch
  };

  //test users value
  const usersSearch = [
    {
      key: "khangtngse171927@fpt.edu.vn",
      label: "khangtngse171927@fpt.edu.vn",
    },
  ];

  return (
    <>
      <Title className="sectionTitle" level={3}>
        USERS MANAGEMENT
      </Title>

      {/* Search user */}
      <Select
        suffixIcon={<MailFilled />}
        placeholder="Ex: user@fpt.edu.vn,..."
        showSearch
        allowClear
        onSelect={(user) => handleUserInput(user)}
        onClear={() => setFinalSearch({ ...finalSearch, email: null })}
        options={usersSearch.map((user) => ({
          value: user.key,
          label: user.label,
        }))}
        style={{
          width: "33.33%",
        }}
      ></Select>

      {/* Advance button */}
      <Popover
        content={
          finalSearch.role !== null || finalSearch.status !== null
            ? "Click to edit advanced search options"
            : "Click to add advanced search options"
        }
      >
        <Button
          style={Object.assign(
            { margin: "0 0 0 8px" },
            (finalSearch.role !== null || finalSearch.status !== null) && {
              color: "green",
            }
          )}
          icon={<SettingFilled />}
          onClick={showModal}
        ></Button>
      </Popover>

      {/* Search button */}
      <Popover content="Click to search">
        <Button
          style={{ margin: "0 0 0 8px" }}
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearch}
        ></Button>
      </Popover>

      {/* Alert banner */}
      <UserResultDisplay recentSearch={recentSearch} />

      {/* Table of result */}
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={users}
        // loading={isLoading}
        rowKey="id"
      ></Table>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Advanced Option"
        okText="Save"
      >
        <AdvancePopover
          finalSearch={finalSearch}
          searchRole={searchRole}
          setSearchRole={setSearchRole}
          searchStatus={searchStatus}
          setSearchStatus={setSearchStatus}
        />
      </Modal>
    </>
  );
};
