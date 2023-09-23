import { FloatButton, Button, message } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useContext} from "react";
import { Data } from "../../Body";

export const LecturerCreateSlotBtn = () => {
  const {setMenuOpt} = useContext(Data)
    const onClickCreateBtn = () => {
      // setMenuOpt("createSlot");
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
