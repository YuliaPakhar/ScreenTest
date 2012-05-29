# ScreenTest Library
Tool for testing the user interface by comparison screenshots.

Version 0.1

## Demo
For a live demo, go to [http://www.andreychizh.com/develop/screentest/](http://www.andreychizh.com/develop/screentest/)

## Use Library
### 1. Constructor:

    var test = new ScreenTest(bounds, srcImg, testImg, etalonImg);
    
##### Params:   
    
    @param {Array|Null} bounds Array of coordinates top-left and right-bottom boundary points of comparison:
                               [0] - x-axis of left-top point, px
                               [1] - y-axis of left-top point, px
                               [2] - x-axis of right-bottom point, px
                               [3] - y-axis of right-bottom point, px

                               If null - compare screenshots with no boundaries.
 
    @param {String} srcImg     URL to the images folder. The absolute or relative path
    @param {String} testImg    Name of test screenshot image
    @param {String} etalonImg  Name of etalon screenshot image

##### Example:

    var test = new ScreenTest([10,10,1430,890], 'img/test/', 'firefox_test.png', 'firefox_standart.png');
    
### 2. Result:

The result is displayed in a div element with id="result" in the percentage difference images.

##### Example:

    <div id="result">12.46</div>

### 3. Cleaning of the environment after the test:

    test.tearDown();

## Download Library

 [ScreenTest Library](https://github.com/AndreyChizh/ScreenTest/downloads)

## Copyright

Copyright © Andrey Chizh, 2012

[http://www.andreychizh.com/](http://www.andreychizh.com/)
