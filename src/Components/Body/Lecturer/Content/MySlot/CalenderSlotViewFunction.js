import { message } from "antd";
export const LecturerEditSlotFunction = (
  slot,
  setCreatedSlotView,
  setEditingSlot
) => {
    //havent accept anyone
  if (slot.student === null || slot.student === "") {
    setCreatedSlotView("edit");
    setEditingSlot(slot);
  } else {
    //aldready accept someone
    message.error(`You can not edit this slot because you have already accepted ${slot.student} at ${slot.startTime} ${slot.date}`)
  }
};

export const LecturerCreateSlotFunction = (setCreatedSlotView) => {
    setCreatedSlotView("create");
};

export const LecturerDeleteSlotFunction = (slot) => {
  console.log(slot);
};
