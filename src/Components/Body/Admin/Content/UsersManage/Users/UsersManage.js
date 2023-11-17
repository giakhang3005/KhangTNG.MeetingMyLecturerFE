import { React, useState, useEffect, useContext } from "react";
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
} from "antd";
import {
  PoweroffOutlined,
  SearchOutlined,
  MailFilled,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { AdvancePopover } from "./AdvancePopover";
import { UserResultDisplay } from "./UserResultDisplay";
import axios from "axios";
import { Data } from "../../../../Body";

export const UsersManage = ({ setMenuOpt, setUserEdit }) => {
  const { user } = useContext(Data);
  const { Title } = Typography;
  // State
  const [finalSearch, setFinalSearch] = useState({
    name: null,
    role: null,
    status: null,
  });
  const [recentSearch, setRecentlSearch] = useState(finalSearch);

  //! fetching data
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);
  const getData = () => {
    if (
      localStorage.getItem("Ausers") !== null &&
      localStorage.getItem("Ausers") !== "undefined"
    ) {
      setHideLoading(true);
      setUsers(JSON.parse(localStorage.getItem("Ausers")));
    } else {
      setLoading(true);
    }
    axios
      .get("https://meet-production-52c7.up.railway.app/api/v1/account/get")
      .then((response) => response.data.data)
      .then(
        (responseData) => (
          setUsers(responseData),
          localStorage.setItem("Ausers", JSON.stringify(responseData))
        )
      )
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
        setHideLoading(false);
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
  };

  useEffect(() => {
    getData();
  }, []);

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

  //toggle user
  const [toggleLoading, setToggleLoading] = useState(false);
  const toggleUser = (user) => {
    setToggleLoading(true);
    const data = { ...user, status: !user.status };
    axios
      .put(
        `https://meet-production-52c7.up.railway.app/api/v1/account/put/${user.id}`,
        data
      )
      .then(() => {
        getData();
        message.success("Toggled successfully");
      })
      .finally(() => {
        setToggleLoading(false);
      });
  };

  //handle search user
  const handleUserInput = (name) => {
    setFinalSearch({ ...finalSearch, name: name });
  };

  //handle edit user
  const handleEditUser = (user) => {
    setMenuOpt("editUser");
    setUserEdit(user);
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
    getData();
  };

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
      render: (userFetch) => {
        return checkRole(userFetch.role);
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
      render: (userFetch) => {
        return userFetch.status ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Disabled</Tag>
        );
      },
    },
    // {
    //   key: "7",
    //   title: "",
    //   render: (userFetch) => {
    //     return (
    //       <>
    //         {/* Loading */}
    //         {toggleLoading ? (
    //           <Popover
    //             content="Please wait for the Update finish"
    //             placement="left"
    //           >
    //             <EditOutlined
    //               style={Object.assign(
    //                 { fontSize: "18px" },
    //                 { color: "black" },
    //                 { opacity: "0.1" },
    //                 { margin: "0 12px 0 0" }
    //               )}
    //             />
    //             <PoweroffOutlined
    //               style={Object.assign(
    //                 { fontSize: "18px" },
    //                 { color: "black" },
    //                 { opacity: "0.1" }
    //               )}
    //             />
    //           </Popover>
    //         ) : (
    //           <>
    //             {/* Edit Button */}
    //             {userFetch.role > 0 || userFetch.id === user.id ? (
    //               <Popover
    //                 content={`Click to edit ${userFetch.name}'s account`}
    //                 placement="left"
    //               >
    //                 <EditOutlined
    //                   onClick={() => handleEditUser(userFetch)}
    //                   style={Object.assign(
    //                     { fontSize: "18px" },
    //                     { color: "black" },
    //                     { margin: "0 12px 0 0" }
    //                   )}
    //                 />
    //               </Popover>
    //             ) : (
    //               <Popover
    //                 content="You cannot edit other admin account"
    //                 placement="left"
    //               >
    //                 <EditOutlined
    //                   style={Object.assign(
    //                     { fontSize: "18px" },
    //                     { color: "black" },
    //                     { opacity: "0.1" },
    //                     { margin: "0 12px 0 0" }
    //                   )}
    //                 />
    //               </Popover>
    //             )}

    //             {userFetch.status ? (
    //               //! Active
    //               <Popover
    //                 content={`Click to disable ${userFetch.name}'s account`}
    //                 placement="left"
    //               >
    //                 <PoweroffOutlined
    //                   onClick={() => toggleUser(userFetch)}
    //                   style={Object.assign(
    //                     { fontSize: "18px" },
    //                     { color: "green" }
    //                   )}
    //                 />
    //               </Popover>
    //             ) : (
    //               //! Disable
    //               <Popover
    //                 content={`Click to active ${userFetch.name}'s account`}
    //                 placement="left"
    //               >
    //                 <PoweroffOutlined
    //                   onClick={() => toggleUser(userFetch)}
    //                   style={Object.assign(
    //                     { fontSize: "18px" },
    //                     { color: "red" }
    //                   )}
    //                 />
    //               </Popover>
    //             )}
    //           </>
    //         )}
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <Title className="sectionTitle" level={3}>
        USERS MANAGEMENT
        <span>
          <Button
            style={{ margin: "0 5px 0 5px" }}
            onClick={() => handleRefetch()}
            disabled={toggleLoading || isLoading}
            loading={hideLoading}
          >
            {hideLoading ? "Checking for updates..." : "Refresh"}
          </Button>
          <Button
          type="primary"
            icon={<UserAddOutlined />}
            disabled={toggleLoading || isLoading}
            onClick={() => setMenuOpt("addUser")}
          ></Button>
        </span>
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
      <Row style={{ overflow: "scroll" }}>
        <Col xs={24}>
          <Table
            className="tableOfLocations"
            columns={columns}
            dataSource={usersList?.length === 0 ? users : usersList}
            loading={isLoading || toggleLoading}
            rowKey="id"
          ></Table>
        </Col>
      </Row>
    </>
  );
};
