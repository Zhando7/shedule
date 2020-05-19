/*
* Initialization of the Sidenav and the Timepicker
*/
document.addEventListener("DOMContentLoaded", function () {
    var sidenav = document.querySelectorAll(".sidenav");
    var timepicker = document.querySelectorAll(".timepicker");

    M.Sidenav.init(sidenav);
    M.Timepicker.init(timepicker);
});