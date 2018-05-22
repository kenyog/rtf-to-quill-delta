rtf-to-delta
============

This is a Node.js module for converting rtf file into quill delta format.


## Requirement

This modules depends on following modules.

* [@kenyog/rtf-parser](https://github.com/kenyog/rtf-parser)
* [quill-delta](https://quilljs.com/docs/delta/)

## Usage

sample program
```JavaScript
async function main() {
  const RtfToDeltaConverter = require('@kenyog/rtf-to-delta');
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
npm install @kenyog/rtf-to-delta
```

## Licence

MIT

## Author

[kenyog](https://github.com/kenyog)


