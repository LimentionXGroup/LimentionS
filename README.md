# LimentionS - build web server easier

## Attention
**Version 1.1.0 released!**  
For more information? please visit our [wiki](https://github.com/LimentionXGroup/LimentionS/wiki)

## We're glad that over 500 downloads!
Thank you for using LimentionS!  
We have decided to sustain the development of this library  
because downloaded more than we thought.

Dear users

## Installation
npm:
```shell
$ npm install limentions
```
yarn:
```shell
$ yarn add limentions
```
## Usage
```javascript
const limentions = require("limentions")

const server = new limentions.Server({develompentMode: true, port: 8080})

// the mapping method is called when a request is made to "/".
server.mapping("/", (req, res) => {
    res.end("Hello World")
})

server.start(() => {
    console.log(`server started with port ${server.getPort()}`)
})
```
## Using Mapper
testMapper.js
```javascript
const { Mapper } = require("limentions")

module.exports = class extend Mapper {

    whenRequested(req, res) {
        res.end(`hello from testMapper!`)
    }
}
```
index.js
```javascript
const limentions = require("limentions")
const testMapper = require("./testMapper")

const server = new limentions.Server({developmentMode: true, port: 8080})

server.useMapper("/test", testMapper)

server.start(() => {
    console.log(`server started with port ${server.getPort()}`)
})
```

## License
Copyright 2022 LimentionX Group


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
(the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.