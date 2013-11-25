/*global hs, document*/
(function () {
    "use strict";

    /**
     * @param {hs.Element} element
     * @constructor
     */
    hs.Dom = function (element) {
        /** @type {hs.Element}*/
        this.element = element;
    };

    /**
     * Append html element
     * @param {hs.Element} element
     * @returns {hs.Element}
     */
    hs.Dom.prototype.append = function (element) {
        var base = this.element;
        base.children.push(element);
        return base;
    };

    /**
     * Prepend html element
     * @param {hs.Element} element
     * @returns {hs.Element}
     */
    hs.Dom.prototype.prepend = function (element) {
        var base = this.element;
        base.unshift(element);
        return base;
    };

}());