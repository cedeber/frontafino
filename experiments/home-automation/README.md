Installation
============

-	Install Node.js or check if you have it already installed: `node -v`.
    The minimal version is the 6.1. It will install `npm` too.
-	From the app root folder, do `npm install`. All modules defined in
    package.json will be installed locally in the `node_modules` folder.

Now you have everything to compile and run the local web server.


Local Web server
================

A Node.js web server has been coded in order to simulate an automation system
and answer the app requests. You can start it with: `npm start` or `node server.js`
Hit `Ctrl+C` to kill the process.


Resources
=========

-   The SVG icons comes from the [Apple Home Kit Page](https://www.apple.com/fr/ios/homekit/)
    They are all in ./www/views/symbols.svg
-   The CSS Reset is the one from [Eric Meyer](http://meyerweb.com/eric/tools/css/reset/)
    You can found it here: ./source/styles/config/reset.css


Compatibility
=============

This application works on last version of Safari, Chrome, Firefox and Edge.
Internet Explorer 11 doesn't support Promises.
