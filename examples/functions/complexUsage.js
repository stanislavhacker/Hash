/*global hs, document, hljs, examples*/
(function () {
    "use strict";

    /**
     * Examples
     * @constructor
     */
    examples.ComplexUsage = function () {};

    /**
     * Examples 8
     */
    examples.ComplexUsage.prototype.generateTable = function() {
        var html = hs('table'),
            td,
            tr,
            i,
            j;

        for (i = 0; i < 2; i++) {
            tr = hs('tr');
            for (j = 0; j < 3; j++) {
                td = hs('td');
                tr.append(td);
            }
            html.append(tr);
        }

        examples.render(8, html);
    };

}());