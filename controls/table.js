/*global hs, document*/
(function () {
    "use strict";

    hs.controls = hs.controls || {};

    /**
     * Table
     * @param rows
     * @param columns
     * @constructor
     */
    hs.controls.Table = function (rows, columns) {
        this.rowsCount = 0;
        this.columnsCount = 0;

        this.root = hs('table');

        this.addRows(rows || 0);
        this.addColumns(columns || 0);
    };

    /**
     * Add rows to table
     * @param {number} rows
     */
    hs.controls.Table.prototype.addRows = function (rows) {
        var i,
            root = this.root;

        this.rowsCount += rows;

        for (i = 0; i < rows; i++) {
            root.append(hs('tr'));
        }
    };

    /**
     * Add columns to table
     * @param {number} columns
     */
    hs.controls.Table.prototype.addColumns = function (columns) {
        var i,
            j,
            cols,
            trs = this.root.children;

        this.columnsCount += columns;

        for (j = 0; j < trs.length; j++) {
            cols = trs[j].children.length;
            if (cols !== this.columnsCount) {
                for (i = cols; i <= this.columnsCount; i++) {
                    trs[j].append(hs('td'));
                }
            }
        }
    };
















    /**
     *  Get row in table
     * @param {number} index
     * @returns {hs.Element}
     */
    hs.controls.Table.prototype.getRow = function (index) {
        var trs = this.root.children;
        return trs[index] ? trs[index] : null;
    };

    /**
     *  Get cell in table
     * @param {number} row
     * @param {number} column
     * @returns {hs.Element}
     */
    hs.controls.Table.prototype.getCell = function (row, column) {
        var trs = this.root.children,
            tds;

        if (trs[row]) {
            tds = trs[row].children;
            if (tds[column]) {
                return tds[column];
            }
        }

        return null;
    };

}());
