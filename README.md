# ScreenTest Library
Tool for testing the user interface by comparison screenshots.

Version 0.1

## Demo
[http://www.andreychizh.com/develop/screentest/](http://www.andreychizh.com/develop/screentest/)

## Use Library
### Constructor:

    var test = new ScreenTest(bounds, src, browser, imgType);

#### Example:

    var test = new ScreenTest([10,10,1430,890], 'img/test', 'ff12', 'png');
    
### Cleaning of the environment after the test: 
    test.clearResults();

## Copyright
Copyright © Andrey Chizh, 2012