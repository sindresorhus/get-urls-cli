#!/usr/bin/env node
'use strict';
const fs = require('fs');
const meow = require('meow');
const stdin = require('get-stdin');
const getUrls = require('get-urls');

const cli = meow(`
	Usage
	  $ get-urls <file>
	  $ cat <file> | get-urls

	Example
	  $ get-urls file.txt
	  https://sindresorhus.com
	  https://github.com
`);

const input = cli.input[0];

function init(data) {
	console.log(Array.from(getUrls(data)).join('\n'));
}

if (!input && process.stdin.isTTY) {
	console.error('Specify an input file');
	process.exit(1);
}

if (input) {
	init(fs.readFileSync(input, 'utf8'));
} else {
	stdin().then(init);
}
