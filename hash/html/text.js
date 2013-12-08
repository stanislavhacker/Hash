/*global hs, document*/
(function () {
    "use strict";

    /**
     * @param {hs.Element} element
     * @constructor
     */
    hs.Text = function (element) {
        /** @type {hs.Element}*/
        this.element = element;
    };

    /**
     * Add text
     * @param {string} text
     * @return {hs.Element}
     */
    hs.Text.prototype.addText = function (text) {
        var element = this.element;
        element.children.push(text);
        return element;
    };

    /**
     * Remove text
     * @param {string} text
     * @return {hs.Element}
     */
    hs.Text.prototype.removeText = function (text) {
        var element = this.element,
            index = element.children.indexOf(text);
        if (index > -1) {
            element.children.splice(index, 1);
        }
        return element;
    };

}());