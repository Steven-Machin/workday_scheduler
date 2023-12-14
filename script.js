$(function () {
  $(".saveBtn").on("click", function () {
    var hour = $(this).parent().attr("id").split("-")[1];

    var description = $(this).siblings(".description").val();

    localStorage.setItem("event_" + hour, description);
  });

  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  function loadEvents() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id").split("-")[1];
      var savedEvent = localStorage.getItem("event_" + hour);

      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  updateTimeBlocks();
  loadEvents();
  
  setInterval(updateTimeBlocks, 60000);
});

