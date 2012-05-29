# ScreenTest Library
Tool for testing the user interface by comparison screenshots.

Version 0.1

## Demo
[http://www.andreychizh.com/develop/screentest/](http://www.andreychizh.com/develop/screentest/)

## Use Library
### Constructor:

    var test = new ScreenTest(bounds, src, browser, imgType);
    
##### Params:   
    
    @param {Array} bounds Array of coordinates top-left and right-bottom boundary points of comparison:
                          [0] - x-axis of left-top point, px
                          [1] - y-axis of left-top point, px
                          [2] - x-axis of right-bottom point, px
                          [3] - y-axis of right-bottom point, px
 
    @param {String} src
    @param {String} browser
    @param {String} imgType

#### Example:

    var test = new ScreenTest([10,10,1430,890], 'img/test', 'ff12', 'png');
    
### Cleaning of the environment after the test: 
    test.clearResults();

## Copyright
Copyright © Andrey Chizh, 2012