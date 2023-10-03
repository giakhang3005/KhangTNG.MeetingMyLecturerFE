import { message } from "antd";
import dayjs from "dayjs";

export const LecturerEditSlotFunction = (
  slot,
  setCreatedSlotView,
  setEditingSlot
) => {
  //Time handling
  const now = new dayjs();
  const dateSplit = slot.date.split("/");
  const startTimeSplit = slot.startTime.split(":");
  const slotBeginningTime = new dayjs()
    .date(dateSplit[0])
    .month(dateSplit[1] - 1)
    .year(dateSplit[2])
    .hour(startTimeSplit[0])
    .minute(startTimeSplit[1]);

  //havent accept anyone
  if (slot.student === null || slot.student === "") {
    //slot in the past
    if (slotBeginningTime < now) {
      message.error(`You can not edit slot in the past`);
    } else {
      setCreatedSlotView("edit");
      setEditingSlot(slot);
    }
  } else {
    //aldready accept someone
    message.error(
      `You can not edit this slot because you have already accepted ${slot.student} at ${slot.startTime} ${slot.date}`
    );
  }
};

export const LecturerCreateSlotFunction = (setCreatedSlotView) => {
  setCreatedSlotView("create");
};

export const LecturerDeleteSlotFunction = (slot) => {
  //Time handling
  const now = new dayjs();
  const dateSplit = slot.date.split("/");
  const startTimeSplit = slot.startTime.split(":");
  const slotBeginningTime = new dayjs()
    .date(dateSplit[0])
    .month(dateSplit[1] - 1)
    .year(dateSplit[2])
    .hour(startTimeSplit[0])
    .minute(startTimeSplit[1]);

  //havent accept anyone
  if (slot.student === null || slot.student === "") {
    //slot in the past
    if (slotBeginningTime < now) {
      message.error(`You can not delete slot in the past`);
    } else {
      //delete success
      message.success(`Deleted slot ${slot.date} (${slot.startTime} - ${slot.endTime})`)
    }
  } else {
    //aldready accept someone
    message.error(
      `You can not delete this slot because you have already accepted ${slot.student} at ${slot.startTime} ${slot.date}`
    );
  }
};
