/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  //keeping new tweet section hidden on load 
  $(".new-tweet").hide();

  //new tweet button will toggle slide up and down the new tweet form
  $("nav div i").on("click", () => {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus();
  });

  //function for creating a new tweet 
  const createTweetElement = function(obj) {

    //using escape function to prevent cross site scripting
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

  // adds the newly created tweets to the tweets section of the main element  
  const renderTweets = function(tweetData) {
    for (const tweet of tweetData) {
      const $tweet = createTweetElement(tweet);
      $("#tweets").prepend($tweet);
    }
  };

  //function for new tweet text validation and submission to send the data to the server
  const newTweetfxn = function(event) {
    event.preventDefault();
    const tweetTxt = $(this).serialize();
    const $error = $(".error");
    const $counter = $(".counter");
    $error.slideUp();
    if ($counter.hasClass("red")) { //if the input letter counter > 140
      $error.text("You hum too much fam");
      $error.slideDown();
    } else if (tweetTxt === "text=") { //if the input textarea is empty
      $error.text("Gotta say somethin' to hum about somethin'");
      $error.slideDown();
    } else { //sending off the new tweet to the server
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: tweetTxt
      }).then(function(res) {
        loadNewTweet("/tweets");
        $counter.text(140);
      })
        .catch(function(e) {
          console.log(e);
        });
      $("#new-tweet-form").trigger("reset");
    }
  };

  //calls back the newTweet function on submitting the new tweet form
  $("#new-tweet-form").submit(newTweetfxn);

  //function for fetching tweet contents from db and passing them into function that displays it on the page
  const loadtweets = function(url) {
    $.ajax({
      type: "GET",
      url: url,
    }).then(function(tweets) {
      renderTweets(tweets);
    }).catch(function(e) {
      console.log(e);
    });
  };

  //function for fetching the latest tweet 
  const loadNewTweet = function(url) {
    $.ajax({
      type: "GET",
      url: url,
    }).then(function(tweets) { //grabs the array of tweets from db
      renderTweets([tweets[tweets.length - 1]]); //gotta put it in [] to make it into an array, since renderTweets function only works with array
    }).catch(function(e) {
      console.log(e);
    });
  };

  loadtweets("/tweets");
});

