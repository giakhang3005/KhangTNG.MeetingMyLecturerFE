import { Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

export const AddLocationBtn = (props) => {
  const setLocationSectionView = props.setLocationSectionView,
    LocationsList = props.LocationsList,
    setFinalIdOfTheList = props.setFinalIdOfTheList;

  //get final id of existed list
  const finalIdOfTheList = () => {
    let lengthOfLocationLists = LocationsList.length,
        finalLocationId = LocationsList[lengthOfLocationLists - 1].id
        setFinalIdOfTheList(finalLocationId);
  }

  //redirect to adding location
  const handleAddLocation = () => {
    finalIdOfTheList();
    setLocationSectionView("add");
  };

  return (
    <>
      {/* Add location button */}
      <Button
        className="addLocationBtn"
        onClick={handleAddLocation}
        icon={<PlusCircleFilled />}
      >
        Add location
      </Button>
    </>
  );
};
