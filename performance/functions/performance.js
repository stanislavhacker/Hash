/*global hs, document, hljs*/
var performance = {};
(function () {
    "use strict";

    /**
     * Update call
     * @param {function} update
     * @param {object} results
     * @param {boolean} complete
     */
    function updateCall(update, results, complete) {
        var i,
            key,
            time,
            testCase;

        for (key in results) {
            if (results.hasOwnProperty(key)) {
                testCase = results[key];
                time = 0;
                for (i = 0; i < testCase.length; i++) {
                    time += testCase[i];
                }
                testCase.avarage = Math.round(time / testCase.length);
            }
        }

        update(results, complete);
    }

    /**
     * Performance runner
     * @param {object} functions
     * @param {number} count
     * @param {function} update
     */
    performance.run = function (functions, count, update) {
        var current = 0,
            results = {},
            max = -1,
            start,
            key,
            div,
            j;

        div = document.createElement("div");
        div.setAttribute("id", "tes231123161846848146");
        div.setAttribute("style", "position: absolute; top: -1000px; left: -1000px;");
        document.body.appendChild(div);

        for (key in functions) {
            if (functions.hasOwnProperty(key)) {
                max++;
            }
        }

        for (key in functions) {
            if (functions.hasOwnProperty(key)) {
                results[key] = [];
                for (j = 0; j < count; j++) {

                    (function () {
                        var k = key,
                            sample = j,
                            complete = max === current && count - 1 === sample;

                        window.setTimeout(function () {
                            start = new Date().getTime();
                            functions[k](div);
                            results[k][sample] = new Date().getTime() - start;

                            updateCall(update, results, complete);

                            if (complete) {
                                document.body.removeChild(div);
                            }
                        }, 100 * j * (current + 1));
                    }());

                }
                current++;
            }
        }

    };

    /**
     * Init
     */
    performance.init = function () {
        var jQuery = new performance.vsjQuery();

        jQuery.table();
    };

    /**
     * Onload
     */
    window.onload = function () {
        performance.init();
    };

}());