import { AddingLocation } from "./AddingLocation";
import { ViewingLocation } from "./ViewingLocation";
import {EditingLocation} from "./EditingLocation";
import { useState } from "react";

export const LecturerLocation = ({setMenuOpt}) => {
  //state checking action of user in LecturerLocation
  const [locationSectionView, setLocationSectionView] = useState("view");
  const [editLocation, setEditLocation] = useState({});
  const [finalIdOfTheList , setFinalIdOfTheList] = useState('');
  return (
    <>
      {/* Adding location */}
      {locationSectionView === "add" ? (
        <AddingLocation setLocationSectionView={setLocationSectionView} finalIdOfTheList={finalIdOfTheList}/>
      ) : // Edit location
      locationSectionView === "edit" ? (
        <EditingLocation setLocationSectionView={setLocationSectionView} editLocation={editLocation} />
      ) : (
        // View location -> default
        <ViewingLocation setLocationSectionView={setLocationSectionView} setEditLocation={setEditLocation} setFinalIdOfTheList={setFinalIdOfTheList} setMenuOpt={setMenuOpt}/>
      )}
    </>
  );
};