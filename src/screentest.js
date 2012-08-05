/**
 * ScreenTest Library
 * Tool for testing the user interface by comparison screenshots.
 *
 * Version 1.0.4
 *
 * Demo: http://www.andreychizh.com/develop/screentest/
 *
 * Copyright (c) Andrey Chizh, 2012
 * http://www.andreychizh.com/
 */

/**
 * Constructor for a new ScreenTest instance.
 *
 * Example:
 * var test = new ScreenTest('img/test/', 'firefox_test.png', 'firefox_etalon.png', [10,10,1430,890]);
 *
 * @param {String} srcImg     Local path to the images folder.
 *                            Attention! There should be a single host for html test page, folder with images
 *                            and this ScreenTest library (Constraint of HTML5 security)
 *
 * @param {String} testImg    Name of test screenshot image
 * @param {String} etalonImg  Name of etalon screenshot image
 * 
 * @param {Array|Null} bounds Array of coordinates top-left and right-bottom boundary points of comparison:
 *                            [0] - x-axis of left-top point, px
 *                            [1] - y-axis of left-top point, px
 *                            [2] - x-axis of right-bottom point, px
 *                            [3] - y-axis of right-bottom point, px
 *
 *                            If no set - compare screenshots with no boundaries.
 */
var ScreenTest = function(srcImg, testImg, etalonImg, bounds) {

    var result = 0;
    var countLoadImages = 0;

    /********************************************************/
    /*                     Events Methods                   */
    /********************************************************/

    /**
     * Event window.onload
     */
    window.onload = function () {
        loadImages();
    }

    /**
     * Event load images
     */
    function onloadImages() {
        var numberImages = 2;
        countLoadImages++;
        if (countLoadImages == numberImages) {
            main(bounds);
        }
    }

    /********************************************************/
    /*                     Main Methods                     */
    /********************************************************/

    /**
     * Main method.
     * Мakes comparison of images.
     */
    function main(bounds) {
        var imagesData, imageDataLength,
            etalonImagePixel, testImagePixel,
            imageWidth;
        var allPixels = 1,
            errorPixels = 0;

        imagesData = getImagesData();

        etalonImagePixel = imagesData.etalon.data;
        testImagePixel = imagesData.test.data;

        imageDataLength = testImagePixel.length;
        imageWidth = imagesData.width * 4;

        for (var i = 0; i < imageDataLength; i += 4) {
            if (bounds && bounds.length == 4) {
                if ((i > bounds[0] * 4 + imageWidth * parseInt(i / imageWidth)) &&
                    (i > bounds[1] * imageWidth) &&
                    (i < bounds[2] * 4 + imageWidth * parseInt(i / imageWidth)) &&
                    (i < bounds[3] * imageWidth)) {

                    allPixels++;
                    if (etalonImagePixel[i] != testImagePixel[i]) {
                        errorPixels++;
                        testImagePixel[i] = 255;
                        testImagePixel[i + 1] = 0;
                        testImagePixel[i + 2] = 0;
                    }
                }
            } else {
                allPixels++;
                if (etalonImagePixel[i] != testImagePixel[i]) {
                    errorPixels ++;
                    testImagePixel[i] = 255;
                    testImagePixel[i + 1] = 0;
                    testImagePixel[i + 2] = 0;
                }
            }
        }

        result = (errorPixels / allPixels) * 100;
        imagesData.ctx.putImageData(imagesData.test, 0, 0);

        createResult(result.toFixed(2));

        deleteImage('screentest-etalon-image');
        deleteImage('screentest-test-image');
        deleteCanvas('screentest-etalon-canvas');

        if (bounds) {
            imagesData.ctx.strokeStyle = 'rgb(255, 0, 0)';
            imagesData.ctx.strokeRect(bounds[0], bounds[1], bounds[2] - bounds[0], bounds[3] - bounds[1]);
        }

    }

    /**
     * Get image data method.
     * @return {Object}
     */
    function getImagesData() {
        var etalonImage, testImage,
            imageWidth, imageHeight,
            etalonCanvas, testCanvas,
            etalonCtx, testCtx,
            etalonImageData, testImageData;
        var imagesData = {};

        etalonImage = getImage('screentest-etalon-image');
        testImage = getImage('screentest-test-image');

        imageWidth = testImage.width;
        imageHeight = testImage.height;

        etalonCanvas = createCanvas('screentest-etalon-canvas', imageWidth, imageHeight);
        testCanvas = createCanvas('screentest-test-canvas', imageWidth, imageHeight);

        etalonCtx = etalonCanvas.getContext('2d');
        testCtx = testCanvas.getContext('2d');

        etalonCtx.drawImage(etalonImage, 0, 0);
        testCtx.drawImage(testImage, 0, 0);

        etalonImageData = etalonCtx.getImageData(0, 0, imageWidth, imageHeight);
        testImageData = testCtx.getImageData(0, 0, imageWidth, imageHeight);

        imagesData.etalon = etalonImageData;
        imagesData.test = testImageData;
        imagesData.width = imageWidth;
        imagesData.ctx = testCtx;

        return imagesData;
    }


    /********************************************************/
    /*                  Load Images Function                */
    /********************************************************/

    /**
     * In the event window.onload loads the images for the test
     */
    function loadImages() {
        var srcImgTest = srcImg + testImg;
        var srcImgEtalon = srcImg + etalonImg;
        createImage('screentest-test-image', srcImgTest);
        createImage('screentest-etalon-image', srcImgEtalon);
    }

    /********************************************************/
    /*                DOM Elements Methods                  */
    /********************************************************/

    /**
     * Create DOM element <img> with the specified id and src
     * @param {String} id
     * @param {String} src
     * @return {DOMElement}
     */
    function createImage(id, src) {
        var body, img;
        body = document.getElementsByTagName('body')[0];
        img = document.createElement('img');
        img.id = id;
        img.onload = onloadImages;
        img.src = src;
        body.appendChild(img);
        return img;
    }

    /**
     * Get DOM element <img> with the specified id
     * @param {String} id
     */
    function getImage(id) {
        return document.getElementById(id);
    }

    /**
     * Delete DOM element <img> with the specified id
     * @param {String} id
     */
    function deleteImage(id) {
        var body, img;
        body = document.getElementsByTagName('body')[0];
        img = document.getElementById(id);
        body.removeChild(img);
    }

    /**
     * Create DOM element <canvas> with the specified id, width and height
     * @param {String} id
     * @param {String} src
     * @return {DOMElement}
     */
    function createCanvas(id, width, height) {
        var body, canvas;
        body = document.getElementsByTagName('body')[0];
        canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        body.appendChild(canvas);
        return canvas;
    }

    /**
     * Delete DOM element <canvas> with the specified id
     * @param {String} id
     */
    function deleteCanvas(id) {
        var body, canvas;
        body = document.getElementsByTagName('body')[0];
        canvas = document.getElementById(id);
        body.removeChild(canvas);
    }

    /**
     * Create DOM element <div id='result'> with result
     * @param {Number} result
     * @return {DOMElement}
     */
    function createResult(result) {
        var body, div;
        body = document.getElementsByTagName('body')[0];
        div = document.createElement('div');
        div.id = 'result';
        div.innerHTML = result;
        body.appendChild(div);
    }

    /**
     * Delete DOM element <div id='result'> with result
     */
    function deleteResult() {
        var body, div;
        body = document.getElementsByTagName('body')[0];
        div = document.getElementById('result');
        body.removeChild(div);
    }

    /********************************************************/
    /*                  Utilities Methods                   */
    /********************************************************/

    this.tearDown = function() {
        deleteCanvas('screentest-test-canvas');
        deleteResult();

        countLoadImages = null;
        result = null;
        bounds = null;
        browser = null;
        src = null;
        imgType = null;

    }

}
