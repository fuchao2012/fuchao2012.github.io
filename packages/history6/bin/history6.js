const historyList = require('../lib/history')();
const { groupBy, leftPad } = require('../lib/utils');
const Bar = require('../lib/bar');
const groupedList = groupBy(historyList, (v) => v.split(' ')[0])
const countedList = [];
const filtedList = {};
for (let cmd in groupedList) {
    if (cmd.length < 10 && groupedList[cmd].length > 2) {
        filtedList[cmd] = groupedList[cmd];
        countedList.push(groupedList[cmd].length)
    }
}
const valueMax = countedList.sort((a, b) => b - a).slice(0, 1)[0] || 1;
for (let cmd in filtedList) {
    let bar = new Bar(`${leftPad(cmd, 10)} :bar\n`, {
        total: valueMax,
        complete: '\u001b[42m \u001b[0m',
        incomplete: ' ',
    });
    bar.tick(filtedList[cmd].length);
}
