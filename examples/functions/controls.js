/*global hs, document, hljs, examples*/
(function () {
    "use strict";

    /**
     * Examples
     * @constructor
     */
    examples.Controls = function () {};

    /**
     * Examples 9
     */
    examples.Controls.prototype.tableControl = function() {
        var table = hs.createTable(1, 0);

        table.addColumns(1);
        table.addRows(3);

        table.getRow(0).addClass('first');
        table.getCell(0, 1).addClass('secondCell');
        table.getCell(1, 1).addText(table.getRows().length.toString());
        table.getCell(2, 0).addText(table.getRowsCount().toString());
        table.getCell(2, 1).addText(table.getColumnsCount().toString());
        table.addRows(1);
        table.deleteRow(3);

        examples.render(9, table);
    };

}());