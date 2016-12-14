# dlc

> Decrypt a dlc file without any web service.

## Installation

```bash
$ npm i -S dlc
```

## Usage

```js
const fs = require('fs')
const decrypt = require('dlc')

let file = fs.readFileSync('./sample.dlc') // just create a read stream with
                                           // the dlc content
decrypt(file).then(res => console.log)

/**
 * { dlc:
   { header:
      [ { generator:
           [ { app: [ 'TElOS0NSWVBULldT' ],
               version: [ 'MC43Mg==' ],
               url: [ 'TElOS0NSWVBULldT' ] } ],
          tribute: [ { name: [ 'TGlua2NyeXB0Lndz' ] } ],
          dlcxmlversion: [ 'MjBfMDJfMjAwOA==' ] } ],
     content:
      [ { package:
           [ { '$':
                { name: 'azRiOTg5MzJxdXY3ZG05',
                  comment: 'RXJzdGVsbHQgdm9uIExpbmtjcnlwdC53cw==',
                  category: 'TGluayBPcmRuZXI=' },
               file:
                [ { url: [ 'aHR0cDovL2V4YW1wbGUuZXU=' ] },
                  { url: [ 'aHR0cDovL2V4YW1wbGUuY29tL2V4YW1wbGUucGRm' ] },
                  { url: [ 'aHR0cDovL2V4YW1wbGUuY29tL2V4YW1wbGUuanBn' ] },
                  { url: [ 'aHR0cHM6Ly9leGFtcGxlLnVzL2V4YW1wbGUuanBn' ] } ] } ] } ] } }
 */
```

## API

`decrypt(dlcfile)`
* `dlcfile` - Buffer - The whole content of the dlc file
* Returns a promise
