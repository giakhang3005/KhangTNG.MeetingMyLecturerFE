import { useQuery } from "@tanstack/react-query";
import { Button, Typography, Table } from "antd";
import {
  PlusCircleFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export const ViewingLocation = (props) => {
  const setLocationSectionView = props.setLocationSectionView;
  const { Title, Text } = Typography;

  //fetching data
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

  const editLocation = (location) => {
    console.log(location);
  };

  const deleteLocation = (location) => {
    console.log(location);
  };
  return (
    <div className="viewingLecturerLocations">
      <Button
        className="addLocationBtn"
        onClick={() => setLocationSectionView("add")}
        icon={<PlusCircleFilled />}
      >
        Add location
      </Button>

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
