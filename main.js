(function () {
  "use strict";

  if (window.jQuery) {
    init(jQuery);
  } else {
    document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"><\/script>');
    setTimeout(function () {
      init(jQuery);
    }, 618);
  }

  function init ($) {
    var contentDeliveryUrl = "http://content-delivery.istex.fr/web-header/"
      ;



    $.ajax({
      url: contentDeliveryUrl + "public/css/main.min.css",
      success: function (data) {

        $("head").append("<style>" + data + "</style>");

        $.ajax({
          url: contentDeliveryUrl + "include/surenteteistex.html",
          converters: {"text html": function (data) {
              return data.replace(/(href|src)="(?!http)(.*?)"/img, "$1=\"" + contentDeliveryUrl + "include/$2\"");
            }},
          success: function (data) {

            $(jQuery.parseHTML(data))
              .filter("#surentete")
              .prependTo($("body"))
              .filter("#surentete").wrap("<div id='istex-web-header' class='sandbox'></div>")
              .find("[href*=XX]").click(preventDefaultEvent).end()
              .find("[href*='" + window.location.hostname + "']").parent("li").remove().end().end()
              ;

            window.location.hostname === "www.istex.fr" && $("#surentete .logoistex").remove();
          }

        });
      }
    });


    function preventDefaultEvent (e) {
      e.preventDefault();
    }

  }

}());