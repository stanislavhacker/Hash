/*global hs, document*/
(function () {
    "use strict";

    hs.controls = hs.controls || {};

    /**
     * Table
     * @param {number} columns
     * @param {number} rows
     * @constructor
     */
    hs.controls.Table = function (columns, rows) {
        this.rowsCount = 0;
        this.columnsCount = 0;

        this.root = hs('table');

        this.addRows(rows || 0);
        this.addColumns(columns || 0);
    };

    /**
     * Rows and columns operations
     */
    (function () {

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
            this.addColumns(0);
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
         *  Delete row in table
         * @param {number} index
         */
        hs.controls.Table.prototype.deleteRow = function (index) {
            var trs = this.root.children;
            if (trs[index]) {
                trs[index].remove();
            } else {
                throw "Cannot delete non existing row on index '" + index + "'.";
            }
        };

    }());

    /**
     * Getters
     */
    (function () {

        /**
         *  Get row in table
         * @param {number} index
         * @returns {hs.Element}
         */
        hs.controls.Table.prototype.getRow = function (index) {
            var trs = this.root.children;
            return trs[index] || null;
        };

        /**
         *  Get rows in table
         * @returns {Array.<hs.Element>}
         */
        hs.controls.Table.prototype.getRows = function () {
            return this.root.children;
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
                    //noinspection JSValidateTypes
                    return tds[column];
                }
            }

            return null;
        };

        /**
         *  Get columns count
         * @returns {number}
         */
        hs.controls.Table.prototype.getColumnsCount = function () {
            return this.columnsCount;
        };

        /**
         *  Get rows count
         * @returns {number}
         */
        hs.controls.Table.prototype.getRowsCount = function () {
            return this.rowsCount;
        };

    }());

    /**
     * Render and html
     */
    (function () {

        /**
         * Get html
         * @param {boolean=} isUpdatable
         * @returns {string}
         */
        hs.controls.Table.prototype.html = function (isUpdatable) {
            return this.root.html(isUpdatable);
        };

        /**
         * Render
         * @param {string} id
         */
        hs.controls.Table.prototype.render = function (id) {
            this.root.render(id);
        };

    }());

}());
