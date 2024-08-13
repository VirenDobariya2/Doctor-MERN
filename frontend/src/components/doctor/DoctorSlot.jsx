import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const DoctorSlot = ({ doctorId }) => {
  const [slots, setSlots] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [selectedDateSlots, setSelectedDateSlots] = useState([]);
  const [editingSlot, setEditingSlot] = useState(null);

  // Fetch slots when the component mounts
  useEffect(() => {
    const Slots = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/doctors/slots",
        {
          headers: { authorization: token },
        }
      );
      console.log(response.data);
      setSlots(response.data);
    };
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
      setSlots([...slots, ...response.data]);
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
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "http://localhost:3000/api/doctors/update-slots",
        {
          startdate: editingSlot.startdate,
          enddate: editingSlot.enddate,
          // time: editingSlot.time,
          workingHours: editingSlot.workingHours,
        },
        { headers: { authorization: token } }
      );
      const updatedSlots = slots.map((slot) =>
        slot._id === response.data._id ? response.data : slot
      );
      setSlots(updatedSlots);
      setEditingSlot(null);
    } catch (error) {
      console.error(
        "Error updating slot:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteSlot = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete("http://localhost:3000/api/doctors/delete-slots", {
        headers: { authorization: token },
      });
      setSlots(slots.filter((slot) => slot._id !== id));
      setSelectedDateSlots(selectedDateSlots.filter((slot) => slot._id !== id));
    } catch (error) {
      console.error(
        "Error deleting slot:",
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

  const events = slots.map((slot) => ({
    title: `Slot: ${slot.time}:00`,
    start: new Date(slot.date),
    end: new Date(slot.date),
    allDay: true,
  }));

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
          placeholder="e.g., 09:00 AM - 05:00 PM"
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

    {editingSlot && (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Edit Slot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={editingSlot.startDate}
              onChange={(e) =>
                setEditingSlot({ ...editingSlot, startDate: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={editingSlot.endDate}
              onChange={(e) =>
                setEditingSlot({ ...editingSlot, endDate: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Working Hours
            </label>
            <input
              type="text"
              value={editingSlot.workingHours}
              onChange={(e) =>
                setEditingSlot({
                  ...editingSlot,
                  workingHours: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          onClick={handleUpdateSlot}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Update Slot
        </button>
        
      </div>
    )}

    <h2 className="text-2xl font-bold mt-8 mb-4">
      Select a Date to View Slots
    </h2>
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={(slotInfo) => handleDateClick(slotInfo.start)}
        selectable
        style={{ height: 500 }}
      />
    </div>

    {selectedDateSlots.length > 0 && (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Slots for {new Date(selectedDateSlots[0].date).toLocaleDateString()}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedDateSlots.map((slot) => (
            <div key={slot._id} className="p-5 border rounded shadow">
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(slot.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(slot.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Working Hours:</strong> {slot.workingHours}
              </p>
              <button
                onClick={() => setEditingSlot(slot)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteSlot(slot._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  );
};

export default DoctorSlot;


