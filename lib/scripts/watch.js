(function() {
  'use strict';
  var
    chokidar   = require('chokidar'),
    lessRender = require('./lessRender.js').render,
    log        = console.log.bind(console),
    error      = console.error.bind(console)
  ;

  var watcher = chokidar
    .watch(['./less/**/*.less'])
    .on('ready', function() {
      callRender();
      log('Files watcher running');

      watcher
        .on('change', function(path) {
          log('change:', path);
          callRender();
        })
        .on('unlink', function(path) {
          log('unlink:', path);
          callRender();
        })
        .on('add', function(path) {
          log('add:', path);
          callRender();
        })
        .on('error', function(err) {
          error('error:', err);
        })
      ;
    })
  ;

  function callRender () {
    lessRender((err) => {
      if (err) {
        log('compile error:', err);
      }
    });
  }

})();


