/*global hs, document*/
(function () {
    "use strict";

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
     * @param {hs.Element} element
     * @constructor
     */
    hs.Renderer = function (element) {
        /** @type {hs.Element}*/
        this.element = element;
    };

    /**
     * Get html
     * @returns {string}
     */
    hs.Renderer.prototype.html = function (isUpdatable) {
        var element = this.element,
            innerHtml,
            events,
            attr;

        if (isUpdatable) {
            markAsUpdatable(element);
        }

        innerHtml = getInnerHtml(element.children, isUpdatable);
        attr = getAttributesHtml(element.attributes);
        events = getEventsHtml(element.storage, element.id);

        return '<' + element.element + attr + events + '>' + innerHtml + '</' + element.element + '>';
    };

    /**
     * Render into element
     * @param {string} id
     */
    hs.Renderer.prototype.render = function (id) {
        var element = this.element;
        document.getElementById(id).innerHTML = element.html(true);
    };

}());