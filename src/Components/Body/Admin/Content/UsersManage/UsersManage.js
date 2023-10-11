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
  message,
  Spin,
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
  const [users, setUsers] = useState([]);
  //! fetching data
  const {
    // data, //assign name for the data
    isLoading,
    // isError,
    refetch,
  } = useQuery(["user"], () => {
    return axios
      .get("https://meet-production-52c7.up.railway.app/api/v1/user/get")
      .then((response) => response.data.data)
      .then((responseData) => setUsers(responseData))
      .finally(() => {
        setRecentlSearch({
          name: null,
          role: null,
          status: null,
        });
        setFinalSearch({
          name: null,
          role: null,
          status: null,
        });
        setUsersList([]);
      });
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
  const usersSearch = [];
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
            {toggleLoading === true ? (
              <Popover content="Please wait for the Update finish">
                <PoweroffOutlined
                  style={Object.assign(
                    { fontSize: "18px" },
                    { color: "black" },
                    { opacity: "0.1" }
                  )}
                />
              </Popover>
            ) : user.status ? (
              <Popover content={`Click to disable ${user.name}'s account`}>
                <PoweroffOutlined
                  onClick={() => toggleUser(user)}
                  style={Object.assign(
                    { fontSize: "18px" },
                    { color: "green" }
                  )}
                />
              </Popover>
            ) : (
              <Popover content={`Click to active ${user.name}'s account`}>
                <PoweroffOutlined
                  onClick={() => toggleUser(user)}
                  style={Object.assign({ fontSize: "18px" }, { color: "red" })}
                />
              </Popover>
            )}
          </>
        );
      },
    },
  ];

  //toggle user
  const [toggleLoading, setToggleLoading] = useState(false);
  const toggleUser = async (user) => {
    setToggleLoading(true);
    const data = { ...user, status: !user.status };
    await axios.put(
      `https://meet-production-52c7.up.railway.app/api/v1/user/put/${user.id}`,
      data
    );
    refetch();
    setToggleLoading(false);
  };

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

  const handleRefetch = () => {
    refetch();
    setRecentlSearch({
      name: null,
      role: null,
      status: null,
    });
    setFinalSearch({
      name: null,
      role: null,
      status: null,
    });
    setUsersList([]);
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        USERS MANAGEMENT
        <Button
          style={{ margin: "0 0 0 5px" }}
          type="primary"
          onClick={() => handleRefetch()}
          loading={toggleLoading || isLoading}
        >
          Refresh
        </Button>
      </Title>

      {/* Search user */}
      <Row>
        <Col xs={10} md={12}>
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
            style={{ width: "98%" }}
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
      <Row style={{overflow: 'scroll'}}>
        <Col xs={24}>
          <Table
            className="tableOfLocations"
            columns={columns}
            dataSource={usersList?.length === 0 ? users : usersList}
            loading={isLoading}
            rowKey="id"
          ></Table>
        </Col>
      </Row>
    </>
  );
};
