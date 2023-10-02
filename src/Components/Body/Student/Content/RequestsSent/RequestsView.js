import React from "react";
import { Typography, Tabs, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Accept, Decline, Pending } from "./RequestStatusTag";
import { RequestsViewAll } from "./RequestsViewAll";
import { RequestsViewPending } from "./RequestsViewPending";
import { RequestsViewAccepted } from "./RequestsViewAccepted";
import { RequestsViewDeclined } from "./RequestsViewDeclined";

export const RequestsView = (props) => {
  const setIsSelectedBooking = props.setIsSelectedBooking,
    setRequestsView = props.setRequestsView;
  const { Title } = Typography;

  const items = [
    {
      key: "all",
      label: "All",
      children: (
        <RequestsViewAll
          setIsSelectedBooking={setIsSelectedBooking}
          setRequestsView={setRequestsView}
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
        />
      ),
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        REQUESTS SENT
      </Title>
      <Tabs defaultActiveKey="all" items={items} />
    </>
  );
};
