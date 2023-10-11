import { Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useSlotLecturer } from "../../../../../Hooks/Lecturer/useSlotLecturer";

export const LecturerCreateSlotBtn = (props) => {
  const setCreatedSlotView = props.setCreatedSlotView;
  const { LecturerCreateSlotFunction } = useSlotLecturer();
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
