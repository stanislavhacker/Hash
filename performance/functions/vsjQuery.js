/*global hs, document, hljs, performance, $*/
(function () {
    "use strict";

    /**
     * VS jQuery
     * @constructor
     */
    performance.vsjQuery = function () {};

    /**
     * Examples 8
     */
    performance.vsjQuery.prototype.table = function () {
        //bind click on button
        document.getElementById("jQuery_testcase1_button").onclick = function () {
            var tests = {},
                size = 20,
                jQueryName = 'Create table with jQuery',
                hashName = 'Create table with Hash',
                jQuery,
                hash;

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

            performance.run(tests, 20, function (results, complete) {
                document.getElementById("vs_jQuery_testcase1_jQuery_count").innerHTML = results[jQueryName].length + "x";
                document.getElementById("vs_jQuery_testcase1_Hash_count").innerHTML = results[hashName].length + "x";
                document.getElementById("vs_jQuery_testcase1_jQuery_time").innerHTML = results[jQueryName].avarage;
                document.getElementById("vs_jQuery_testcase1_Hash_time").innerHTML = results[hashName].avarage;


                if (complete) {

                }
            });

        };
    };

}());