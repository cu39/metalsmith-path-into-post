# metalsmith-path-into-post

Add source file path into Metalsmith's post metadata.
With this plugin each post knows where it is.

This tiny plugin is expected to be used in combination with
[metalsmith-collections](https://github.com/segmentio/metalsmith-collections)
and/or
[metalsmith-in-place](https://github.com/superwolff/metalsmith-in-place).

## Installation

```
$ npm install metalsmith-path-into-post --save
```

## Usage

```javascript
var Metalsmith = require('metalsmith');
var pathIntoPost = require('metalsmith-path-into-post');

Metalsmith(__dirname)
  .use(pathIntoPost({
    pattern: /\.md$/,
    ext: '.html',
    publicPath: '/'
  })
  .build();
```

or for CLI

```json
{
  "plugins": {
    "metalsmith-permalinks": {
      "pattern": "\\.md$",
      "ext": ".html",
      "publicPath": "/",
    }
  }
}
```

### Options

 * `pattern` RegExp to filter files
 * `ext` String to replace source file's extension with
 * `publicPath` String to be prepended to source file path
