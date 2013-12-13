/*global hs, document, hljs, performance, $*/
(function () {
    "use strict";

    /**
     * VS jQuery
     * @constructor
     */
    performance.vsjQuery = function () {};

    /**
     * Table 20x20
     */
    performance.vsjQuery.prototype.table2020 = function () {
        var button = document.getElementById("jQuery_testcase1_button");
        //bind click on button
        button.onclick = function () {
            var tests = {},
                size = 20,
                jQueryName = 'Create table with jQuery',
                hashName = 'Create table with Hash',
                jQuery,
                hash;

            button.setAttribute("disabled", "disabled");

            //jQuery
            jQuery = function (node) {
                var parent = $(node),
                    table,
                    tr,
                    j,
                    i;

                table = $('<table></table>').appendTo(parent);
                for (i = 0; i < size; i++) {
                    tr = $('<tr></tr>').appendTo(table);
                    for (j = 0; j < size; j++) {
                        $('<td></td>').appendTo(tr);
                    }
                }
            };
            tests[jQueryName] = jQuery;

            //hash
            hash = function (node) {
                var table,
                    tr,
                    j,
                    i;

                table = hs('table');
                for (i = 0; i < size; i++) {
                    tr = hs('tr').appendTo(table);
                    for (j = 0; j < size; j++) {
                        hs('td').appendTo(tr);
                    }
                }
                table.render(node.getAttribute("id"));
            };
            tests[hashName] = hash;

            performance.run(tests, 40, function (results, complete) {
                performance.update("vs_jQuery_testcase1_jQuery", results[jQueryName]);
                performance.update("vs_jQuery_testcase1_Hash", results[hashName]);

                if (complete) {
                    button.removeAttribute("disabled");
                }
            });

        };
    };

    /**
     * Table 100x100
     */
    performance.vsjQuery.prototype.table100100 = function () {
        var button = document.getElementById("jQuery_testcase2_button");
        //bind click on button
        button.onclick = function () {
            var tests = {},
                size = 100,
                jQueryName = 'Create table with jQuery',
                hashName = 'Create table with Hash',
                jQuery,
                hash;

            button.setAttribute("disabled", "disabled");

            //jQuery
            jQuery = function (node) {
                var parent = $(node),
                    table,
                    tr,
                    j,
                    i;

                table = $('<table></table>').appendTo(parent);
                for (i = 0; i < size; i++) {
                    tr = $('<tr></tr>').appendTo(table);
                    for (j = 0; j < size; j++) {
                        $('<td></td>').appendTo(tr);
                    }
                }
            };
            tests[jQueryName] = jQuery;

            //hash
            hash = function (node) {
                var table,
                    tr,
                    j,
                    i;

                table = hs('table');
                for (i = 0; i < size; i++) {
                    tr = hs('tr').appendTo(table);
                    for (j = 0; j < size; j++) {
                        hs('td').appendTo(tr);
                    }
                }
                table.render(node.getAttribute("id"));
            };
            tests[hashName] = hash;

            performance.run(tests, 15, function (results, complete) {
                performance.update("vs_jQuery_testcase2_jQuery", results[jQueryName]);
                performance.update("vs_jQuery_testcase2_Hash", results[hashName]);

                if (complete) {
                    button.removeAttribute("disabled");
                }
            });

        };
    };

    /**
     * Class manipulation
     */
    performance.vsjQuery.prototype.classManipulation = function () {
        var button = document.getElementById("jQuery_testcase3_button");
        //bind click on button
        button.onclick = function () {
            var tests = {},
                jQueryName = 'Class manipulation with jQuery',
                hashName = 'Class manipulation with Hash',
                jQuery,
                hash;

            button.setAttribute("disabled", "disabled");

            //jQuery
            jQuery = function (node) {
                var parent = $(node),
                    div;

                div = $('<div></div>').appendTo(parent);
                div.addClass('test1');
                div.addClass('test2');
                div.addClass('test3');
                div.addClass('test4');
                div.addClass('test5');

                div.removeClass('test2');
                div.removeClass('test3');
                div.removeClass('test4');
                div.removeClass('test5');
            };
            tests[jQueryName] = jQuery;

            //hash
            hash = function (node) {
                var div;

                div = hs('div');
                div.addClass('test1');
                div.addClass('test2');
                div.addClass('test3');
                div.addClass('test4');
                div.addClass('test5');

                div.removeClass('test2');
                div.removeClass('test3');
                div.removeClass('test4');
                div.removeClass('test5');
                div.render(node.getAttribute("id"));
            };
            tests[hashName] = hash;

            performance.run(tests, 100, function (results, complete) {
                performance.update("vs_jQuery_testcase3_jQuery", results[jQueryName]);
                performance.update("vs_jQuery_testcase3_Hash", results[hashName]);

                if (complete) {
                    button.removeAttribute("disabled");
                }
            });

        };
    };

    /**
     * Div generator
     */
    performance.vsjQuery.prototype.div1000 = function () {
        var button = document.getElementById("jQuery_testcase4_button");
        //bind click on button
        button.onclick = function () {
            var tests = {},
                jQueryName = 'Generate divs with jQuery',
                hashName = 'Generate divs with Hash',
                jQuery,
                size = 1000,
                hash;

            button.setAttribute("disabled", "disabled");

            //jQuery
            jQuery = function (node) {
                var parent = $(node),
                    div,
                    i;

                for (i = 0; i < size; i++) {
                    $('<div></div>').appendTo(parent);
                }
            };
            tests[jQueryName] = jQuery;

            //hash
            hash = function (node) {
                var div,
                    html = "",
                    i;

                for (i = 0; i < size; i++) {
                    html += hs('div').html();
                }
                node.innerHtml = html;
            };
            tests[hashName] = hash;

            performance.run(tests, 100, function (results, complete) {
                performance.update("vs_jQuery_testcase4_jQuery", results[jQueryName]);
                performance.update("vs_jQuery_testcase4_Hash", results[hashName]);

                if (complete) {
                    button.removeAttribute("disabled");
                }
            });

        };
    };

}());