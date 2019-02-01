#!/usr/bin/env node

const { promisify } = require('util');
const program = require('commander');
const path = require('path');
const Converter = require('./index.js');
const writeFile = promisify(require('fs').writeFile);
 
program
  .option('-p, --usepoint', 'use point size', false)
  .parse(process.argv);


async function main(prg) {
  if (prg.args.length < 1) {
    prg.outputHelp();
    return;
  }

  let target = prg.args[0];

  if (target.endsWith('.rtf')) {
    try {
    let dest = target.replace(/\.rtf$/, '.delta');
    let conv = new Converter({usePoint: prg.usepoint});
    let delta = await conv.convertRtfFile(target);
    await writeFile(dest, JSON.stringify(delta,null,2));
    } catch(e) {
      console.error(e);
    }
  }
}

main(program)
  .then()
  .catch(e => console.error(e));

