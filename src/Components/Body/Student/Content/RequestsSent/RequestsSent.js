import React from "react";
import { useState } from "react";
import {RequestsView} from "./RequestsView"
import { EditRequests } from "./EditRequests";

export function RequestsSent() {
  const [isSelectedBooking, setIsSelectedBooking] = useState([]);
  return (
    <>
      {isSelectedBooking.length === 0 ? (
        <RequestsView
        setIsSelectedBooking={setIsSelectedBooking}
        />
      ) : (
        <EditRequests
          isSelectedBooking={isSelectedBooking}
          setIsSelectedBooking={setIsSelectedBooking}
        />
      )}
    </>
  );
}
