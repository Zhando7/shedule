/*
* Initialization of the modals boxes and the sidenav
*/
document.addEventListener("DOMContentLoaded", function() {
    var modals = document.querySelectorAll(".modal"),
        sidenavs = document.querySelectorAll(".sidenav");
    
    if(modals && sidenavs) {
        M.Modal.init(modals);
        M.Sidenav.init(sidenavs);
    }
});