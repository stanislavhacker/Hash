/*global hs, document*/
(function () {
    "use strict";

    /**
     * Get events storage
     * @param {object} events
     * @param {string} event
     * @returns {Array}
     */
    function getEventStorage(events, event) {
        var ev = event.split('.'),
            type = ev[0],
            namespace = ev[1];

        events[type] = events[type] || {};
        if (namespace) {
            events[type][ev[1]] = events[type][namespace] || [];
            return events[type][ev[1]];
        }
        events[type].global = events[type].global || [];
        return events[type].global;
    }

    /**
     * Clear events storage
     * @param {object} events
     * @param {string} event
     */
    function clearEventStorage(events, event) {
        var ev = event.split('.'),
            type = ev[0],
            namespace = ev[1];

        if (namespace) {
            delete events[type][namespace];
        } else {
            delete events[type];
        }
    }

    /**
     * @param {hs.Element} element
     * @constructor
     */
    hs.Events = function (element) {
        /** @type {hs.Element}*/
        this.element = element;
    };

    /**
     * Bind event
     * @param {string} event
     * @param {function} callback
     * @returns {hs.Element}
     */
    hs.Events.prototype.bind = function (event, callback) {
        var element = this.element,
            storage = getEventStorage(element.getStorage(), event);
        storage.push(callback);
        return element;
    };

    /**
     * Unbind event
     * @param {string} event
     * @returns {hs.Element}
     */
    hs.Events.prototype.unbind = function (event) {
        var element = this.element;
        clearEventStorage(element.getStorage(), event);
        return element;
    };

}());