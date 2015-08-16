$(document).ready ->
  $("#top-nav-label").click ->
    dropDown = $("#top-nav-dd")
    if dropDown.hasClass("hide") then dropDown.removeClass "hide" else dropDown.addClass "hide"
