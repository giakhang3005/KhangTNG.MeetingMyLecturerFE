import { AddingLocation } from "./AddingLocation";
import { ViewingLocation } from "./ViewingLocation";
import { useState } from "react";

export const LecturerLocation = () => {
  const [locationSectionView, setLocationSectionView] = useState('view');
  return (
    <>
      {locationSectionView === 'add' ? (
        <AddingLocation />
      ) : (
        <ViewingLocation setLocationSectionView={setLocationSectionView}/>
      )}
    </>
  );
};
