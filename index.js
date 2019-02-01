'use strict';
const rtfStringParse = require('@kenyog/rtf-parser').string;
const { rtfToDelta } = require('./rtf-to-delta.js');

function rtfParser(rtf) {
  return new Promise((res,rej) => {
    rtfStringParse(rtf, (err, rtfDoc) => {
      if (err) rej(err);
      else res(rtfDoc);
    });
  });
}

function readFile(testfile) {
  let fs = require('fs');
  return new Promise((res,rej) => {
    fs.readFile(testfile, {encoding: 'ascii'}, (err,data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}


class RtfToDeltaConverter {
  constructor(option={}) {
    this.usePoint = false;

    if (option) {
      this.usePoint = (option.usePoint===true);
    }
  }

  convert(rtf) {
    return this.convertRtfString(rtf);
  }

  async convertRtfString(rtfString) {
    try {
      let rtfDoc = await rtfParser(rtfString);
      return rtfToDelta(rtfDoc, this.usePoint);
    } catch(e) {
      throw e;
    }
  }

  async convertRtfFile(rtfFile) {
    try {
      let rtfString = await readFile(rtfFile);
      let rtfDoc = await rtfParser(rtfString);
      return rtfToDelta(rtfDoc, this.usePoint);
    } catch(e) {
      throw e;
    }
  }

}
RtfToDeltaConverter.testData = '{\\rtf1\\ansi\\b Hello world!\\b0}';


module.exports = RtfToDeltaConverter;

