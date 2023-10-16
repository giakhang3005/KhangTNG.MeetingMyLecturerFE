import { useContext, useState } from "react";
import { Data } from "../../Body";
import { AdminDashboard } from "./Dashboard/AdminDashboard";
import { UsersManage } from "./UsersManage/Users/UsersManage";
import { SlotsManage } from "./SlotsManage/SlotsManage";
import { BookingManage } from "./BookingManage/BookingManage";
import { LecturersManage } from "./UsersManage/Lecturers/LecturersManage";
import { StudentsManage } from "./UsersManage/Student/StudentsManage";
import { EditUser } from "./UsersManage/Users/EditUser";
import { AddUser } from "./UsersManage/Users/AddUser";
import { Subjects } from "./Subjects/Subjects";
import { PublicLocations } from "./PublicLocations/PublicLocations";
import { EditSubjects } from "./Subjects/EditSubjects";
import { AddLocations } from "./PublicLocations/AddLocations";
import { EditLocations } from "./PublicLocations/EditLocations";
import { AddSubjects } from "./Subjects/AddSubjects";
import { EditLecturers } from "./UsersManage/Lecturers/EditLecturers";
import { EditStudent } from "./UsersManage/Student/EditStudent";
import { MajorsManage } from "./Major/MajorsManage";


export const AdminContent = () => {
  const { menuOpt, setMenuOpt } = useContext(Data);
  const [userEdit, setUserEdit] = useState({});
  const [subjectEdit, setSubjectEdit] = useState({});
  const [locationEdit, setLocationEdit] = useState({});
  const [lecturerEdit, setlecturerEdit] = useState({});
  const [studentEdit, setStudentEdit] = useState({});

  return (
    <div className="LecturerContent">
      <div className="LecturerShow">
        {/* CreatedSlot */}
        {menuOpt === "adminDashboard" ? (
          <AdminDashboard />
        ) : menuOpt === "usersManage" ? (
          <UsersManage setMenuOpt={setMenuOpt} setUserEdit={setUserEdit} />
        ) : menuOpt === "lecturersManage" ? (
          <LecturersManage setlecturerEdit={setlecturerEdit} setMenuOpt={setMenuOpt}/>
        ) : menuOpt === "editLecturers" ? (
          <EditLecturers lecturerEdit={lecturerEdit} setMenuOpt={setMenuOpt}/>
        ) : menuOpt === "studentsManage" ? (
          <StudentsManage setMenuOpt={setMenuOpt} setStudentEdit={setStudentEdit} />
        ) : menuOpt === "editStudent" ? (
          <EditStudent studentEdit={studentEdit} setMenuOpt={setMenuOpt} />
        ) : // request
        menuOpt === "slotsManage" ? (
          <SlotsManage />
        ) : menuOpt === "bookingsManage" ? (
          <BookingManage />
        ) : menuOpt === "majorsManage" ? (
          <MajorsManage setMenuOpt={setMenuOpt} />
        ) : menuOpt === "subjectsManage" ? (
          <Subjects setSubjectEdit={setSubjectEdit} setMenuOpt={setMenuOpt} />
        ) : menuOpt === "addSubjects" ? (
          <AddSubjects setMenuOpt={setMenuOpt}/>
        ) : menuOpt === "editSubjects" ? (
          <EditSubjects setMenuOpt={setMenuOpt} subjectEdit={subjectEdit}/>
        ) : menuOpt === "publicLocationsManage" ? (
          <PublicLocations setMenuOpt={setMenuOpt} setLocationEdit={setLocationEdit} />
        ) : menuOpt === "addLocationsManage" ? (
          <AddLocations setMenuOpt={setMenuOpt} />
        ) : menuOpt === "editLocationsManage" ? (
          <EditLocations setMenuOpt={setMenuOpt} locationEdit={locationEdit}/>
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
