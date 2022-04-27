/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

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
          <h5 class="tweet-text">
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

    const $newArticle = $('<article class="tweet>');
    const $newHeader = $('<header></header>');
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
    console.log(tweetTxt);
    if (tweetTxt.length > 145) {
      alert("Tweet length too long");
    } else if (tweetTxt === "text=") {
      alert("You didn't type any message!");
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: tweetTxt
      }).then(function(res) {
        loadtweets();
      });
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
