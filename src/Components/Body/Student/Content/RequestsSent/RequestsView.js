import { React, useEffect, useContext, useState } from "react";
import { Typography, Tabs, Spin, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { RequestsViewAll } from "./RequestsViewAll";
import { RequestsViewPending } from "./RequestsViewPending";
import { RequestsViewAccepted } from "./RequestsViewAccepted";
import { RequestsViewDeclined } from "./RequestsViewDeclined";
import axios from "axios";
import { Data } from "../../../Body";

export const RequestsView = (props) => {
  const setIsSelectedBooking = props.setIsSelectedBooking,
    setRequestsView = props.setRequestsView;

  const { Title } = Typography;
  const { user } = useContext(Data);
  const [loading, setLoading] = useState(false);
  const [requestsList, setRequestsList] = useState([]);

  const getData = () => {
    setLoading(true);
    axios
      .get(`https://meet-production-52c7.up.railway.app/api/booking/status/${user.id}`)
      .then((response) => (console.log(response.data), setLoading(false)))
      .catch((err) => (console.error(err), setLoading(false)));
  };

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
        <Button icon={<ReloadOutlined />} onClick={getData}>
          Refresh
        </Button>
      </Title>
      <Spin spinning={loading}>
        <Tabs defaultActiveKey="all" items={items} />
      </Spin>
    </>
  );
};
