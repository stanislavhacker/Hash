/*global hs, document*/
(function () {
    "use strict";

    /**
     * Update self in dom
     * @param {hs.Element} element
     */
    function updateElement(element) {
        var newNode,
            parent,
            self;

        if (element.isUpdatable) {
            self = document.getElementById(element.attr('id'));

            if (self) {
                parent = self.parentNode;

                newNode = document.createElement('div');
                newNode.innerHTML = element.html();

                parent.replaceChild(newNode.childNodes[0], self);
            }
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
        this.storage = null;

        /** @type {boolean}*/
        this.isUpdatable = false;

        /** @type {hs.Element}*/
        this.parent = null;

        //helpers
        this.classes = new hs.Class(this);
        this.styles = new hs.Css(this);
        this.events = new hs.Events(this);
        this.text = new hs.Text(this);
        this.dom = new hs.Dom(this);
        this.attrs = new hs.Attr(this);
        this.renderer = new hs.Renderer(this);
    };

    /**
     * Utils functions
     */
    (function () {

        /**
         * Get storage
         * @returns {object}
         */
        hs.Element.prototype.getStorage = function () {
            if (!this.storage) {
                this.storage = hs.storage(this.id);
            }
            return this.storage;
        };

    }());

    /**
     * Render operations
     */
    (function () {

        /**
         * Get html
         * @returns {string}
         */
        hs.Element.prototype.html = function (isUpdatable) {
            return this.renderer.html(isUpdatable);
        };

        /**
         * Render into element
         * @param {string} id
         */
        hs.Element.prototype.render = function (id) {
            this.renderer.render(id);
        };

    }());

    /**
     * Attr operations
     */
    (function () {

        /**
         * Ger or set attribute
         * @param {string} attr
         * @param {string=} value
         * @returns {string|hs.Element}
         */
        hs.Element.prototype.attr = function (attr, value) {
            var el = this.attrs.attr(attr, value);
            if (value !== undefined) {
                updateElement(el);
            }
            return el;
        };

    }());

    /**
     * Dom operation
     */
    (function () {

        /**
         * Append html element
         * @param {hs.Element} element
         * @returns {hs.Element}
         */
        hs.Element.prototype.append = function (element) {
            var el = this.dom.append(element);
            updateElement(el);
            return el;
        };

        /**
         * Prepend html element
         * @param {hs.Element} element
         * @returns {hs.Element}
         */
        hs.Element.prototype.prepend = function (element) {
            var el = this.dom.prepend(element);
            updateElement(el);
            return el;
        };


        /**
         * Append to element
         * @param {hs.Element} element
         * @returns {hs.Element}
         */
        hs.Element.prototype.appendTo = function (element) {
            var el = this.dom.appendTo(element);
            updateElement(el);
            return el;
        };

        /**
         * Prepend to element
         * @param {hs.Element} element
         * @returns {hs.Element}
         */
        hs.Element.prototype.prependTo = function (element) {
            var el = this.dom.prependTo(element);
            updateElement(el);
            return el;
        };

        /**
         * Empty element
         * @returns {hs.Element}
         */
        hs.Element.prototype.empty = function () {
            var el = this.dom.empty();
            updateElement(el);
            return el;
        };

        /**
         * Remove self from parent
         * @returns {hs.Element}
         */
        hs.Element.prototype.remove = function () {
            var el = this.dom.remove();
            updateElement(el);
            return el;
        };

        /**
         * Replace element with another element
         * @param {hs.Element} element
         * @returns {hs.Element}
         */
        hs.Element.prototype.replaceWith = function (element) {
            var el = this.dom.replaceWith(element);
            updateElement(el);
            return el;
        };

    }());

    /**
     * Text operations
     */
    (function () {

        /**
         * Add text
         * @param {string} text
         * @return {hs.Element}
         */
        hs.Element.prototype.addText = function (text) {
            return this.text.addText(text);
        };

        /**
         * Remove text
         * @param {string} text
         * @return {hs.Element}
         */
        hs.Element.prototype.removeText = function (text) {
            return this.text.removeText(text);
        };

    }());

    /**
     * Class operations
     */
    (function () {

        /**
         * Add class name
         * @param {string} value
         * @returns {hs.Element}
         */
        hs.Element.prototype.addClass = function (value) {
            return this.classes.addClass(value);
        };

        /**
         * Remove class name
         * @param {string} value
         * @returns {hs.Element}
         */
        hs.Element.prototype.removeClass = function (value) {
            return this.classes.removeClass(value);
        };

        /**
         * Element has class
         * @param {string} value
         * @returns {boolean}
         */
        hs.Element.prototype.hasClass = function (value) {
            return this.classes.hasClass(value);
        };

        /**
         * Toggle class name
         * @param {string} value
         * @returns {hs.Element}
         */
        hs.Element.prototype.toggleClass = function (value) {
            return this.classes.toggleClass(value);
        };

    }());

    /**
     * Css operations
     */
    (function () {

        /**
         *
         * @param {object|string} cssOrObject
         * @param {string=} value
         * @returns {hs.Element|string}
         */
        hs.Element.prototype.css = function (cssOrObject, value) {
            var el = this.styles.css(cssOrObject, value);
            updateElement(el);
            return el;
        };

    }());

    /**
     * Events
     */
    (function () {

        /**
         * Bind event
         * @param {string} event
         * @param {function} callback
         * @returns {hs.Element}
         */
        hs.Element.prototype.bind = function (event, callback) {
            var el = this.events.bind(event, callback);
            updateElement(el);
            return el;
        };

        /**
         *Unbind event
         * @param {string} event
         * @returns {hs.Element}
         */
        hs.Element.prototype.unbind = function (event) {
            var el = this.events.unbind(event);
            updateElement(el);
            return el;
        };

    }());
}());