rtf-to-quill-delta
==================

This is a Node.js module for converting rtf file into quill delta format.


## Requirement

This modules depends on following modules.

* [@kenyog/rtf-parser](https://github.com/kenyog/rtf-parser)
* [quill-delta](https://quilljs.com/docs/delta/)

## Usage

sample program
```JavaScript
const RtfToDeltaConverter = require('@kenyog/rtf-to-quill-delta');
async function main() {
  let rtf = await readFile('test.rtf', {encoding: 'ascii'});
  let converter = new RtfToDeltaConverter();
  let delta = await converter.convert(rtf);
  console.log(JSON.stringify(delta, null, 2));
}
```

Output
```json
{
  "ops": [
    {
      "insert": "ai",
      "attributes": {
        "size": "8px",
        "color": "#000000"
      }
    },
    {
      "insert": "ueoaiu",
      "attributes": {
        "bold": true,
        "size": "10.6px",
        "color": "#000000"
      }
    },
    {
      "insert": "eo",
      "attributes": {
        "bold": false,
        "size": "8px",
        "color": "#000000"
      }
    },
    {
      "insert": "\n"
    }
  ]
}
```

## Install

```
npm install @kenyog/rtf-to-quill-delta
```

## Licence

MIT

## Author

[kenyog](https://github.com/kenyog)


