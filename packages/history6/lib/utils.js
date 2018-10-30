module.exports.groupBy = (arr, fn) =>
    arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
        acc[val] = (acc[val] || []).concat(arr[i]);
        return acc;
    }, {});

module.exports.matrix = (width, height, value = null) =>
    Array.from({ length: height }).map(() => Array.from({ length: width }).fill(value));

module.exports.reduceWith = (arr, comparator = (a, b) => a - b) =>
    arr.reduce((a, b) => (comparator(a, b) >= 0 ? a : b))

const cache = [
    '',
    ' ',
    '  ',
    '   ',
    '    ',
    '     ',
    '      ',
    '       ',
    '        ',
    '         '
];

module.exports.leftPad = (str, len, ch) => {
    str = str + '';
    len = len - str.length;
    if (len <= 0) return str;
    if (!ch && ch !== 0) ch = ' ';
    ch = ch + '';
    if (ch === ' ' && len < 10) return cache[len] + str;
    var pad = '';
    while (true) {
        if (len & 1) pad += ch;
        len >>= 1;
        if (len) ch += ch;
        else break;

        return pad + str;
    }
}