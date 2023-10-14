import { useContext, useState } from "react";
import { Data } from "../../Body";
import { AdminDashboard } from "./Dashboard/AdminDashboard";
import { UsersManage } from "./UsersManage/UsersManage";
import { SlotsManage } from "./SlotsManage/SlotsManage";
import { BookingManage } from "./BookingManage/BookingManage";
import { LecturersManage } from "./UsersManage/LecturersManage";
import { StudentsManage } from "./UsersManage/StudentsManage";
import { EditUser } from "./UsersManage/EditUser";
import { AddUser } from "./UsersManage/AddUser";
import { Subjects } from "./Subjects/Subjects";
import { PublicLocations } from "./PublicLocations/PublicLocations";
import { EditSubjects } from "./Subjects/EditSubjects";
import { AddLocations } from "./PublicLocations/AddLocations";

export const AdminContent = () => {
  const { menuOpt, setMenuOpt } = useContext(Data);
  const [userEdit, setUserEdit] = useState({});
  const [subjectEdit, setSubjectEdit] = useState({});

  return (
    <div className="LecturerContent">
      <div className="LecturerShow">
        {/* CreatedSlot */}
        {menuOpt === "adminDashboard" ? (
          <AdminDashboard />
        ) : menuOpt === "usersManage" ? (
          <UsersManage setMenuOpt={setMenuOpt} setUserEdit={setUserEdit} />
        ) : menuOpt === "lecturersManage" ? (
          <LecturersManage />
        ) : menuOpt === "studentsManage" ? (
          <StudentsManage />
        ) : // request
        menuOpt === "slotsManage" ? (
          <SlotsManage />
        ) : menuOpt === "bookingsManage" ? (
          <BookingManage />
        ) : menuOpt === "subjectsManage" ? (
          <Subjects setSubjectEdit={setSubjectEdit} setMenuOpt={setMenuOpt} />
        ) : menuOpt === "editSubjects" ? (
          <EditSubjects setMenuOpt={setMenuOpt} subjectEdit={subjectEdit}/>
        ) : menuOpt === "publicLocationsManage" ? (
          <PublicLocations setMenuOpt={setMenuOpt} />
        ) : menuOpt === "addLocationsManage" ? (
          <AddLocations setMenuOpt={setMenuOpt} />
        ) : menuOpt === "editUser" ? (
          <EditUser setMenuOpt={setMenuOpt} setUserEdit={setUserEdit} userEdit={userEdit} />
        ) : menuOpt === "addUser" ? (
          <AddUser setMenuOpt={setMenuOpt} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
