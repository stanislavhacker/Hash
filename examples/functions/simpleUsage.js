/*global hs, document, hljs*/
function render(i, test) {
    var code = document.getElementById('example' + i + '_code'),
        html = document.getElementById('example' + i + '_html'),
        textNode;

    textNode = document.createTextNode(test.html());
    html.appendChild(textNode);
    hljs.highlightBlock(code);
    hljs.highlightBlock(html);
}

function example1() {
    "use strict";

    var html = hs('div');
    render(1, html);
}

function example2() {
    "use strict";
    var html = hs('span');

    html.attr('title', "Hi!");
    html.attr('id', "hi_span");
    html.attr('data-name', "hello");

    render(2, html);
}

function example3() {
    "use strict";
    var html = hs('div');

    html.addClass('test');
    html.addClass('test');
    html.toggleClass('id');
    html.toggleClass('remove');
    html.removeClass('remove');

    render(3, html);
}

function example4() {
    "use strict";
    var html = hs('div');

    html.bind("click", function (event) {});
    html.unbind("mousedown");

    render(4, html);
}