import { useContext } from "react";
import { Data } from "../../Body";
import {AdminDashboard} from "./Dashboard/AdminDashboard"
import { UsersManage } from "./UsersManage/UsersManage"
import { SlotsManage } from "./SlotsManage/SlotsManage"
import {BookingManage} from "./BookingManage/BookingManage"

export const AdminContent = () => {
  const { menuOpt} = useContext(Data);
  return (
    <div className="LecturerContent">
      <div className="LecturerShow">
        {/* CreatedSlot */}
        {menuOpt === "adminDashboard" ? (
           <AdminDashboard />
        ) : menuOpt === "usersManage" ? (
          <UsersManage />
        ) : // request
        menuOpt === "slotsManage" ? (
          <SlotsManage />
        ) : menuOpt === "bookingsManage" ? (
          <BookingManage />
        ) : (
          <></>
        )}
      </div>
      
    </div>
  );
};
