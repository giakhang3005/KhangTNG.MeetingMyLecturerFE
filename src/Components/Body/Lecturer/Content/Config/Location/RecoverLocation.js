import { Table, message, Tag, Popconfirm, Button, Popover } from "antd";
import axios from "axios";
import { UndoOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Data } from "../../../../Body";

export const RecoverLocation = ({ deletedLoc, deletedLocLoading, refresh }) => {
  //columns of table
  const columns = [
    // {
    //   key: "1",
    //   title: "ID",
    //   //location.id
    //   dataIndex: "id",
    // },
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
      title: "Created by",
      render: (location) => {
        return location.status ? (
          <Tag color="orange">Admin</Tag>
        ) : (
          <Tag color="green">You</Tag>
        );
      },
    },
    {
      key: "5",
      title: "",
      render: (location) => {
        return (
          <>
            <Popconfirm
              title="Are you sure want to recover this location?"
              onConfirm={() => handleRecover(location)}
            >
              <UndoOutlined
                style={Object.assign(
                  { color: "red" },
                  { fontSize: "18px" },
                  { cursor: "pointer" }
                )}
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const handleRecover = (location) => {
    const newLocation = {
      id: location.id,
      name: location.name,
      address: location.address,
      status: location.status,
      lecturerId: location.id,
      toggle: true,
    };

    setIsLoading(true);
    axios
      .put(
        `https://meet-production-52c7.up.railway.app/api/location/update/${newLocation.id}`,
        newLocation
      )
      .then((res) => {
        console.log(res)
        message.success(`Recovered location ${newLocation.name}`);
        refresh();
      })
      .catch((err) => (console.error(err)))
      .finally((() => setIsLoading(false)))
  };

  return (
    <div className="viewingLecturerLocations">
      {/* Table of locations */}
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={deletedLoc}
        loading={deletedLocLoading || isLoading}
        rowKey="id"
        key="id"
      ></Table>
    </div>
  );
};
