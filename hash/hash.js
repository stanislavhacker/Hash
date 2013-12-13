var hs;
(function () {
    "use strict";

    var storage = {},
        uniqueIdCounter = 0;

    //noinspection JSLint
    /**
     * Create new element
     * @param {string} element
     * @returns {hs.Element}
     */
    hs = function (element) {
        return new hs.Element(element);
    };

    /**
     * Get unique id
     * @returns {string}
     */
    hs.getUniqueId = function () {
        var id = "$hs_" + uniqueIdCounter;

        uniqueIdCounter++;
        return id;
    };

    /**
     * Get storage for element
     * @param {string} uid
     * @returns {object}
     */
    hs.storage = function (uid) {
        var exists = storage[uid],
            st = exists || {};

        if (!exists) {
            storage[uid] = st;
        }
        return st;
    };

    /**
     * Trigger events
     * @param {Event} event
     */
    hs.trigger = function (event) {
        var uid = event.target.getAttribute('data-id'),
            storage = hs.storage(uid),
            type = event.type,
            namespace,
            events,
            i;

        events = storage[type];
        for (namespace in events) {
            if (events.hasOwnProperty(namespace)) {
                for (i = 0; i < events[namespace].length; i++) {
                    events[namespace][i](event);
                }
            }
        }
    };

    /**
     * Controls helpers
     */
    (function () {

        /**
         * Create table
         * @param {number} columns
         * @param {number} rows
         * @returns {hs.controls.Table}
         */
        hs.createTable = function (columns, rows) {
            return new hs.controls.Table(columns, rows);
        };

    }());


}());