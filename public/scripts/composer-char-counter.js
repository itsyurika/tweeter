let charLeft = 140;
$(function() { //ensuring DOM has been loaded
  const $tweet = $(".new-tweet form textarea"); // Assigning the selector to a variable so the js only needs to search for the handle once
  $tweet.on("input", function() {
    $(this).val(function(index, value) {
      charLeft = 140 - value.length;
      const counter = $(this).parent().find(".counter");
      if (charLeft < 0) { //adding CSS class of red color if the character count goes over limit
        counter.addClass("red");
      } else {
        counter.removeClass("red");
      }
      counter.text(charLeft);
      return value;
    });
  });
});