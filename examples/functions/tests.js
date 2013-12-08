/*global hs, document, hljs, examples*/
(function () {
    "use strict";

    examples.Tests = examples.Tests || {};

    /**
     * Examples
     * @constructor
     */
    examples.Tests = function () {};

    /**
     * Test 1
     */
    examples.Tests.prototype.updateCssClickExample = function() {
        var html = hs('div');

        html.css({
            padding: '5px',
            border: '1px solid gray'
        });
        html.addText('Click on me!');
        html.render('test1');

        html.bind("click", function () {
            html.toggleClass('gray');
        });
    };

}());