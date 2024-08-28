 function formatTime12Hour(hour) {
    const suffix = hour >= 12 ? 'pm' : 'am';
    const adjustedHour = hour % 12 || 12; 
    return `${adjustedHour}:00 ${suffix}`;
  }
  


   const createDateWithDayOnly = (day) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = new Date(year, month, day);
  
    return date;
  };


 function convertTo24Hour(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'pm' && hours !== 12) hours += 12;
    if (period === 'am' && hours === 12) hours = 0;
    return hours;
  }

  module.exports = {convertTo24Hour,createDateWithDayOnly,formatTime12Hour}
  