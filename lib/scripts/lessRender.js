'use strict';

exports.render = render;


var
  less               = require('less'),
  LessPluginCleanCSS = require('less-plugin-clean-css'),
  fs                 = require('fs-extra'),
  cleanCSSPlugin     = new LessPluginCleanCSS({advanced: true, 'clean-css': '-s0', 'keepSpecialComments': 0}),
  keepBreaksCSSPlugin    = new LessPluginCleanCSS({advanced: true, 'keepBreaks': true})
;

const
  MAIN_LESS_PATH  = './less/main.less',
  PUBLIC_CSS_PATH = './public/css/main.min.css',
  FONTS_CDN_URL   = '//netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts'
;


function render (doMinify, callback) {
  callback    = arguments[arguments.length - 1];
  const options = {
    globalVars: {'font-path': `"${FONTS_CDN_URL}"`},
    filename  : MAIN_LESS_PATH,
    plugins   : []
  };

  options
    .plugins
    .push(
      doMinify === true ? cleanCSSPlugin : keepBreaksCSSPlugin
    );

  fs.readFile(MAIN_LESS_PATH, 'utf-8', function(err, mainLessFile) {
    if (err) return callback(err);
    less.render(
      mainLessFile,
      options,
      function(err, output) {
        if (err) return callback(err);
        fs.writeFile(
          PUBLIC_CSS_PATH,
          output.css,
          function(err) {
            if (err) return callback(err);
            console.info('Fichier less/main.less compilé et minifié  dans public/css/main.min.css');
            return callback();
          });
      });
  });
}

