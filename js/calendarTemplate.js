var calendarTemplate = {
  // init: funciton () {
  //     //put js here that should run on page load
  // },
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
  }
};

$(document).ready(function (){
 //calendarTemplate.init();

 $(".submit").on("click", calendarTemplate.loadTemplate);
});
