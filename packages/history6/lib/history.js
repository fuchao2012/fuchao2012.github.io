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
        paht.join(os.homedir(), '.history')
    ])
}