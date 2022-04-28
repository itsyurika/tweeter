# Tweeter Project

A simple single-page AJAX-based Twitter clone that uses jQuery, HTML5 and plain ol' CSS3 with a responsive design that supports desktop mode(>1024px) and tablet mode(<1024px).

## Final Product

* Tweeter has the typical message posting function.
!["Tweeter on desktop mode - automatically displays the newest message on top."](https://github.com/itsyurika/tweeter-template/blob/master/docs/desktop_tweet.gif?raw=true)
* Floating button on the corner allows users to easily type in a new message no matter how far down they've scrolled through the contents.
!["Tweeter on desktop mode - up button appears only once you start scrolling"](https://github.com/itsyurika/tweeter-template/blob/master/docs/desktop_up_button.gif?raw=true)
* Tweeter checks and validates if the input value is empty or too long. 
!["Tweetor on mobile mode - displays error message on incorrect form submission"](https://raw.githubusercontent.com/itsyurika/tweeter-template/641230ac5f80458febbc4cfb94567b62eb1ed805/docs/mobile_form_validation.gif)


## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- chance
- md5

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm run local` command.
