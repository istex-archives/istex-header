(function() {
  'use strict';

  var
    less = require('less'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    fs = require('fs-extra'),
    path = require('path'),
    async = require('async'),
    cleanCSSPlugin = new LessPluginCleanCSS({advanced: true, 'clean-css': '-s0'}),
    source = '@import "./less/main.less";'
    ;

  const NPM_FONTS_PATH = './node_modules/font-awesome/fonts',
    PUBLIC_FONTS_PATH = './public/fonts',
    PUBLIC_CSS_PATH = './public/css/main.min.css'
    ;

  less.render(
    source,
    {plugins: [cleanCSSPlugin]},
    (err, output) => {
    if (err) throw err;
    fs.writeFile(
      PUBLIC_CSS_PATH,
      output.css,
      (err) => {
      if (err) throw err;
      console.info('Fichier less/main.less compilé et minifié  dans public/css/main.min.css');
      fs.readdir(NPM_FONTS_PATH, (err, files) => {
        if(err) throw err;
        async.each(files,
          (file, next) => fs.copy(path.join(NPM_FONTS_PATH, file),
            path.join(PUBLIC_FONTS_PATH, file),
            next),
          (err) => {
          if (err) throw err;
          console.info('Fichiers de fonts copiés dans ' + PUBLIC_FONTS_PATH);
        }
        );
      });


    });
  });
}());

