var calendarTemplate = {
  init: funciton () {
      //put js here that should run on page load
  },
  loadTemplate: function () {
    var data = {
      "day": "1",
      "month":"September"
    },
    template = $("#calendarTemplate").html(),
    output = Mustache.render(template, data);

    console.log("here");

    $("#templateHere").append(output);
  }
}
