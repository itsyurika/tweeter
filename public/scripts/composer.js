$(function() {

  $(window).scroll(function() {
    if ($(this).scrollTop()) {
      $(".up-btn").removeClass("hidden");
    } else {
      $(".up-btn").addClass("hidden");
    }
    const $upButton = $(".up-btn");
    $upButton.on("click", function() {
      $(window).scrollTop(0);
      $(".new-tweet").slideDown();
      $("#tweet-text").focus();
      $(this).addClass("hidden");
    });
  });
}); 