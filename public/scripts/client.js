/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  //keeping new tweet section hidden on load - and toggle slide up and down when clicked on the new tweet button
  $(".new-tweet").hide();

  $("nav div i").on("click", () => {
    $(".new-tweet").slideToggle();
  });

  //function for creating a new tweet 

  const createTweetElement = function(obj) { //using escape function to prevent cross site scripting

    const escape = function(string) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(string));
      return div.innerHTML;
    };

    //template HTML for new tweets 
    const newTweet = `
      <article class="tweet">
          <header>
            <div class="tweet-profile">
              <img src=${obj.user.avatars}>
              <h4><span class="light">${obj.user.name}</span></h4>
            </div>
            <div>
              <h4 class="handle">${obj.user.handle}</h4>
            </div>
          </header>
          <h5 class="tweet-text-box">
          ${escape(obj.content.text)}
          </h5>
          <hr>
          <footer>
            <div class="date">
              <p><strong>${timeago.format(obj.created_at)}</strong></p>
            </div>
            <div class="icons">
              <i class="fa-solid fa-flag fa-2xs"></i>
              <i class="fa-solid fa-retweet fa-2xs"></i>
              <i class="fa-solid fa-heart fa-2xs"></i>
            </div>
          </footer>
        </article>
      `;
    return newTweet;
  };

  const renderTweets = function(tweetData) {
    for (const tweet of tweetData) {
      const $tweet = createTweetElement(tweet);
      $("#tweets").prepend($tweet);
    }
  };

  const newTweetfxn = function(event) {
    event.preventDefault();
    const tweetTxt = $(this).serialize();
    const $error = $(".error");
    const $counter = $(".counter");
    console.log(tweetTxt);
    $error.slideUp();
    if ($counter.hasClass("red")) {
      $error.text("You hum too much fam");
      $error.slideDown();
    } else if (tweetTxt === "text=") {
      $error.text("Gotta say somethin' to hum about somethin'");
      $error.slideDown();
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: tweetTxt
      }).then(function(res) {
        loadtweets();
        $counter.text(140);
      });
      $("#new-tweet-form").trigger("reset");
    }
  };

  $("#new-tweet-form").submit(newTweetfxn);


  const loadtweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
    }).then(function(tweets) {
      renderTweets(tweets);
    });
  };

  loadtweets();
});

