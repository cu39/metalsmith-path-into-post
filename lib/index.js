var debug = require('debug')('metalsmith-path-into-post');
var path = require('path');

module.exports = plugin;

function plugin(options) {
  options = options || {};
  options.pattern = coercePattern(options.pattern);

  function coercePattern(ptn) {
    if (ptn instanceof RegExp) return ptn;
    if (ptn instanceof String) return new RegExp(ptn);
    return /\.html$/;
  }

  return function pathIntoPost(files, metalsmith, done) {
    for (var filePath in files) {
      debug("tested path = %s", filePath);
      if (!filePath.match(options.pattern)) {
        debug("skipped: %s", filePath);
        continue;
      }

      var toStore = filePath;

      if (options.publicPathPrefix) {
        toStore = path.join(options.publicPathPrefix, filePath);
      }

      if (options.ext) {
        toStore = toStore.replace(path.extname(filePath), options.ext);
      }

      files[filePath].path = toStore;
      debug("inserted path = %s", files[filePath].path);
    }
    done();
  };
}
