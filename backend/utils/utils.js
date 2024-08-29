 function formatTime12Hour(hour) {
    const suffix = hour >= 12 ? 'pm' : 'am';
    const adjustedHour = hour % 12 || 12; 
    return `${adjustedHour}:00 ${suffix}`;
  }
  
//   const createDateWithDayOnly = (day) => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth(); // Months are 0-based, so add 1
//     // const date = new Date(year, month - 1, day); // Months are 0-based
//     const validDate = new Date(year, month, day);
//     // Format date to YYYY-MM-DD
//     const formattedDate = validDate.toISOString().split('T')[0];
    
//     return formattedDate;
// };



// const createDateWithDayOnly = (day, month, year) => {
//   return new Date(year, month, day);
// };

// const formatDateToYMD = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };


   const createDateWithDayOnly = (day) => {
    const today = new Date();
    console.log("today",today)
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
  