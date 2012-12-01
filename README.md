YouTube HTML5 Switch
================================

![logo](https://raw.github.com/constanton/youtube_html5_switch/master/data/html5switch100.jpeg )

This is a very simple Firefox Add-on that adds the "html5=1" parameter inside the address bar of the tab that is currently active. Only with a simple click on the widget.


## Features

Right now we have:

* A navigation bar button
* A clickable widget icon
* It works only when youtube.com/watch has been opened
* It doesn't work if &html5=1 is already in the URL

##Known issues

The Add-on is not very smart, yet. For example:

* The button is viewed only in the window that opens first.
* If the position of the button changes, on the next restart it is placed again in the default position.
* If the Add-on is used at least once and then the user changes to a non-YouTube tab (call it X), then on the next click of the button the URL of X will change to the previously used YouTube URL.

## Features to be added

Obviously there is much to do but for starters let's...

* When user changes to already open tabs, handle the url correctly
* Prompt a message in a panel box if "html5=1" has been inserted
* Automatically change the URL without a widget.

The Add-on is under the MIT Licence as described on LICENCE.txt
