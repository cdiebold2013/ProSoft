var calendarTemplate = {
  handleSubmit: function () {
    var startDate = $("input[name=startDate]").val().split("/"),
    numDays = $("input[name=numDays]").val(),
    countryCode = $("input[name=countryCode]").val(),
    month = startDate[0],
    day = startDate[1],
    year = startDate[2],
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    console.log(months[month-1] + day + year);
    calendarTemplate.callHoliday(countryCode, year, month, day, months[month-1])
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
  loadTemplate: function (day, month, year) {
    var data = {
      "day": day,
      "month": month,
      "year": year,
      "days": ["1","2","3","4","5","6","7"]
    },
    template = $("#calendarTemplate").html(),
    output = Mustache.render(template, data);

    $(".calendarView").append(output);
  },
};

$(document).ready(function (){
 $(".submit").on("click", calendarTemplate.handleSubmit);
});
