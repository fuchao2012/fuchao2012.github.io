const historyList = require('../lib/history')();
const { groupBy, leftPad, orderBy } = require('../lib/utils');
const Bar = require('../lib/bar');
const groupedMap = groupBy(historyList, (v) => v.split(' ')[0])
const sortedGroupMap = {};
orderBy(Object.entries(groupedMap)
    .map(([key, value]) => ({
        key: key,
        value: value.length
    })), ['value'], ['desc']).forEach((value) => {
        sortedGroupMap[value.key] = groupedMap[value.key]
    })

const valueMax = Object.values(sortedGroupMap)[0].length + 10;

console.log(`\n ${leftPad(' ', 10)}0${'-'.repeat(process.stdout.columns - 15)}->`)
console.log(` ${leftPad(' ', 10)}|`);

for (let cmd in sortedGroupMap) {
    if (cmd && cmd.length <= 10 && /\w+/.test(cmd) && sortedGroupMap[cmd].length >= 3) {
        let bar = new Bar(`${leftPad(cmd, 10)} |:bar\n`, {
            total: valueMax,
            complete: '\u001b[42m \u001b[0m',
            incomplete: ' ',
        });
        bar.tick(sortedGroupMap[cmd].length);
    }
}
