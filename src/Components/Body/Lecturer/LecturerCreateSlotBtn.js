import { FloatButton, Button, message } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

export const LecturerCreateSlotBtn = () => {
    const onClickCreateBtn = () => {
        message.success("LecturerCreateSlotBtn");
    }
  return (
    <>
      {/* <FloatButton icon={<PlusCircleFilled />} tooltip={<div>Tạo slot</div>} onClick={onClickCreateBtn}/> */}
      <Button
        className="createSlotBtn"
        icon={<PlusCircleFilled />}
        shape="round"
        onClick={onClickCreateBtn}
      >
        Tạo slot
      </Button>
    </>
  );
};
