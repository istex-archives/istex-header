'use strict';

process.on('unhandledRejection', function(err) {console.log(err);});

var
  fs         = require('fs-extra'),
  path       = require('path'),
  async      = require('async'),
  lessRender = require('../scripts/lessRender').render
;
var
  NPM_FONTS_PATH    = './node_modules/font-awesome/fonts',
  PUBLIC_FONTS_PATH = './public/fonts'
;

lessRender(true, function(err){
  if(err) throw err;
  fs.readdir(NPM_FONTS_PATH, function(err, files) {
    if (err) throw err;
    async.each(files,
               function(file, next) {
                 fs.copy(path.join(NPM_FONTS_PATH, file),
                         path.join(PUBLIC_FONTS_PATH, file),
                         next);
               },
               function(err) {
                 if (err) throw err;
                 console.info('Fichiers de fonts copiés dans ' + PUBLIC_FONTS_PATH);
               }
    );
  });
});

