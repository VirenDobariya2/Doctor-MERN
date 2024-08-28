import moment from "moment";
import React from "react";
import instance from "../../axiosINstance/axiosInstance";

const SlotList = ({ slots }) => {
  const bookThisSlot = async () => {
    if (slots.status === "booked" || slots.status === "cancelled") return;
    await BookList();
  };
  const BookList = async () => {
    try {
      const response = await instance({
        url: "appoinment/bookslot",
        method: "PATCH",
        data: { id: slots._id },
      });
      console.log('Your appointment is fixed', response);   
    } catch (error) {
        console.error('Failed to book slot:', error);
    }
  };

  return (
    <>
      <div
        onClick={bookThisSlot}
        className={`cursor-pointer p-2 ${
          slots.status === "booked" ? "bg-red-300" : "bg-green-300"
        }`}
      >
        <p>{moment(slots.date).format("MM-DD")}</p>
        {slots.time && <p>{moment(slots.time, "HH:mm").format("h:mm a")}</p>}
        <p>{slots.status}</p>
      </div>
    </>
  );
};

export default SlotList;
