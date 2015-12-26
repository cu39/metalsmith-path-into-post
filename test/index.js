var assert = require('assert');
var dirEqual = require('assert-dir-equal');
var path = require('path');
var Metalsmith = require('metalsmith');
var pip = require('..');

describe('metalsmith-path-into-post', function () {
  it('should add source path into metadata of each file', function (done) {
    var pathBasic = path.join(path.resolve(__dirname), 'fixtures', 'basic');
    Metalsmith(pathBasic)
      .use(pip())
      .build(function (err, files) {
        if (err) return done(err);
        var paths = Object.keys(files).sort();
        assert.equal(paths.length, 3);
        assert.deepEqual(paths.forEach(function (file) {
          assert.equal(files[file].path, file);
        }));
        done();
      });
  });

  it('should add source path (with directory) into metadata', function (done) {
    var pathInDir = path.join(path.resolve(__dirname), 'fixtures', 'in-dir');
    Metalsmith(pathInDir)
      .use(pip())
      .build(function (err, files) {
        if (err) return done(err);
        var paths = Object.keys(files).sort();
        assert.equal(paths.length, 2);
        paths.forEach(function (file) {
          assert.equal(files[file].path, file);
        });
        done();
      });
  });

  it('should filter source files according to regexp given in "pattern" option', function (done) {
    var pathInDir = path.join(path.resolve(__dirname), 'fixtures', 'pattern');
    var regex = /\.md$/;
    Metalsmith(pathInDir)
      .use(pip({
        pattern: regex
      }))
      .build(function (err, files) {
        if (err) return done(err);
        var paths = Object.keys(files).sort();
        assert.equal(paths.length, 2);
        assert.deepEqual(paths.forEach(function (file) {
          if (file.match(regex))
            assert.equal(files[file].path, file);
          else
            assert.equal(typeof files[file].path, 'undefined');
        }));
        done();
      });
  });

  it('should prepend public path prefix to source path', function (done) {
    var pathInDir = path.join(path.resolve(__dirname), 'fixtures', 'public-path');
    var regex = /\.md$/;
    var prefix = '/';
    Metalsmith(pathInDir)
      .use(pip({
        pattern: regex,
        publicPathPrefix: prefix
      }))
      .build(function (err, files) {
        if (err) return done(err);
        var paths = Object.keys(files).sort();
        assert.equal(paths.length, 3);
        assert.deepEqual(paths.forEach(function (file) {
          if (file.match(regex))
            assert.equal(files[file].path, path.join(prefix, file));
          else
            assert.equal(typeof files[file].path, 'undefined');
        }));
        done();
      });
  });

  it('should replace extensions when "ext" option is given', function (done) {
    var pathInDir = path.join(path.resolve(__dirname), 'fixtures', 'extension');
    var regex = /\.md$/;
    var ext = '.html';
    Metalsmith(pathInDir)
      .use(pip({
        pattern: regex, ext
      }))
      .build(function (err, files) {
        if (err) return done(err);
        var paths = Object.keys(files).sort();
        assert.equal(paths.length, 3);
        assert.deepEqual(paths.forEach(function (file) {
          if (file.match(regex))
            assert.equal(files[file].path, file.replace(regex, ext));
          else
            assert.equal(typeof files[file].path, 'undefined');
        }));
        done();
      });
  });
});
