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
    var contentDeliveryUrl = "http://demo.istex.fr/web-header/"
      ;

    $.ajax({
      url: contentDeliveryUrl + "include/surenteteistex.html",
      converters: {"text html": function (data) {

          return data.replace(/(href|src)="(?!http)(.*?)"/img, "$1=\"" + contentDeliveryUrl + "include/$2\"");
        }},
      success: function (data, textStatus) {

        $(jQuery.parseHTML(data)).prependTo($("body"))
          .find("meta").remove().end()
          .find("title").remove().end()
          .find("[href*=XX]").click(preventDefaultEvent).end()
          .find("[href*='" + window.location.hostname + "']").parent("li").remove().end().end()
          ;
      }
    });

    $.ajax({
      url: contentDeliveryUrl + "css/main.css",
      success: function (data) {
        $("head").append("<style>" + data + "</style>");
      }
    });

    function preventDefaultEvent (e) {
      e.preventDefault();
    }

  }

}());