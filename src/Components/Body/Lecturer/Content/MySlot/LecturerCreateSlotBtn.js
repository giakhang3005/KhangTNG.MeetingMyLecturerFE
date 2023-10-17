import { Button } from "antd";
import {
  PlusCircleFilled,
  DownloadOutlined,
  RedoOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { useSlotLecturer } from "../../../../../Hooks/Lecturer/useSlotLecturer";

export const LecturerCreateSlotBtn = (props) => {
  const setCreatedSlotView = props.setCreatedSlotView;
  const { LecturerCreateSlotFunction } = useSlotLecturer();
  return (
    <span className="btnContainer">
      {/* <FloatButton icon={<PlusCircleFilled />} tooltip={<div>Tạo slot</div>} onClick={onClickCreateBtn}/> */}
      <Button icon={<RedoOutlined />} style={{margin: '0 7px 0 0'}}>Refresh</Button>
      <Button
        className="createSlotBtn"
        icon={<PlusCircleFilled />}
        onClick={() => LecturerCreateSlotFunction(setCreatedSlotView)}
        style={{margin: '0 7px 0 0'}}
      >
        Create slot
      </Button>
      {/* <Button icon={<><DownloadOutlined /></>}>Excel</Button> */}
    </span>
  );
};
