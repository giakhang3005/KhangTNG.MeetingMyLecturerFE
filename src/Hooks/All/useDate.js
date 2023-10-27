export const useDate = () => {
  function getCurrentDate() {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return ConvertDate(date, month, year);
  }

  function getPrevDate(currDate) {
    let prevDate = "",
      prevDay = 0,
      prevMonth = 0,
      prevYear = 0;
    //number of days in months
    let yearMonthDate = [
      { name: "01", days: 31 },
      { name: "02", days: 28 },
      { name: "03", days: 31 },
      { name: "04", days: 30 },
      { name: "05", days: 31 },
      { name: "06", days: 30 },
      { name: "07", days: 31 },
      { name: "08", days: 31 },
      { name: "09", days: 30 },
      { name: "10", days: 31 },
      { name: "11", days: 30 },
      { name: "12", days: 31 },
    ];

    //split the input date to day, month, year
    let currDateSplit = currDate.split("/");

    //parse to integer
    let currDay = parseInt(currDateSplit[0]),
      currMonth = parseInt(currDateSplit[1]),
      currYear = parseInt(currDateSplit[2]);

    //check if it is leap year
    if (currYear % 4 === 0) {
      //if true set Feburary to 29 days
      yearMonthDate[1].days = 29;
    }

    //get max days of last month
    let maxDayOfPrevMonth;
    currMonth !== 1
      ? (maxDayOfPrevMonth = yearMonthDate[currMonth - 2].days)
      : (maxDayOfPrevMonth = yearMonthDate[11].days);

    //if currDay == first day of month
    if (currDay === 1) {
      //if currMonth == first month -> 31/12/last year
      if (currMonth === 1) {
        prevDay = 31;
        prevMonth = 12;
        prevYear = currYear - 1;
        //else last day of prev month
      } else {
        prevDay = maxDayOfPrevMonth;
        prevMonth = currMonth - 1;
        prevYear = currYear;
      }
      //else prev day
    } else {
      prevDay = currDay - 1;
      prevMonth = currMonth;
      prevYear = currYear;
    }

    prevDate = ConvertDate(prevDay, prevMonth, prevYear);
    return prevDate;
  }

  function getNextDate(currDate) {
    let nextDate = "",
      nextDay = 0,
      nextMonth = 0,
      nextYear = 0;
    //number of days in months
    let yearMonthDate = [
      { name: "01", days: 31 },
      { name: "02", days: 28 },
      { name: "03", days: 31 },
      { name: "04", days: 30 },
      { name: "05", days: 31 },
      { name: "06", days: 30 },
      { name: "07", days: 31 },
      { name: "08", days: 31 },
      { name: "09", days: 30 },
      { name: "10", days: 31 },
      { name: "11", days: 30 },
      { name: "12", days: 31 },
    ];

    //split the input date to day, month, year
    let currDateSplit = currDate.split("/");

    //parse to integer
    let currDay = parseInt(currDateSplit[0]),
      currMonth = parseInt(currDateSplit[1]),
      currYear = parseInt(currDateSplit[2]);

    //check if it is leap year
    if (currYear % 4 === 0) {
      //if true set Feburary to 29 days
      yearMonthDate[1].days = 29;
    }

    //get max days of current month
    let maxDayOfCurrMonth = yearMonthDate[currMonth - 1].days;

    //if currDay == last day of month -> 01/next month/year
    if (currDay === maxDayOfCurrMonth) {
      //if currMonth == last month -> 01/01/next year
      if (currMonth === 12) {
        nextDay = 1;
        nextMonth = 1;
        nextYear = currYear + 1;
        //else 01/next month/ this year
      } else {
        nextDay = 1;
        nextMonth = currMonth + 1;
        nextYear = currYear;
      }
      //else next day
    } else {
      nextDay = currDay + 1;
      nextMonth = currMonth;
      nextYear = currYear;
    }

    nextDate = ConvertDate(nextDay, nextMonth, nextYear);
    return nextDate;
  }

  function ConvertDate(date, month, year) {
    //date < 10 -> 01 02...
    if (date < 10) {
      date = "0" + date;
    }
    //month < 10 -> 01 02...
    if (month < 10) {
      month = "0" + month;
    }

    return `${date}/${month}/${year}`;
  }

  function GetWeek(selectedDate) {
    //split the string into date, month and year
    let splitDate = selectedDate.split("/"),
      DateGet = splitDate[0],
      MonthGet = splitDate[1] - 1,
      YearGet = splitDate[2],
      //add it into date format
      d = new Date(YearGet, MonthGet, DateGet),
      //get the day (thứ)
      dayInWeek = d.getDay(),
      //set min day and max day of a week
      //su mo tu we th fr sa
      minDay = 0, //sunday
      maxDay = 6, //saturday
      weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      week = {};

    //function to add date from sunday to saturday to array base on all public variables
    const addDateToArray = () => {
      //add sunday date to the array
      week = [{ day: weekDays[0], date: tempDate }];
      //add monday - saturday date to the array
      for (let j = 1; j <= maxDay; j++) {
        // console.log(tempDate)
        tempDate = getNextDate(tempDate);
        week = [...week, { day: weekDays[j], date: tempDate }];
      }
    };

    //get the sunday of the week (day = 0)
    let tempDate = selectedDate;
    if (dayInWeek === 0) {
      addDateToArray();
    } else {
      for (let i = dayInWeek; i > minDay; i--) {
        tempDate = getPrevDate(tempDate);
        if (i === minDay + 1) {
          addDateToArray();
        }
      }
    }

    return week;
  }

  const getNextWeek = (currDate) => {
    const endWeekDate = GetWeek(currDate)[6]; //Saturday of that week
    const startNextWeekDate = getNextDate(endWeekDate.date); //Sunday of next Week
    const nextWeek = GetWeek(startNextWeekDate); //Get next week

    return nextWeek;
  };

  const getPrevWeek = (currDate) => {
    const startWeekDate = GetWeek(currDate)[0]; //Sunday of that week
    const endLastWeekDate = getPrevDate(startWeekDate.date); //Saturday of prev Week
    const prevWeek = GetWeek(endLastWeekDate); //Get prev week

    return prevWeek;
  };

  const parseDate = (date) => {
    const currDate = date.split("/"),
      parseDate = currDate[0],
      parseMonth = currDate[1],
      parseYear = currDate[2];
    let d = new Date(parseYear, parseMonth, parseDate);

    return d;
  };

  const monthName = [
    { id: 1, name: "Januray" },
    { id: 2, name: "Febuary" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  return {
    getCurrentDate,
    getPrevDate,
    getNextDate,
    ConvertDate,
    getNextWeek,
    getPrevWeek,
    GetWeek,
    parseDate,
    monthName,
  };
};
