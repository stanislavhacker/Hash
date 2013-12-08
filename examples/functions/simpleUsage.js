/*global hs, document, hljs, examples*/
(function () {
    "use strict";

    /**
     * Examples
     * @constructor
     */
    examples.SimpleUsage = function () {};

    /**
     * Examples 1
     */
    examples.SimpleUsage.prototype.createBaseElement = function() {
        var html = hs('div');
        examples.render(1, html);
    };

    /**
     * Examples 2
     */
    examples.SimpleUsage.prototype.createElementWithAttributes = function() {
        var html = hs('span');

        html.attr('title', "Hi!");
        html.attr('id', "hi_span");
        html.attr('data-name', "hello");

        examples.render(2, html);
    };

    /**
     * Examples 3
     */
    examples.SimpleUsage.prototype.classOperations = function() {
        var html = hs('div');

        html.addClass('test');
        html.addClass('test');
        html.toggleClass('id');
        html.toggleClass('remove');
        html.removeClass('remove');

        examples.render(3, html);
    };

    /**
     * Examples 4
     */
    examples.SimpleUsage.prototype.eventsBindAndUnbind = function() {
        var html = hs('div');

        html.bind("click", function (event) {});
        html.unbind("mousedown");

        examples.render(4, html);
    };

    /**
     * Examples 5
     */
    examples.SimpleUsage.prototype.cssOperation = function() {
        var html = hs('div');

        html.css({
            width: '100px',
            height: '100px',
            float: 'left'
        });

        examples.render(5, html);
    };

    /**
     * Examples 6
     */
    examples.SimpleUsage.prototype.textOperation = function() {
        var html = hs('div');
        html.addText('Hello text');

        examples.render(6, html);
    };

    /**
     * Examples 7
     */
    examples.SimpleUsage.prototype.functionHtml = function() {
        var html = hs('div');
        examples.render(7, html);
    };

    /**
     * Examples 7.1
     */
    examples.SimpleUsage.prototype.functionRender = function() {
        var html = hs('div');
        examples.render(71, html, true);
    };

    /**
     * Examples 10
     */
    examples.SimpleUsage.prototype.domOperations = function() {
        var html = hs('div'),
            base = hs('span').addClass('base'),
            appended = hs('span').addClass('appended'),
            prepended = hs('span').addClass('prepended'),
            replaced = hs('span').addClass('replaced');

        replaced.append(hs('b'));

        html.append(base);

        html.append(appended);
        html.prepend(prepended);

        base.replaceWith(replaced);
        replaced.empty();

        hs('button').addClass('btn2').appendTo(replaced);
        hs('button').addClass('btn1').prependTo(replaced);

        examples.render(10, html);
    };

}());