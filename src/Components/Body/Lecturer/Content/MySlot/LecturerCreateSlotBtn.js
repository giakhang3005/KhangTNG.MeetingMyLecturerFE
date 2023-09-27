import { Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { LecturerCreateSlotFunction } from "./CalenderSlotViewFunction";

export const LecturerCreateSlotBtn = (props) => {
  const setCreatedSlotView = props.setCreatedSlotView;
  return (
    <>
      {/* <FloatButton icon={<PlusCircleFilled />} tooltip={<div>Tạo slot</div>} onClick={onClickCreateBtn}/> */}
      <Button
        className="createSlotBtn"
        icon={<PlusCircleFilled />}
        shape="round"
        onClick={() => LecturerCreateSlotFunction(setCreatedSlotView)}
      >
        Create slot
      </Button>
    </>
  );
};
