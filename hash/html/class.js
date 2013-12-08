/*global hs, document*/
(function () {
    "use strict";

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
     * Manage css classes
     * @param {map.<string, string>} attributes
     * @param {string} value
     * @param {boolean} state
     */
    function manageClassesInElement(attributes, value, state) {
        var classes  = attributes['class'] || [],
            splitted = value.split(' '),
            clazz,
            index,
            i;

        for (i = 0; i < splitted.length; i++) {
            clazz = splitted[i];
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
     * @param {hs.Element} element
     * @constructor
     */
    hs.Class = function (element) {
        /** @type {hs.Element}*/
        this.element = element;
    };

    /**
     * Add class name
     * @param {string} value
     * @returns {hs.Element}
     */
    hs.Class.prototype.addClass = function (value) {
        var el = this.element;
        manageClassesInElement(el.attributes, value, true);
        updateElementClass(el);
        return el;
    };

    /**
     * Remove class name
     * @param {string} value
     * @returns {hs.Element}
     */
    hs.Class.prototype.removeClass = function (value) {
        var el = this.element;
        manageClassesInElement(el.attributes, value, false);
        updateElementClass(el);
        return el;
    };

    /**
     * Element has class
     * @param {string} value
     * @returns {boolean}
     */
    hs.Class.prototype.hasClass = function (value) {
        var el = this.element;
        if (!el.attributes['class']) {
            return false;
        }
        return el.attributes['class'].indexOf(value) > -1;
    };

    /**
     * Toggle class name
     * @param {string} value
     * @returns {hs.Element}
     */
    hs.Class.prototype.toggleClass = function (value) {
        var el = this.element;
        if (this.hasClass(value)) {
            manageClassesInElement(el.attributes, value, false);
        } else {
            manageClassesInElement(el.attributes, value, true);
        }
        updateElementClass(el);
        return el;
    };

}());