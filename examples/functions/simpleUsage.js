/*global hs, document, hljs*/
function render(i, test, updatable) {
    var code = document.getElementById('example' + i + '_code'),
        html = document.getElementById('example' + i + '_html'),
        textNode;

    textNode = document.createTextNode(test.html(updatable));
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

function example5() {
    "use strict";
    var html = hs('div');

    html.css({
        width: '100px',
        height: '100px',
        float: 'left'
    });

    render(5, html);
}

function example6() {
    "use strict";
    var html = hs('div');

    html.addText('Hello text');

    render(6, html);
}

function example7() {
    "use strict";
    var html = hs('div');

    render(7, html);
}

function example71() {
    "use strict";
    var html = hs('div');

    render(71, html, true);
}

function test1() {
    "use strict";
    var html = hs('div');

    html.css({
        padding: '5px',
        border: '1px solid gray'
    });
    html.addText('Click on me!');
    html.render('test1');

    html.bind("click", function () {
         html.toggleClass('gray');
    });
}

function example8() {
    "use strict";
    var html = hs('table'),
        td,
        tr,
        i,
        j;

    for (i = 0; i < 2; i++) {
        tr = hs('tr');
        for (j = 0; j < 3; j++) {
            td = hs('td');
            tr.append(td);
        }
        html.append(tr);
    }

    render(8, html);
}