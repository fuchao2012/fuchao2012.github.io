const os = require('os');
const fs = require('fs');
const path = require('path');

const parse = (str) => str
    .trim()
    .split('\n')
    .map(v => /^: \d+:0;/.test(v)
        ? v.split(';').slice(1).join(';')
        : v
    );

const getPath = (opts = {}) => {
    if (process.platform === 'win32') return "";
    if (process.env.HISTFILE) return process.env.HISTFILE;

    const paths = new Set([
        path.join(os.homedir(), '.bash_history'),
        path.join(os.homedir(), '.zsh_history'),
        path.join(os.homedir(), '.history')
    ])

    if (opts.customHistoryPaths) {
        for (let cpath of opts.customHistoryPaths) {
            paths.add(cpath)
        }
    }
    return Array.from(paths)
        .filter(fs.existsSync)
        .map(fp => ({
            fp,
            size: fs.statSync(fp).size
        }))
        .reduce((a, b) => a.size > b.size ? a : b).fp
}

module.exports = (opts = {}) => {
    if(process.platform === 'win32') return [];
    return parse(fs.readFileSync(getPath(opts), 'utf8'));
}