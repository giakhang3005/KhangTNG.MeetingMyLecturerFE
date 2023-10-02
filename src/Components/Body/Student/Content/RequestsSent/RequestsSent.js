import React from "react";
import { useState } from "react";
import { RequestsView } from "./RequestsView";
import { RequestsInfo } from "./RequestsInfo";

export function RequestsSent() {
  const [requestsView, setRequestsView] = useState("view");
  const [isSelectedBooking, setIsSelectedBooking] = useState([]);
  return (
    <>
      {requestsView === "view" ? (
        <RequestsView
          setIsSelectedBooking={setIsSelectedBooking}
          setRequestsView={setRequestsView}
        />
      ) : requestsView === "info" ? (
        <RequestsInfo
          isSelectedBooking={isSelectedBooking}
          setIsSelectedBooking={setIsSelectedBooking}
          setRequestsView={setRequestsView}
        />
      ) : (
        <></>
      )}
    </>
  );
}
