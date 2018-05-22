'use strict';

const Delta = require('quill-delta');

module.exports = {
  rtfToDelta: rtfToDelta,
};

function rtfToDelta (doc) {
  //console.log(JSON.stringify(doc.content[0], null,2));
  let result = new Delta();
  for (let paragraph of doc.content) {
    result = result.concat(paragraphToDelta(paragraph));
  }
  return result;
}

function paragraphToDelta(paragraph) {
  if (paragraph.content.length === 0) return null;

  let result = new Delta();
  for(let content of paragraph.content) {
    let delta = contentToDelta(content, paragraph.style);
    result = result.concat(delta);
  }

  return result.concat(new Delta([{ insert: '\n' }]));
}

function contentToDelta(content, paragraphStyle) {
  let attr = {
    bold: selectOr(content.style.bold, paragraphStyle.bold),
    italic: selectOr(content.style.italic, paragraphStyle.italic),
    strike: selectOr(content.style.strikethrough, paragraphStyle.strikethrough),
    underline: selectOr(content.style.underline, paragraphStyle.underline),
    font: getFont(content.style.font, paragraphStyle.font),
    size: getFontSize(content.style.fontSize, paragraphStyle.fontSize),
    color: getColor(selectOr(content.style.foreground, paragraphStyle.foreground)),
  };
  return new Delta([
    { insert: content.value, attributes: attr}
  ]);
}

function selectOr(first, second) {
  return (first!==null)? first: second;
}

function getFont(first, second) {
  return (first!==null)? first.name: (second!==null)? second.name: null;
}

function getFontSize(first, second) {
  if (first!==null) {
    return `${Math.floor(first*2/3*10)/10}px`;
  } else if (second!=null) {
    return `${Math.floor(second*2/3*10)/10}px`;
  } else {
    return undefined;
  }
}

function twoHex(num) {
  return ('00'+num.toString(16)).substr(-2);
}

function getColor(color) {
  if (color===null) return undefined;
  return `#${twoHex(color.red)}${twoHex(color.green)}${twoHex(color.blue)}`;
}

