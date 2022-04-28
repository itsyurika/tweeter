//function for checking the character count for the textarea of new tweet form
let charLeft = 140;

$(function() { //ensuring DOM has been loaded

  const $tweet = $(".new-tweet form textarea");
  $tweet.on("input", function() {
    $(this).val(function(index, value) {
      charLeft = 140 - value.length;
      const counter = $(this).parent().find(".counter");
      if (charLeft < 0) {
        counter.addClass("red");
      } else {
        counter.removeClass("red");
      }
      counter.text(charLeft);
      return value;
    });
  });
});