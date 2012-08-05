# ScreenTest Library [![Test](https://secure.travis-ci.org/joyent/node.png)](http://andreychizh.com/develop/screentest/)
Tool for testing the UI by comparison screenshots. 

Based on JavaScript and HTML5 Canvas.

Current version: 1.0.4

## Demo
For a live demo, go to [http://andreychizh.com/develop/screentest/](http://andreychizh.com/develop/screentest/)

## Documentation
### 1. Constructor:

    var test = new ScreenTest(srcImg, testImg, etalonImg, bounds);
    
##### Params:   
    
    @param {String} srcImg     Local path to the images folder.
                               Attention! There should be a single host for html test page, folder with images 
                               and this ScreenTest library (Constraint of HTML5 security)

    @param {String} testImg    Name of test screenshot image
    @param {String} etalonImg  Name of etalon screenshot image
    
    @param {Array|Null} bounds Array of coordinates top-left and right-bottom boundary points of comparison:
                               [0] - x-axis of left-top point, px
                               [1] - y-axis of left-top point, px
                               [2] - x-axis of right-bottom point, px
                               [3] - y-axis of right-bottom point, px

                               If no set - compare screenshots with no boundaries.
 

##### Example:

    var test = new ScreenTest('img/test/', 'firefox_test.png', 'firefox_standart.png', [10,10,1430,890]);
    
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

[http://andreychizh.com/](http://andreychizh.com/)
