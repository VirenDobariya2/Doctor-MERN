import { useState } from 'react';

// const formatTime = (timeString) => {
//   const [hours, minutes] = timeString.split(':').map(Number);
//   const ampm = hours >= 12 ? 'pm' : 'am';
//   const formattedHours = hours % 12 || 12;
//   const formattedMinutes = minutes.toString().padStart(2, '0');
//   return `${formattedHours}:${formattedMinutes} ${ampm}`;
// };

const CustomTimePicker = ({ value, onChange, availableTimes }) => {
  const [selectedTime, setSelectedTime] = useState(value || '');

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setSelectedTime(newTime);
    onChange(newTime);
  };

  return (
    <div className="relative">
      <select
        value={selectedTime}
        onChange={handleTimeChange}
        className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        disabled={availableTimes.length === 0}
      >
        <option value="" disabled>Select a time</option>
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomTimePicker;
