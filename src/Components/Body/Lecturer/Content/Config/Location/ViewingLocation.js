import { useEffect, useContext } from "react";
import { Table, message, Tag, Popconfirm, Button } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Data } from "../../../../Body";

export const ViewingLocation = (props) => {
  //get function from LecturerLocation
  const setLocationSectionView = props.setLocationSectionView,
    setEditLocation = props.setEditLocation,
    setFinalIdOfTheList = props.setFinalIdOfTheList,
    setIsLoading= props.setIsLoading,
    LocationsList = props.LocationsList,
    isLoading = props.isLoading,
    refresh = props.refresh

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
            {location.status ? (
              <>
                <EditOutlined
                  style={Object.assign(
                    { color: "#7a7a7a" },
                    { opacity: 0.35 },
                    { cursor: "not-allowed" }
                  )}
                />
                <DeleteOutlined
                  className="locationDeleteBtn"
                  style={Object.assign(
                    { color: "#7a7a7a" },
                    { opacity: 0.35 },
                    { cursor: "not-allowed" }
                  )}
                />
              </>
            ) : (
              <>
                <EditOutlined onClick={() => editLocation(location)} />
                <Popconfirm
                  placement="left"
                  description="Are you sure want to delete this location?"
                  onConfirm={() => deleteLocation(location)}
                >
                  <DeleteOutlined
                    className="locationDeleteBtn"
                  />
                </Popconfirm>
              </>
            )}
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
    setIsLoading(true);
    axios
      .delete(
        `https://meet-production-52c7.up.railway.app/api/location/delete?id=${location.id}`
      )
      .then(
        () => {
          message.success("Deleted successfully");
          setIsLoading(false);
          refresh()
        }
      )
      .catch((err) => (message.error("Deleted Failed"), setIsLoading(false)));
  };
  return (
    <div className="viewingLecturerLocations">

      {/* Table of locations */}
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={LocationsList}
        loading={isLoading}
        rowKey="id"
        key="id"
      ></Table>
    </div>
  );
};
