//function for behaviors of new tweet button on nav bar and right bottom corner
$(function() {

  $(window).scroll(function() {
    //for right bottom buttom
    const $upButton = $(".up-btn");
    const $newTweetButton = $(".new-tweet-btn");

    if ($(this).scrollTop()) {
      $upButton.removeClass("hidden");
    } else {
      $upButton.addClass("hidden");
    }

    $upButton.on("click", function() {
      $(window).scrollTop(0);
      $(".new-tweet").slideDown();
      $("#tweet-text").focus();
      $(this).addClass("hidden");
    });

    //for navbar new tweet button
    if ($upButton.hasClass("hidden")) {
      $newTweetButton.removeClass("hidden");
    } else {
      $newTweetButton.addClass("hidden");
    }
  });
}); 