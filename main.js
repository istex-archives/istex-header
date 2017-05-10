(function() {
  'use strict';

  if (window.jQuery) {
    init(window.jQuery);
  } else {
    loadJqueryAndInvokeInit();
  }

  function init ($) {
    var CONTENT_DELIVERY_URL = 'https://content-delivery.istex.fr/web-header',
      LOCAL_DELIVERY_URL = 'http://localhost:8080',
      ressourcesUrl = CONTENT_DELIVERY_URL
      ;

    // Mode de debug local
    if ((window.localStorage && window.localStorage.getItem('web_header_local'))
      || (window.location.search && window.location.search.match(/web_header_local(=true)?(&|$)/))
      || window.location.hostname.match(/localhost|127\.0\.0\.1/)
      ) {
      ressourcesUrl = window.location.hostname.match(/localhost|127\.0\.0\.1/)
        && window.location.origin
        || LOCAL_DELIVERY_URL
        ;
      console.info('Istex web-header: local mode set on ' + ressourcesUrl);
    }

    $.ajax({
      url: ressourcesUrl + '/public/css/main.min.css',
      success: function(data) {

        $('head').append('<style>' + data + '</style>');

        $.ajax({
          url: ressourcesUrl + '/views/header.view.html',
          success: function(_data) {
            var prependToTarget =
              window.location.hostname === 'article-type.lod.istex.fr' ? '.navbar.navbar-inverse.navbar-fixed-top' : 'body';

            var $webHeader =
              $(jQuery.parseHTML(_data))
              .filter('#istex-web-header')
              .find('img').each(rewriteImgUrl).end()
              .prependTo($(prependToTarget))
              .wrap('<div class="sandbox"></div>')
              .find('[href*="#"]').click(preventDefaultEvent).end()
              .find('[href*="' + window.location.hostname + '"]').addClass('disabled').click(
              preventDefaultEvent).end()
              ;

            window.location.hostname === 'www.istex.fr' && $webHeader.find('.logoistex').remove();
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
          }

        });
      }
    });

    function rewriteImgUrl () {
      $(this).attr('src', function(index, attr) {
        return attr.replace(/^(?!http)(?:\/?([^/#"]+))+$/i, ressourcesUrl + '/public/img/$1');
      });
    }

  }


  function loadJqueryAndInvokeInit () {
    var script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js';
    script.onload = function() {
      init(window.jQuery.noConflict());
      document.head.removeChild(script);
    };
    document.head.appendChild(script);

  }

  function preventDefaultEvent (e) {
    e.preventDefault();
  }

}());
