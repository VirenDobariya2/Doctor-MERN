import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const localizer = momentLocalizer(moment);
// const today  = new Date();

const DoctorSlot = () => {
  const [slots, setSlots] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [events, setEvent] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [selectedDateSlots, setSelectedDateSlots] = useState([]);

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    date: "",
    time: "",
    status: "available",
  });

  const onOpenModal = (event) => {
    console.log('event',event)
    setModalData({
      date: moment(event.start).format("YYYY-MM-DD"),
      time: moment(event.time).format("HH:mm"),
      status: event.availablity || "available",
      slotId: event.slotId,
    });
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  const Slots = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/api/doctors/slots",
      {
        headers: { authorization: token },
      }
    );
    const now = moment();
    const futureSlots = response.data.filter(
      (slot) =>
        moment(slot.date).isAfter(now) ||
        (moment(slot.date).isSame(now, "day") &&
          moment(slot.time, "HH:mm").isAfter(now))
    );
    setSlots(futureSlots);
    // console.log(response.data);
    // setSlots(response.data);
  };

 
  useEffect(() => {

    Slots();
  }, []);

  // Handle slot creation
  const handleCreateSlot = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/doctors/slots",
        {
          startDate,
          endDate,
          workingHours,
        },
        { headers: { authorization: token } }
      );
      // setSlots([...slots, ...response.data]);
      setStartDate("");
      setEndDate("");
      setWorkingHours("");
    } catch (error) {
      console.error(
        "Error creating slot:",
        error.response?.data || error.message
      );
    }
  };

  const handleUpdateSlot = async () => {
    if (!modalData) return;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/doctors/updateslots`,

        { slotId: modalData.slotId, available: modalData.status, date: modalData.date, time: modalData.time },
        // { slotId: modalData.slotId, available: modalData.status },
        { headers: { authorization: token } }
      );
      const filterSlots = slots.filter((sl)=>sl._id != response.data._id);
      Slots()
      onCloseModal()
      // setSlots((prevState)=>[...prevState,filterSlots])

    } catch (error) {
      console.error(
        "Error updating slot:",
        error.response?.data || error.message
      );
    }
  };

  const handleDateClick = (date) => {
    const filteredSlots = slots.filter(
      (slot) =>
        new Date(slot.date).toLocaleDateString() ===
        new Date(date).toLocaleDateString()
    );
    setSelectedDateSlots(filteredSlots);
  };

  const handleSelectEvent = (event) => {
    onOpenModal(event);
  };

  const eventStyleGetter = (event) => {
    // let backgroundColor = event.availablity === "available" ? "blue" : "red" ;
    let backgroundColor = "";

    // Check the availability and set the background color
    if (event.availablity === "available") {
      backgroundColor = "blue";
    } else if (event.availablity === "booked") {
      backgroundColor = "red";
    } else if (event.availablity === "cancelled") {
      backgroundColor = "gray";
    }

    // console.log("Event:", event.availablity);
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  // const EventComponent = ({ event }) => (
  //   <div>
  //     <span>
  //       <strong>{event.title}</strong>
  //       <br />
  //       {/* <em>{event.availablity}</em> */}
  //       {/* <br /> */}
  //       {event.time && <span>Time: {event.time}</span>}
  //     </span>
  //     <button className="bg-yellow-500 text-white px-2 py-1 rounded mt-2">
  //       Update
  //     </button>
  //   </div>
  // );


  useEffect(()=>{
  

  const eventsnew = slots.map((slot) => ({
    title: `Slot: ${slot.time}:00`,
    start: new Date(slot.date),
    end: new Date(slot.date),
    availablity: slot.status,
    slotId: slot._id,
    allDay: true,
    time:moment(slot.time,'H:mm')
  }));
  // console.log(slots,'eventsnew',eventsnew)
  setEvent(eventsnew)
  },[slots])

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Doctor Slot Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Working Hours
          </label>
          <input
            type="text"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            placeholder="e.g., Total Slots"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button
        onClick={handleCreateSlot}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Slot
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Select a Date to View Slots
      </h2>
      <div style={{ height: 500 }}>
        {
          events && 
          <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={(slotInfo) => handleDateClick(slotInfo.start)}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          // components={{ event: EventComponent }}

          selectable
          style={{ height: 700 }}
        />
        }

      </div>

      <Modal open={open} onClose={onCloseModal} center>
        <div className="w-96 h-96">
          <h2 className="text-xl font-bold mb-4">Update Slot</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={modalData.date}
              onChange={(e) =>
                setModalData({ ...modalData, date: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              value={modalData.time}
              onChange={(e) =>
                setModalData({ ...modalData, time: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={modalData.status}
              onChange={(e) =>
                setModalData({ ...modalData, status: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleUpdateSlot}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={onCloseModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default DoctorSlot;
