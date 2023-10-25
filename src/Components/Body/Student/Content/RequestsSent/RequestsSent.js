import {React, useContext} from "react";
import { useState } from "react";
import { RequestsView } from "./RequestsView";
import { RequestsInfo } from "./RequestsInfo";
import axios from "axios";
import { Data } from "../../../Body";

export function RequestsSent() {
  const [requestsView, setRequestsView] = useState("view");
  const [isSelectedBooking, setIsSelectedBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);
  const [requestsList, setRequestsList] = useState([]);

  const { user } = useContext(Data);

  const getData = () => {
    if (
      localStorage.getItem("sentRequests") !== null &&
      localStorage.getItem("sentRequests") !== "undefined"
    ) {
      setHideLoading(true);
      setRequestsList(JSON.parse(localStorage.getItem("sentRequests")));
    } else {
      setLoading(true);
    }
    axios
      .get(`https://meet-production-52c7.up.railway.app/api/booking/${user.id}`)
      .then(
        (response) => (
          setRequestsList(response.data),
          localStorage.setItem("sentRequests", JSON.stringify(response.data))
        )
      )
      .catch((err) => console.error(err))
      .finally(() => (setLoading(false), setHideLoading(false)));
  };

  
  return (
    <>
      {requestsView === "view" ? (
        <RequestsView
          setIsSelectedBooking={setIsSelectedBooking}
          setRequestsView={setRequestsView}
          hideLoading={hideLoading}
          loading={loading}
          requestsList={requestsList}
          getData={getData}
        />
      ) : requestsView === "info" ? (
        <RequestsInfo
          isSelectedBooking={isSelectedBooking}
          setIsSelectedBooking={setIsSelectedBooking}
          setRequestsView={setRequestsView}
          getData={getData}
        />
      ) : (
        <></>
      )}
    </>
  );
}
