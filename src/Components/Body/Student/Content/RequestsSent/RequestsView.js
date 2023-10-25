import { React, useEffect, useContext, useState } from "react";
import { Typography, Tabs, Spin, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { RequestsViewAll } from "./RequestsViewAll";
import { RequestsViewPending } from "./RequestsViewPending";
import { RequestsViewAccepted } from "./RequestsViewAccepted";
import { RequestsViewDeclined } from "./RequestsViewDeclined";


export const RequestsView = ({
  setIsSelectedBooking,
  setRequestsView,
  hideLoading,
  loading,
  requestsList,
  getData,
}) => {
  const { Title } = Typography;

  useEffect(() => {
    getData();
  }, []);

  const items = [
    {
      key: "all",
      label: "All",
      children: (
        <RequestsViewAll
          setIsSelectedBooking={setIsSelectedBooking}
          setRequestsView={setRequestsView}
          requestsList={requestsList}
        />
      ),
    },
    {
      key: "pending",
      label: "Pending",
      children: (
        <RequestsViewPending
          setIsSelectedBooking={setIsSelectedBooking}
          setRequestsView={setRequestsView}
          requestsList={requestsList}
        />
      ),
    },
    {
      key: "accepted",
      label: "Accepted",
      children: (
        <RequestsViewAccepted
          setIsSelectedBooking={setIsSelectedBooking}
          setRequestsView={setRequestsView}
          requestsList={requestsList}
        />
      ),
    },
    {
      key: "declined",
      label: "Declined",
      children: (
        <RequestsViewDeclined
          setIsSelectedBooking={setIsSelectedBooking}
          setRequestsView={setRequestsView}
          requestsList={requestsList}
        />
      ),
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        REQUESTS SENT
        <Button
          icon={<ReloadOutlined />}
          onClick={getData}
          loading={loading || hideLoading}
        >
          {hideLoading ? "Checking for updates..." : "Refresh"}
        </Button>
      </Title>
      <Spin spinning={loading}>
        <Tabs defaultActiveKey="all" items={items} />
      </Spin>
    </>
  );
};
