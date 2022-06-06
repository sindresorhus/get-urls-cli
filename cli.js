#!/usr/bin/env node
import process from 'node:process';
import fs from 'node:fs';
import meow from 'meow';
import stdin from 'get-stdin';
import getUrls from 'get-urls';

const cli = meow(`
	Usage
	  $ get-urls <file>
	  $ cat <file> | get-urls

	Example
	  $ get-urls file.txt
	  https://sindresorhus.com
	  https://github.com
`, {
	importMeta: import.meta,
});

const input = cli.input[0];

function init(data) {
	console.log([...getUrls(data)].join('\n'));
}

if (!input && process.stdin.isTTY) {
	console.error('Specify an input file');
	process.exit(1);
}

if (input) {
	init(fs.readFileSync(input, 'utf8'));
} else {
	init(await stdin());
}
