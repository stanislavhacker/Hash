/*global hs*/
(function() {

    /**
     * Get inner html
     * @param {Array.<hs.Element>} children
     * @returns {string}
     */
    function getInnerHtml(children) {
        var i,
            innerHtml = "";

        for (i = 0; i < children.length; i++) {
            innerHtml += children[i].html();
        }

        return innerHtml;
    }

    /**
     * Get html of attributes
     * @param {map.<string, string>} attributes
     * @returns {string}
     */
    function getAttributesHtml(attributes) {
        var key,
            html = "";

        for (key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                if (key === 'class') {
                    html += ' ' + key + '="' + attributes[key].join(' ') + '"';
                } else {
                    html += ' ' + key + '="' + attributes[key] + '"';
                }
            }
        }

        return html;
    }

    /**
     * Manage css classes
     * @param {map.<string, string>} attributes
     * @param {string} value
     * @param {boolean} state
     */
    function manageClassesInElement(attributes, value, state) {
        var classes  = attributes['class'] || [],
            splited = value.split(' '),
            clazz,
            index,
            i;

        for (i = 0; i < splited.length; i++) {
            clazz = splited[i];
            if (classes.indexOf(clazz) === -1 && state) {
                classes.push(clazz);
            }
            if (classes.indexOf(clazz) > -1 && !state) {
                index = classes.indexOf(clazz);
                classes.splice(index, 1);
            }
        }

        attributes['class'] = classes;
    }

    /**
     * Get events storage
     * @param {object} events
     * @param {string} event
     * @returns {Array}
     */
    function getEventStorage(events, event) {
        var ev = event.split('.');

        events[ev[0]] = events[ev[0]] || {};
        if (ev.length > 1) {
            events[ev[0]][ev[1]] = events[ev[0]][ev[1]] || [];
            return events[ev[0]][ev[1]];
        } else {
            events[ev[0]]['_'] = events[ev[0]]['_'] || [];
            return events[ev[0]]['_'];
        }
    }

    /**
     * Get events html
     * @param {{}} storage
     * @param {string} id
     * @returns {string}
     */
    function getEventsHtml(storage, id) {
        var i,
            key,
            html = "";

        for (key in storage) {
            if (storage.hasOwnProperty(key)) {
                html += ' on' + key + '="hs.trigger(\'' + id + '\', \'' + key + '\');"';
            }
        }

        return html;
    }




    /**
     * Create new element
     * @param {string} element
     * @constructor
     */
    hs.Element = function (element) {
        /** @type {string}*/
        this.element = element;
        /** @type {Array.<hs.Element>}*/
        this.children = [];
        /** @type {map.<string, string>}*/
        this.attributes = {};

        /** @type {string}*/
        this.id = hs.getUniqueId();
        /** @type {Object}*/
        this.storage = hs.storage(this.id);
    };

    /**
     * Get html
     * @returns {string}
     */
    hs.Element.prototype.html = function () {
        var innerHtml = getInnerHtml(this.children),
            attr = getAttributesHtml(this.attributes),
            events = getEventsHtml(this.storage, this.id);

        return '<' + this.element + attr + events + '>' + innerHtml + '</' + this.element + '>';
    };

    /**
     * Append html element
     * @param {hs.Element} element
     * @returns {hs.Element}
     */
    hs.Element.prototype.append = function (element) {
        this.children.push(element);
        return this;
    };

    /**
     * Prepend html element
     * @param {hs.Element} element
     * @returns {hs.Element}
     */
    hs.Element.prototype.prepend = function (element) {
        this.children.unshift(element);
        return this;
    };

    /**
     * Ger or set attribute
     * @param {string} attr
     * @param {string} value
     * @returns {string|hs.Element}
     */
    hs.Element.prototype.attr = function (attr, value) {
        if (typeof value === "undefined") {
            return this.attributes[attr];
        }

        if (attr === "class") {
            manageClassesInElement(this.attributes, value, true);
        } else {
            this.attributes[attr] = value;
        }
        return this;
    };

    /**
     * Add class name
     * @param {string} value
     * @returns {hs.Element}
     */
    hs.Element.prototype.addClass = function (value) {
        manageClassesInElement(this.attributes, value, true);
        return this;
    };

    /**
     * Remove class name
     * @param {string} value
     * @returns {hs.Element}
     */
    hs.Element.prototype.removeClass = function (value) {
        manageClassesInElement(this.attributes, value, false);
        return this;
    };

    /**
     * Element has class
     * @param {string} value
     * @returns {boolean}
     */
    hs.Element.prototype.hasClass = function (value) {
        return this.attributes['class'].indexOf(value) > -1;
    };

    /**
     * Toggle class name
     * @param {string} value
     * @returns {hs.Element}
     */
    hs.Element.prototype.toggleClass = function (value) {

        if (this.hasClass(value)) {
            manageClassesInElement(this.attributes, value, false);
        } else {
            manageClassesInElement(this.attributes, value, true);
        }
        return this;
    };

    /**
     * Bind event
     * @param {string} event
     * @param {function} callback
     * @returns {hs.Element}
     */
    hs.Element.prototype.bind = function (event, callback) {
        var storage = getEventStorage(this.storage, event);
        storage.push(callback);
        return this;
    };
}());