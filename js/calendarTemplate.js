var calendarTemplate = {
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
 $(".submit").on("click", calendarTemplate.loadTemplate);
});
