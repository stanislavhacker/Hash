/*global hs*/
(function () {
    "use strict";

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
                switch (key) {
                    case 'class':
                        html += ' ' + key + '="' + attributes[key].join(' ') + '"';
                        break;
                    case 'style':
                        if (typeof attributes[key] === "string") {
                            html += ' ' + key + '="' + attributes[key] + '"';
                        } else {
                            html += getCssHtml(attributes[key]);
                        }
                        break;
                    default:
                        html += ' ' + key + '="' + attributes[key] + '"';
                        break;
                }
            }
        }

        return html;
    }

    /**
     * Get html for css
     * @param {object} styles
     * @returns {string}
     */
    function getCssHtml(styles) {
        var key,
            html = ' style="';

        for (key in styles) {
            if (styles.hasOwnProperty(key)) {
                html += key + ": " + styles[key] + "; ";
            }
        }

        html += '"';

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
     * Clear events storage
     * @param {object} events
     * @param {string} event
     */
    function clearEventStorage(events, event) {
        var ev = event.split('.');

        if (ev.length > 1) {
            delete events[ev[0]][ev[1]];
        } else {
            delete events[ev[0]];
        }
    }

    /**
     * Get events html
     * @param {{}} storage
     * @param {string} id
     * @returns {string}
     */
    function getEventsHtml(storage, id) {
        var key,
            exists = false,
            html = "";

        for (key in storage) {
            if (storage.hasOwnProperty(key)) {
                html += ' on' + key + '="hs.trigger(event);"';
                exists = true;
            }
        }

        if (exists) {
            html += ' data-id="' + id + '"';
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

        /** @type {boolean}*/
        this.isUpdatable = false;
    };

    /**
     * Get html
     * @returns {string}
     */
    hs.Element.prototype.html = function () {
        this.updatable();

        var innerHtml = getInnerHtml(this.children),
            attr = getAttributesHtml(this.attributes),
            events = getEventsHtml(this.storage, this.id);

        return '<' + this.element + attr + events + '>' + innerHtml + '</' + this.element + '>';
    };

    /**
     * Render into element
     * @param {string} id
     */
    hs.Element.prototype.render = function (id) {
        document.getElementById(id).innerHTML = this.html();
    };

    //DOM OPERATION

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

    //ATTR

    /**
     * Ger or set attribute
     * @param {string} attr
     * @param {string=} value
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

    //CLASS OPERATION

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

    //CSS

    /**
     *
     * @param {object|string} cssOrObject
     * @param {string=} value
     * @returns {hs.Element|string}
     */
    hs.Element.prototype.css = function (cssOrObject, value) {
        var css = this.attributes['style'] || {},
            key;

        //update css
        if (typeof cssOrObject === "object") {
            for (key in cssOrObject) {
                if (cssOrObject.hasOwnProperty(key)) {
                    css[key] = cssOrObject[key];
                }
            }
        }

        if (typeof cssOrObject === "string") {
            //save css
            if (value) {
                css[cssOrObject] = value;
            //get css
            } else {
                return css[cssOrObject];
            }
        }
        this.attributes['style'] = css;
        return this;
    };

    //UPDATE

    /**
     * @private
     * Mark element as updatable
     */
    hs.Element.prototype.updatable = function () {
        this.isUpdatable = true;
        if (!this.attr('id')) {
            this.attr('id', hs.getUniqueId());
        }
    };

    /**
     * Update self in dom
     */
    hs.Element.prototype.update = function () {
        var self = document.getElementById(this.attr('id')),
            newNode,
            parent;

        if (this.isUpdatable && self) {
            parent = self.parentNode;

            newNode = document.createElement('div');
            newNode.innerHTML = this.html();

            parent.replaceChild(newNode.childNodes[0], self);
        }
    };

    //EVENTS

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

    /**
     *Unbind event
     * @param {string} event
     * @returns {hs.Element}
     */
    hs.Element.prototype.unbind = function (event) {
        clearEventStorage(this.storage, event);
        this.update();
        return this;
    };
}());