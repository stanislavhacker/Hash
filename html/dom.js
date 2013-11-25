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
        element.parent = base;
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
        element.parent = base;
        base.unshift(element);
        return base;
    };


    /**
     * Append to element
     * @param {hs.Element} element
     * @returns {hs.Element}
     */
    hs.Dom.prototype.appendTo = function (element) {
        var base = this.element;
        base.parent = element;
        element.children.push(base);
        return base;
    };

    /**
     * Prepend to element
     * @param {hs.Element} element
     * @returns {hs.Element}
     */
    hs.Dom.prototype.prependTo = function (element) {
        var base = this.element;
        base.parent = element;
        element.children.unshift(base);
        return base;
    };

    /**
     * Empty element
     * @returns {hs.Element}
     */
    hs.Dom.prototype.empty = function () {
        var base = this.element;
        base.children.length = 0;
        return base;
    };

    /**
     * Remove self from parent
     * @returns {hs.Element}
     */
    hs.Dom.prototype.remove = function () {
        var base = this.element,
            parent = base.parent,
            index;

        if (parent) {
            index = parent.children.indexOf(this);
            if (index > -1) {
                parent.children.splice(index, 1);
                base.parent = null;
            }
        }

        return base;
    };

    /**
     * Replace element with another element
     * @param {hs.Element} element
     * @returns {hs.Element}
     */
    hs.Dom.prototype.replaceWith = function (element) {
        var base = this.element,
            parent = base.parent,
            index;

        if (parent) {
            index = parent.children.indexOf(this);
            if (index > -1) {
                parent.children.splice(index, 1, element);
                base.parent = null;
                element.parent = parent;
            }
        }

        return base;
    };

}());