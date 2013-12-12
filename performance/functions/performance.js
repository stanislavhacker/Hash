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
                testCase.avarage = Math.round((time / testCase.length) * 100) / 100;
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
            runArray = [],
            start,
            key,
            div,
            j;

        div = document.createElement("div");
        div.setAttribute("id", "tes231123161846848146");
        div.setAttribute("style", "position: absolute; top: -1000px; left: -1000px; height: 100px; overflow: hidden;");
        document.body.appendChild(div);

        //check max
        for (key in functions) {
            if (functions.hasOwnProperty(key)) {
                max++;
            }
        }

        //make array of runs
        for (key in functions) {
            if (functions.hasOwnProperty(key)) {
                results[key] = [];
                for (j = 0; j < count; j++) {
                    //noinspection JSHint,JSLint
                    (function () {
                        var k = key,
                            sample = j,
                            complete = max === current && count - 1 === sample;

                        runArray.push(function () {
                            start = new Date().getTime();
                            functions[k](div);
                            results[k][sample] = new Date().getTime() - start;

                            updateCall(update, results, complete);

                            if (complete) {
                                document.body.removeChild(div);
                            }
                        });
                    }());
                }
                current++;
            }
        }

        performance.single(runArray);

    };

    /**
     * Run functions
     * @param {Array.<function>} functions
     */
    performance.single = function (functions) {
        var first = functions.shift();
        window.setTimeout(function () {
            first();
            if (functions.length > 0) {
                performance.single(functions);
            }
        }, 5);
    };

    /**
     * Update
     * @param {string} id
     * @param {object} data
     */
    performance.update = function (id, data) {
        document.getElementById(id + "_count").innerHTML = data.length + "x";
        document.getElementById(id + "_time").innerHTML = !Number.isNaN(data.avarage) ? data.avarage + "ms" : "not run yet";
    };

    /**
     * Init
     */
    performance.init = function () {
        var jQuery = new performance.vsjQuery();

        jQuery.table2020();
        jQuery.table100100();
        jQuery.classManipulation();
        jQuery.div1000();
    };

    /**
     * Onload
     */
    window.onload = function () {
        performance.init();
    };

}());