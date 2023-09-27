import { useQuery } from "@tanstack/react-query";
import { Typography, Table } from "antd";
import { AddLocationBtn } from "./AddLocationBtn";
import {
  PlusCircleFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export const ViewingLocation = (props) => {
  //get function from LecturerLocation
  const setLocationSectionView = props.setLocationSectionView,
    setEditLocation = props.setEditLocation,
    setFinalIdOfTheList = props.setFinalIdOfTheList;

  const { Title, Text } = Typography;

  //! fetching data -> LocationsList
  const {
    data: LocationsList, //assign name for the data
    isLoading,
    isError,
    refetch,
  } = useQuery(["locations"], () => {
    return fetch("https://retoolapi.dev/xGHy24/data").then((res) => res.json()); //fetching and turn it into json
  });

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
      dataIndex: "Location name",
    },
    {
      key: "3",
      title: "Address",
      dataIndex: "Location address",
    },
    {
      key: "4",
      title: "",
      render: (location) => {
        return (
          <>
            <EditOutlined onClick={() => editLocation(location)} />
            <DeleteOutlined
              className="locationDeleteBtn"
              onClick={() => deleteLocation(location)}
            />
          </>
        );
      },
    },
  ];
  //handle edit click
  const editLocation = (location) => {
    setEditLocation(location);
    setLocationSectionView("edit");
  };

  //handle delete click
  const deleteLocation = (location) => {
    //! Place fetching DELETE API here

    refetch();
  };
  return (
    <div className="viewingLecturerLocations">
      <Title className="sectionTitle" level={3}>
        MY LOCATIONS
        <AddLocationBtn
          setLocationSectionView={setLocationSectionView}
          LocationsList={LocationsList}
          setFinalIdOfTheList={setFinalIdOfTheList}
        />
      </Title>

      {/* Table of locations */}
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={LocationsList}
        loading={isLoading}
        rowKey="id"
      ></Table>
    </div>
  );
};
