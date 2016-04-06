var estemplate = require('estemplate')
  , through = require('through2');

module.exports = function(options) {
  options || (options = {});

  return through.obj(function(file, encodeing, callback) {
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    try {
      var template = String(file.contents),
        , ast = estemplate(template, options);
      file.contents = new Buffer(ast);
      this.push(file);

    } catch (e) {
      console.warn('Error caught from estemplate: ' + e);
    }

    return callback();
  });
};
