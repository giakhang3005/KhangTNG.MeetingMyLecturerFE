import { message } from "antd";
import dayjs from "dayjs";
import axios from "axios";

export const useSlotLecturer = () => {
  const LecturerEditSlotFunction = (
    slot,
    setCreatedSlotView,
    setEditingSlot
  ) => {
    //Time handling
    const now = new dayjs();
    const dateSplit = slot.meetingDay?.split("/");
    const startTimeSplit = slot.startTime?.split(":");
    const slotBeginningTime = new dayjs()
      .date(dateSplit[0])
      .month(dateSplit[1] - 1)
      .year(dateSplit[2])
      .hour(startTimeSplit[0])
      .minute(startTimeSplit[1]);

    //havent accept anyone
    if (slot.studentName === null || slot.studentName === "") {
      //slot in the past
      if (slotBeginningTime < now) {
        message.error(`You can not edit slot in the past`);
      } else {
        if (slot.status === false) {
          message.error(`You can not edit Not Avaiable slot`);
        } else {
          setCreatedSlotView("edit");
          setEditingSlot(slot);
        }
      }
    } else {
      //aldready accept someone
      message.error(
        `You can not edit this slot because you have already accepted ${slot.studentName} at ${slot.startTime} ${slot.meetinDay}`
      );
    }
  };

  const LecturerCreateSlotFunction = (setCreatedSlotView) => {
    setCreatedSlotView("create");
  };

  const LecturerDeleteSlotFunction = (slot, setDeleteLoading, getData) => {
    //Time handling
    const now = new dayjs();
    const dateSplit = slot.meetingDay.split("/");
    const startTimeSplit = slot.startTime.split(":");
    const slotBeginningTime = new dayjs()
      .date(dateSplit[0])
      .month(dateSplit[1] - 1)
      .year(dateSplit[2])
      .hour(startTimeSplit[0])
      .minute(startTimeSplit[1]);

    //havent accept anyone
    if (slot.studentName === null || slot.studentName === "") {
      //slot in the past
      if (slotBeginningTime < now) {
        message.error(`You can not delete slot in the past`);
      } else {
        //delete success
        if (slot.status === false) {
          message.error(`You can not delete Not Avaiable slot`);
        } else {
          setDeleteLoading(true);
          axios
            .delete(
              `https://meet-production-52c7.up.railway.app/api/v1/slot?id=${slot.id}`
            )
            .then((res) => {
              if (res.data.data === "BookingExist") {
                message.error(
                  "Please decline all booking requests of this slot to delete"
                );
              } else {
                message.success(
                  `Deleted slot ${slot.meetingDay} (${slot.startTime} - ${slot.endTime})`
                );
                message.info("It may take times to refresh the slot view ");
                getData();
              }
            })
            .catch((err) => console.error(err))
            .finally(() => setDeleteLoading(false));
        }
      }
    } else {
      //aldready accept someone
      message.error(
        `You can not delete this slot because you have already accepted ${slot.studentName} at ${slot.startTime} ${slot.meetingDay}`
      );
    }
  };

  return {
    LecturerEditSlotFunction,
    LecturerCreateSlotFunction,
    LecturerDeleteSlotFunction,
  };
};
