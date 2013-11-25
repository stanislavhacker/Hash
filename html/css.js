/*global hs, document*/
(function () {
    "use strict";

    /**
     * @param {hs.Element} element
     * @constructor
     */
    hs.Css = function (element) {
        /** @type {hs.Element}*/
        this.element = element;
    };

    /**
     *
     * @param {object|string} cssOrObject
     * @param {string=} value
     * @returns {hs.Element|string}
     */
    hs.Css.prototype.css = function (cssOrObject, value) {
        var element = this.element,
            css = element.attributes['style'] || {},
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
        element.attributes['style'] = css;
        return element;
    };

}());