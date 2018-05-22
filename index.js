'use strict';
const rtfParser = require('util').promisify(require('@kenyog/rtf-parser').string);
const { rtfToDelta } = require('./rtf-to-delta.js');

class RtfToDeltaConverter {
  constructor() {
  }

  async convert(rtf) {
    try {
      let rtfDoc = await rtfParser(rtf);
      return rtfToDelta(rtfDoc);
    } catch(e) {
      throw e;
    }
  }
}

module.exports = RtfToDeltaConverter;

