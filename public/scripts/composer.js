$(function() {
  $(window).scroll(function() {
    $(".up-btn-container").removeClass("hidden");
  });

  const $upButton = $(".up-btn");
  $upButton.on("click", function() {
    $(window).scrollTop(0);
    $(".new-tweet").slideDown();
    $("#tweet-text").focus();
    $(this).addClass("hidden");
  });


}); 