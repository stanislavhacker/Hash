/*global hs*/
(function () {
    "use strict";

    /**
     * Get inner html
     * @param {Array.<hs.Element>} children
     * @param {Boolean} isUpdatable
     * @returns {string}
     */
    function getInnerHtml(children, isUpdatable) {
        var i,
            innerHtml = "";

        for (i = 0; i < children.length; i++) {
            if (typeof children[i] === "string") {
                innerHtml += children[i];
            } else {
                innerHtml += children[i].html(isUpdatable);
            }
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
            first = true,
            html = ' style="';

        for (key in styles) {
            if (styles.hasOwnProperty(key)) {
                if (first) {
                    html += key + ": " + styles[key] + ";";
                    first = false;
                } else {
                    html += " " + key + ": " + styles[key] + ";";
                }
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
        }
        events[ev[0]]['_'] = events[ev[0]]['_'] || [];
        return events[ev[0]]['_'];
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
     * Mark element as updatable
     * @param {hs.Element} element
     */
    function markAsUpdatable(element) {
        element.isUpdatable = true;
        if (!element.attr('id')) {
            element.attr('id', hs.getUniqueId());
        }
    }

    //UPDATE

    /**
     * Update self in dom
     * @param {hs.Element} element
     */
    function updateElement(element) {
        var self = document.getElementById(element.attr('id')),
            newNode,
            parent;

        if (element.isUpdatable && self) {
            parent = self.parentNode;

            newNode = document.createElement('div');
            newNode.innerHTML = element.html();

            parent.replaceChild(newNode.childNodes[0], self);
        }
    }

    /**
     * Update self class in dom
     * @param {hs.Element} element
     */
    function updateElementClass(element) {
        var self = document.getElementById(element.attr('id'));

        if (element.isUpdatable && self) {
            self.className = element.attributes['class'];
        }
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
    hs.Element.prototype.html = function (isUpdatable) {
        if (isUpdatable) {
            markAsUpdatable(this);
        }

        var innerHtml = getInnerHtml(this.children, isUpdatable),
            attr = getAttributesHtml(this.attributes),
            events = getEventsHtml(this.storage, this.id);

        return '<' + this.element + attr + events + '>' + innerHtml + '</' + this.element + '>';
    };

    /**
     * Render into element
     * @param {string} id
     */
    hs.Element.prototype.render = function (id) {
        document.getElementById(id).innerHTML = this.html(true);
    };

    //DOM OPERATION

    /**
     * Append html element
     * @param {hs.Element} element
     * @returns {hs.Element}
     */
    hs.Element.prototype.append = function (element) {
        this.children.push(element);
        updateElement(this);
        return this;
    };

    /**
     * Prepend html element
     * @param {hs.Element} element
     * @returns {hs.Element}
     */
    hs.Element.prototype.prepend = function (element) {
        this.children.unshift(element);
        updateElement(this);
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
        updateElement(this);
        return this;
    };

    //TEXT

    /**
     * Add text
     * @param {string} text
     */
    hs.Element.prototype.addText = function (text) {
        this.children.push(text);
    };

    /**
     * Remove text
     * @param {string} text
     */
    hs.Element.prototype.removeText = function (text) {
        var index = this.children.indexOf(text);
        this.children.splice(index, 1);
    };

    //CLASS OPERATION

    /**
     * Add class name
     * @param {string} value
     * @returns {hs.Element}
     */
    hs.Element.prototype.addClass = function (value) {
        manageClassesInElement(this.attributes, value, true);
        updateElementClass(this);
        return this;
    };

    /**
     * Remove class name
     * @param {string} value
     * @returns {hs.Element}
     */
    hs.Element.prototype.removeClass = function (value) {
        manageClassesInElement(this.attributes, value, false);
        updateElementClass(this);
        return this;
    };

    /**
     * Element has class
     * @param {string} value
     * @returns {boolean}
     */
    hs.Element.prototype.hasClass = function (value) {
        if (!this.attributes['class']) {
            return false;
        }
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
        updateElementClass(this);
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
        updateElement(this);
        return this;
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
        updateElement(this);
        return this;
    };

    /**
     *Unbind event
     * @param {string} event
     * @returns {hs.Element}
     */
    hs.Element.prototype.unbind = function (event) {
        clearEventStorage(this.storage, event);
        updateElement(this);
        return this;
    };
}());