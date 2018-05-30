'use strict';
import path from 'path';
import fs from 'fs';

import test from 'ava';
import Delta from 'quill-delta';

import RtfToDeltaConverter from '..';


function readTestFile(testfile) {
  let testPath = path.join(__dirname, 'data', testfile);
  return new Promise((res,rej) => {
    fs.readFile(testPath, {encoding: 'ascii'}, (err,data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}

test('test color', async t => {

  let rtfData = await readTestFile('test-color.rtf');
  let converter = new RtfToDeltaConverter();
  let delta = await converter.convert(rtfData);

  t.true(delta instanceof Delta, 'class check');
  t.true(delta.hasOwnProperty('ops'), 'property check');

  t.is(delta.ops[0].insert, 'ABC');
  t.is(delta.ops[1].insert, 'DEFGHIJ');
  t.is(delta.ops[1].attributes.color, '#fb0207');
  t.is(delta.ops[2].insert, 'KLM');

  t.is(delta.ops[4].insert, 'NOPQRSTUVWXYZ');
  t.is(delta.ops[4].attributes.color, '#21ff06');
});


test('test deco', async t => {

  let rtfData = await readTestFile('test-deco.rtf');
  let converter = new RtfToDeltaConverter();
  let delta = await converter.convert(rtfData);

  t.true(delta instanceof Delta, 'class check');
  t.true(delta.hasOwnProperty('ops'), 'property check');

  let b = 0;
  t.is(delta.ops[b+0].insert, 'ABC');
  t.is(delta.ops[b+1].insert, 'DEFGHIJ');
  t.is(delta.ops[b+1].attributes.bold, true);
  t.is(delta.ops[b+2].insert, 'KLM');
  t.is(delta.ops[b+3].insert, '\n');
  t.is(delta.ops[b+4].insert, 'NOPQRSTUVWXYZ');
  t.is(delta.ops[b+4].attributes.bold, true);
  t.is(delta.ops[b+5].insert, '\n');
  t.is(delta.ops[b+6].insert, 'abcdefghijklmnopqrstuvwxyz');
  t.is(delta.ops[b+7].insert, '\n');

  b = 8;
  t.is(delta.ops[b+0].insert, 'ABC');
  t.is(delta.ops[b+1].insert, 'DEFGHIJ');
  t.is(delta.ops[b+1].attributes.italic, true);
  t.is(delta.ops[b+2].insert, 'KLM');
  t.is(delta.ops[b+3].insert, '\n');
  t.is(delta.ops[b+4].insert, 'NOPQRSTUVWXYZ');
  t.is(delta.ops[b+4].attributes.italic, true);
  t.is(delta.ops[b+5].insert, '\n');
  t.is(delta.ops[b+6].insert, 'abcdefghijklmnopqrstuvwxyz');
  t.is(delta.ops[b+7].insert, '\n');

  b = 16;
  t.is(delta.ops[b+0].insert, 'ABC');
  t.is(delta.ops[b+1].insert, 'DEFGHIJ');
  t.is(delta.ops[b+1].attributes.underline, true);
  t.is(delta.ops[b+2].insert, 'KLM');
  t.is(delta.ops[b+3].insert, '\n');
  t.is(delta.ops[b+4].insert, 'NOPQRSTUVWXYZ');
  t.is(delta.ops[b+4].attributes.underline, true);
  t.is(delta.ops[b+5].insert, '\n');
  t.is(delta.ops[b+6].insert, 'abcdefghijklmnopqrstuvwxyz');
  t.is(delta.ops[b+7].insert, '\n');

  b = 24;
  t.is(delta.ops[b+0].insert, 'ABC');
  t.is(delta.ops[b+1].insert, 'DEFGHIJ');
  t.is(delta.ops[b+1].attributes.strike, true);
  t.is(delta.ops[b+2].insert, 'KLM');
  t.is(delta.ops[b+3].insert, '\n');
  t.is(delta.ops[b+4].insert, 'NOPQRSTUVWXYZ');
  t.is(delta.ops[b+4].attributes.strike, true);
  t.is(delta.ops[b+5].insert, '\n');
  t.is(delta.ops[b+6].insert, 'abcdefghijklmnopqrstuvwxyz');
  t.is(delta.ops[b+7].insert, '\n');
});


test('test font', async t => {

  let rtfData = await readTestFile('test-font.rtf');
  let converter = new RtfToDeltaConverter();
  let delta = await converter.convert(rtfData);

  t.true(delta instanceof Delta, 'class check');
  t.true(delta.hasOwnProperty('ops'), 'property check');

  let b = 0;
  t.is(delta.ops[b+0].insert, 'ABC');
  t.is(delta.ops[b+1].insert, 'DEFGHIJ');
  t.is(delta.ops[b+1].attributes.font, 'ArialMT');
  t.is(delta.ops[b+2].insert, 'KLM');
  t.is(delta.ops[b+3].insert, '\n');
  t.is(delta.ops[b+4].insert, 'NOPQRSTUVWXYZ');
  t.is(delta.ops[b+4].attributes.font, 'ArialMT');
  t.is(delta.ops[b+5].insert, '\n');
  t.is(delta.ops[b+6].insert, 'abcdefghijklmnopqrstuvwxyz');
  t.is(delta.ops[b+7].insert, '\n');

  b = 8;
  t.is(delta.ops[b+0].insert, 'ABC');
  t.is(delta.ops[b+1].insert, 'DEFGHIJ');
  t.is(delta.ops[b+1].attributes.font, 'Times-Roman');
  t.is(delta.ops[b+2].insert, 'KLM');
  t.is(delta.ops[b+3].insert, '\n');
  t.is(delta.ops[b+4].insert, 'NOPQRSTUVWXYZ');
  t.is(delta.ops[b+4].attributes.font, 'Times-Roman');
  t.is(delta.ops[b+5].insert, '\n');
  t.is(delta.ops[b+6].insert, 'abcdefghijklmnopqrstuvwxyz');
  t.is(delta.ops[b+7].insert, '\n');

  b = 16;
  t.is(delta.ops[b+0].insert, 'ABC');
  t.is(delta.ops[b+1].insert, 'DEFGHIJ');
  t.is(delta.ops[b+1].attributes.font, 'HiraKakuStdN-W8');
  t.is(delta.ops[b+2].insert, 'KLM');
  t.is(delta.ops[b+3].insert, '\n');
  t.is(delta.ops[b+4].insert, 'NOPQRSTUVWXYZ');
  t.is(delta.ops[b+4].attributes.font,  'HiraKakuStdN-W8');
  t.is(delta.ops[b+5].insert, '\n');
  t.is(delta.ops[b+6].insert, 'abcdefghijklmnopqrstuvwxyz');
  t.is(delta.ops[b+7].insert, '\n');

  b = 24;
  t.is(delta.ops[b+0].insert, 'ABC');
  t.is(delta.ops[b+1].insert, 'DEFGHIJ');
  t.is(delta.ops[b+1].attributes.size, `${24*4/3}px`);
  t.is(delta.ops[b+2].insert, 'KLM');
  t.is(delta.ops[b+3].insert, '\n');
  t.is(delta.ops[b+4].insert, 'NOPQRSTUVWXYZ');
  t.is(delta.ops[b+4].attributes.size, `${18*4/3}px`);
  t.is(delta.ops[b+5].insert, '\n');
  t.is(delta.ops[b+6].insert, 'abcdefghijklmnopqrstuvwxyz');
  t.is(delta.ops[b+7].insert, '\n');
});

