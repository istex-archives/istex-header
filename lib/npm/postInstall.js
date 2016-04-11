(function() {
  'use strict';

  var
    fs = require('fs')
    , less = require('less')
    , LessPluginCleanCSS = require('less-plugin-clean-css')
    , cleanCSSPlugin = new LessPluginCleanCSS({advanced: true, 'clean-css': '-s0'})
    , source = '@import "./less/main.less";'
    ;

  less.render(source, {plugins: [cleanCSSPlugin]}, function(err, output) {
    if (err) throw err;
    fs.writeFile(
      './public/css/main.min.css',
      output.css,
      function(err) {
        if (err) throw err;
        console.info('Fichier less/main.less compilé et minifié  dans public/css/main.min.css');
      });
  });
}());

