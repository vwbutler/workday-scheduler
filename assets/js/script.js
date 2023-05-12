$(function () {
  var todayFormatted = dayjs().format("MMM D, YYYY");
  $("#currentDay").text(todayFormatted);

  var currentHour = dayjs().hour();

  var allRows = document.querySelectorAll(".time-block");

  $(".time-block").each(function (index) {
    var timeVal = $(this).attr("id").split("-")[1];

    if (timeVal > currentHour) {
      $(this).addClass("future");
    } else if (timeVal == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("past");
    }
  });
});
//The Save button listens for the "click" and traverses the DOM to get the sibling within div id hour ## to display the text area.
$(".saveBtn").each(function () {
  $(this).on("click", function () {
    var calendarItem = $(this).siblings().next().val();
    console.log(calendarItem);

    //The system saves the information into local storage and gets it from local storage
    var calendarData = JSON.parse(localStorage.getItem("calendarData") || "{}");

    var calendarHour = $(this).siblings().prev().text();

    calendarData[calendarHour] = calendarItem;

    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  });
});

//Attempting to get data from local storage and display it on the page when the page loads.
$(document).ready(function () {
  console.log("page has loaded!");

  var calendarData = JSON.parse(localStorage.getItem("calendarData") || "{}");

  //matching the data to the row and setting text
  $(".time-block").each(function () {
    var hour = $(this).attr("id").split("-")[1];

    var calendarItem = calendarData[hour];

    $(this).find("textarea").val(calendarItem);
  });
});
