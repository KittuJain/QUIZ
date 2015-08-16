$ ->
  $(".awesome-form .input-group input").focusout ->
    text_val = $(this).val()
    if text_val is ""
      $(this).removeClass "has-value"
    else
      $(this).addClass "has-value"
