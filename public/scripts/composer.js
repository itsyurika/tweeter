$(function() {

  $(window).scroll(function() {
    if ($(this).scrollTop()) {
      $(".up-btn").removeClass("hidden");
      // $(".new-tweet-btn").addClass("hidden");
    } else {
      $(".up-btn").addClass("hidden");
      // $("new-tweet-btn").removeClass("hidden");
    }

    if ($(".up-btn").hasClass("hidden")) {
      $(".new-tweet-btn").removeClass("hidden");
    } else {
      $(".new-tweet-btn").addClass("hidden");
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