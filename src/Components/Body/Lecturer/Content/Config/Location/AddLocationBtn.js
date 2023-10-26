import { Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

export const AddLocationBtn = (props) => {
  const setLocationSectionView = props.setLocationSectionView,
    isLoading = props.isLoading;

  //redirect to adding location
  const handleAddLocation = () => {
    setLocationSectionView("add");
  };

  return (
    <>
      {/* Add location button */}
      <Button
        disabled={isLoading}
        className="addLocationBtn"
        onClick={handleAddLocation}
        icon={<PlusCircleFilled />}
      >
        Add location
      </Button>
    </>
  );
};
