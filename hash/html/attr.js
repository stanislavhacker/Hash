/*global hs, document*/
(function () {
    "use strict";

    /**
     * @param {hs.Element} element
     * @constructor
     */
    hs.Attr = function (element) {
        /** @type {hs.Element}*/
        this.element = element;
    };

    /**
     * Ger or set attribute
     * @param {string} attr
     * @param {string=} value
     * @returns {string|hs.Element}
     */
    hs.Attr.prototype.attr = function (attr, value) {
        var element = this.element;

        if (typeof value === "undefined") {
            return element.attributes[attr];
        }

        if (attr === "class") {
            element.attributes["class"] = [];
            element.classes.addClass(value);
        } else {
            element.attributes[attr] = value;
        }
        return element;
    };

}());