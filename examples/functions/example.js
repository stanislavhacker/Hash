/*global hs, document, hljs*/
var examples = {};
(function () {
    "use strict";

    /**
     * Render
     * @param {number} i
     * @param {hs.Element} test
     * @param {boolean=} updatable
     */
    examples.render = function (i, test, updatable) {
        var code = document.getElementById('example' + i + '_code'),
            html = document.getElementById('example' + i + '_html'),
            textNode;

        textNode = document.createTextNode(test.html(updatable));
        html.appendChild(textNode);
        hljs.highlightBlock(code);
        hljs.highlightBlock(html);
    };

    /**
     * Init
     */
    examples.init = function () {
        var simple = new examples.SimpleUsage(),
            complex = new examples.ComplexUsage(),
            controls = new examples.Controls(),
            tests = new examples.Tests();

        simple.createBaseElement();
        simple.createElementWithAttributes();
        simple.classOperations();
        simple.eventsBindAndUnbind();
        simple.cssOperation();
        simple.textOperation();
        simple.functionHtml();
        simple.functionRender();
        simple.domOperations();

        complex.generateTable();

        controls.tableControl();

        tests.updateCssClickExample();
    };

    /**
     * Onload
     */
    window.onload = function () {
        examples.init();
    };

}());