import { React, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  Typography,
  Tag,
  Popover,
  Select,
  Button,
  Col,
  Row,
} from "antd";
import {
  PoweroffOutlined,
  SearchOutlined,
  MailFilled,
} from "@ant-design/icons";
import { AdvancePopover } from "./AdvancePopover";
import { UserResultDisplay } from "./UserResultDisplay";
import axios from "axios";

export const UsersManage = () => {
  const { Title } = Typography;
  // State
  const [finalSearch, setFinalSearch] = useState({
    name: null,
    role: null,
    status: null,
  });
  const [recentSearch, setRecentlSearch] = useState(finalSearch);

  //test data
  //! fetching data
  const {
    data: users, //assign name for the data
    isLoading,
    isError,
    refetch,
  } = useQuery(["user"], () => {
    return axios
      .get("https://meet-production-52c7.up.railway.app/api/v1/user/get")
      .then((response) => response.data.data); //fetching and turn it into json
  });

  const checkRole = (role) => {
    switch (role) {
      case 0:
        return "Admin";
      case 1:
        return "Lecturer";
      case 2:
        return "Student";
    }
  };

  //* PUSH USER NAME INTO SEARCH BOX
  //test users value
  const usersSearch = [
    // {
    //   key: "khangtngse171927@fpt.edu.vn",
    //   label: "khangtngse171927@fpt.edu.vn",
    // },
  ];
  const getName = () => {
    users?.map((user) => {
      usersSearch.push({ key: user.name, label: user.name });
    });
  };
  getName();

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
      render: (user) => {
        return checkRole(user.role);
      },
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
  const handleUserInput = (name) => {
    setFinalSearch({ ...finalSearch, name: name });
  };

  //handle search
  const [usersList, setUsersList] = useState([]);
  const handleSearch = () => {
    //set recent search result
    setRecentlSearch(finalSearch);

    //create a search array contain all users
    let searchResult = users;

    //filter by name
    if (finalSearch.name !== null) {
      searchResult = searchResult.filter((user) => {
        return user.name === finalSearch.name;
      });
    }

    //filter by role
    if (finalSearch.role !== null) {
      searchResult = searchResult.filter((user) => {
        return user.role === finalSearch.role;
      });
    }

    //filter by role
    if (finalSearch.status !== null) {
      searchResult = searchResult.filter((user) => {
        return user.status === finalSearch.status;
      });
    }

    //set the search to null and print empty on the table
    if (searchResult.length === 0) {
      searchResult = null;
    }
    setUsersList(searchResult);
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        USERS MANAGEMENT
      </Title>

      {/* Search user */}
      <Row>
        <Col xs={12}>
          <Select
            suffixIcon={<MailFilled />}
            placeholder="Ex: Nguyen Van A,..."
            showSearch
            allowClear
            onSelect={(user) => handleUserInput(user)}
            onClear={() => setFinalSearch({ ...finalSearch, name: null })}
            options={usersSearch.map((user) => ({
              value: user.key,
              label: user.label,
            }))}
            style={{width: '98%'}}
          ></Select>
        </Col>


        {/* Others search */}
        <Col xs={11}>
          <AdvancePopover
            finalSearch={finalSearch}
            setFinalSearch={setFinalSearch}
          />
        </Col>

        {/* Search button */}
        <Col xs={1}>
          <Popover content="Click to search">
            <Button
              style={{ margin: "0 0 0 8px" }}
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            ></Button>
          </Popover>
        </Col>
      </Row>

      {/* Alert banner */}
      <UserResultDisplay recentSearch={recentSearch} />

      {/* Table of result */}
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={usersList?.length === 0 ? users : usersList}
        loading={isLoading}
        rowKey="id"
      ></Table>
    </>
  );
};
