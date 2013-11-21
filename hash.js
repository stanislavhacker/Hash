var hs;
(function() {

    var storage = {};

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
        var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    /**
     * Get storage for element
     * @param {string} uid
     * @returns {object}
     */
    hs.storage = function (uid) {
        var st = storage[uid] || {};
        storage[uid] = st;
        return st;
    };

    /**
     * Trigger events
     * @param {string} uid
     * @param {string} type
     */
    hs.trigger = function (uid, type) {
        var storage = hs.storage(uid),
            namespace,
            events,
            i;

        events = storage[type];
        for (namespace in events) {
            if (events.hasOwnProperty(namespace)) {
                for (i = 0; i < events[namespace].length; i++) {
                    events[namespace][i]();
                }
            }
        }
    };


}());