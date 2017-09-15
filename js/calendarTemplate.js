var calendarTemplate = {

  handleSubmit: function () {
    var startDate = new Date($("input[name=startDate]").val()),
    daysToShow = parseInt($("input[name=numDays]").val())-1,
    countryCode = $("input[name=countryCode]").val();

    if($(".calendar").length > 0) {
      $(".calendar").remove();
    };

    if(startDate === "Invalid Date" || daysToShow === NaN || countryCode === "") {
      $(".calendarView").append("<p class ='calendar error'>There are issues, please try again</p>")
    } else {
      calendarTemplate.loadCalendar(startDate, daysToShow, countryCode);
    };

  },
  loadCalendar: function(startDate, daysToShow, countryCode) {
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
    html += calendarTemplate.buildCalendarInside(weekdays, weekdays2, monthDays, day, daysToShow);
    html += "</tbody></table>"
    $(".calendarView").append(html);
    calendarTemplate.callHoliday(countryCode, year, month);

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

    htmlHeader = "<table class='calendar'><tbody><tr class ='dayHeader'><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr><tr class='month'><th colspan='7'>" + monthName + " " + year + "</th></tr><tr>";
    return htmlHeader;
  },
  buildCalendarInside: function(weekdays, weekdays2, monthDays, day, daysToShow) {
    var counter = 1
    htmlInside = "";

    while (weekdays > 0) {
      htmlInside += "<td class='blankDay'> </td>";
      weekdays --;

    }
    while (counter <= monthDays) {
      if(weekdays2 > 6) {
        weekdays2 = 0;
        htmlInside +="</tr><tr>";
      }
      if (counter < day) {
        htmlInside += "<td class='blankDay'> </td>";
      } else if (counter === day) {
        htmlInside += "<td class='startDate' data-value=" + counter + " >" + counter + "</td>";
      } else if (counter > (day + daysToShow)) {
        htmlInside += "<td class='blankDay' data-value=" + counter + "></td>";
      } else {
        htmlInside += "<td class='' data-value=" + counter + ">" + counter + "</td>";
      }

      weekdays2++;
      counter++;
    }

    while (counter >= monthDays && weekdays2 <= 6 ) {
      htmlInside += "<td class='blankDay'></td>";
      counter++;
      weekdays2++;
    }
    return htmlInside;
  },
  callHoliday: function(countryCode, year, month) {
    var request = $.ajax({
      method: "GET",
      url: "https://holidayapi.com/v1/holidays?key=b922f57e-2f17-4c1e-bdb0-4dacfe7094da&country=" + countryCode + "&year=" + year + "&month=" + (month + 1)
    });

    request.done(function(data) {

      calendarTemplate.addHolidayToDate(data);
    });
    request.fail(function (){
      $(".calendarView").append("<p class ='calendar error'>There are issues, please try again</p>");
    });
  },
  addHolidayToDate: function(data){

    for (var i = 0; i < data.holidays.length; i++) {
      var holidayDate = data.holidays[i].date,
      holidayDateForm = new Date(holidayDate);
      $("td[data-value=" + holidayDateForm.getDate() + "]").addClass("holiday");
    }
  }

};

$(document).ready(function (){
 $(".submit").on("click", calendarTemplate.handleSubmit);
});
