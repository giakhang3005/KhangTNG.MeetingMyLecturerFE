import {Button} from 'antd'
import {PlusCircleFilled} from '@ant-design/icons'

export const AddLocationBtn = (props) => {
    const setLocationSectionView = props.setLocationSectionView
  return (
    <>
      {/* Add location button */}
      <Button
        className="addLocationBtn"
        onClick={() => setLocationSectionView("add")}
        icon={<PlusCircleFilled />}
      >
        Add location
      </Button>
    </>
  );
};
