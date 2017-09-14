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

  },
  loadTemplate: function () {
    var data = {
      "day": "1",
      "month":"September",
      "year":"2017",
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
