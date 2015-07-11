$(document).ready(function() {
    $("#top-nav-label").click(function () {
        var dropDown = $("#top-nav-dd");
        if (dropDown.hasClass("hide")) {
            dropDown.removeClass("hide");
        } else {
            dropDown.addClass("hide");
        }
    });
});