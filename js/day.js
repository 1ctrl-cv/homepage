// Copyright (c) B84F2246
// Author: B84F2246
// day.js
/////////////////////////
document.write([
    '<style type="text/css">',
    '  .htmlgray-filter {',
    '    filter: grayscale(100%);',
    '    -webkit-filter: grayscale(100%);',
    '    -moz-filter: grayscale(100%);',
    '    -ms-filter: grayscale(100%);',
    '    -o-filter: grayscale(100%);',
    '    filter: url("data:image/svg+xml;utf8,#grayscale");',
    '    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);',
    '    -webkit-filter: grayscale(1);',
    '  }',
    '</style>'].join('')
);


var date = new Date();
var nowMonth = date.getMonth() + 1;
var nowDay = date.getDate();
var nowDate = nowMonth + '-' + nowDay;

var nationalMemorialDayArray = [
    '4-4',
    '9-18',
    '12-13'
];

if (nationalMemorialDayArray.includes(nowDate) && location.pathname == '/') {
    var root = document.documentElement;
    root.className += ' htmlgray-filter';
}