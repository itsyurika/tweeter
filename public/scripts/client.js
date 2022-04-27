/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetData = [
//   {
//     "user": {
//       "name": "William",
//       "avatars": "/images/shakespear.jpeg",
//       "handle": "@bard_of_avon"
//     },
//     "content": {
//       "text": "What do you call a nervous javelin thrower? Shakespear."
//     },
//     "created_at": 1461116247892
//   },
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   }
// ];

$(function() {

  const createTweetElement = function(obj) {
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
            ${obj.content.text}
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
      </section>
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
        location.reload();
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
