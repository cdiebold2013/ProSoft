var calendarTemplate = {

  handleSubmit: function () {
    var startDate = new Date($("input[name=startDate]").val()),
    numDays = $("input[name=numDays]").val(),
    countryCode = $("input[name=countryCode]").val(),
    month = startDate.getMonth(),
    day = startDate.getDate(),
    year = startDate.getFullYear(),
    nextMonth = month + 1,
    prevMonth = month - 1,
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    days = ["S", "M", "T", "W", "T", "F", "S"];

    console.log(startDate);
    calendarTemplate.loadCalendar(startDate);
  },
  callHoliday: function(countryCode, year, month, startDay, expMonth) {
    var request = $.ajax({
      method: "GET",
      url: "https://holidayapi.com/v1/holidays?key=b922f57e-2f17-4c1e-bdb0-4dacfe7094da&country=" + countryCode + "&year=" + year + "&month=" + month
    });

    request.done(function(data) {
      console.log(data);
      calendarTemplate.loadTemplate(startDay, expMonth, year)
    });
    request.fail(function (){
      $(".calendarView").append("<p>There are issues, please try again</p>");
    });
  },
  loadCalendar: function(startDate) {
    var html = "",
    febDays = "",
    startDate = new Date(startDate),
    month = startDate.getMonth(),
    day = startDate.getDate(),
    year = startDate.getFullYear(),
    nextMonth = month + 1,
    prevMonth = month -1,
    nextDate = new Date(nextMonth + " 1," + year),
    weekdays = nextDate.getDay(),
    weekdays2 = weekdays,
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    dayInMonth = ["31", "" + febDays + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"],
    days = ["S", "M", "T", "W", "T", "F", "S"],
    monthDays = dayInMonth[month];

    if (month === 1) {
      febDays = calendarTemplate.getFebDays(year);
    }
    html = calendarTemplate.buildCalendarHeader(months[month], year);
    html += calendarTemplate.buildCalendarInside(weekdays, weekdays2, monthDays, day);

    $(".calendarView").append(html);

  },
  getFebDays: function(year) {
    if ((year % 100 != 0) && (year % 4) || (year % 400 === 0)){
      return 29;
    } else {
      return 28;
    }
  },
  buildCalendarHeader: function(monthName, year) {
    var htmlHeader = "";

    htmlHeader = "<table class='calendar'><tr class ='dayHeader'><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr><tr class='month'><th colspan='7'>" + monthName + " " + year + "</th></tr>";
    return htmlHeader;
  },
  buildCalendarInside: function(weekdays, weekdays2, monthDays, day) {
    var counter = 1
    htmlInside = "";

    while (weekdays > 0) {
      htmlInside += "<td class 'monthPre'></td>";
      weekdays --;

    }
    while (counter <= monthDays) {
      if(weekdays2 > 6) {
        weekdays2 = 0;
        htmlInside +="</tr><tr>";
      }
      if (counter === day) {
        htmlInside += "<td class='startDate'>" + counter + "</td>";
      } else {
        htmlInside += "<td class=''>" + counter + "</td>";
      }

      weekdays2++;
      counter++;
    }
    while (counter >= monthDays && weekdays2 <= 6) {
      htmlInside += "<td class 'monthPost'></td>";
      counter++;
      weekdays2++;
    }
    return htmlInside;
  }

};

$(document).ready(function (){
 $(".submit").on("click", calendarTemplate.handleSubmit);
});
