var script = document.getElementById("iwh_script");
var ressourceUrl = script.src.split("bundle.js")[0];
var url = document.location.href;
var tweets = "";
var initweet = true;
import nanoajax from "nanoajax";
import "./header.css";
import htmlHeader from "./header.html";
import readme from "../README.md";

// Permet de charger le header istex
function loadHeader() {
  var header=document.createElement('header');
  header.id="istex_web_header";
  header.innerHTML=htmlHeader;
  document.body.insertBefore(header, document.body.childNodes[0]);
  stateIstex();
  setInterval(stateIstex, 60000);
  addTwitterScript();
  if (url == "https://www.istex.fr/") {
    var iclogo = document.getElementById("iwh_header_logo");
    iclogo.parentNode.removeChild(iclogo);
  }
  var images = document.querySelectorAll("#iwh_header_ul img");
  for (var i = 0; i < images.length; i++) {
    if (images[i].dataset.filename != undefined)
      images[i].src =
        ressourceUrl + "img/" + images[i].dataset.filename + ".svg";
  }
  document.addEventListener("click", function(e) {
    var blockServices = document.getElementById("iwh_header_block_services");
    var icservices = document.getElementById("iwh_header_services");
    if (
      !(
        e.target == blockServices ||
        blockServices.contains(e.target) ||
        e.target == icservices ||
        icservices.contains(e.target)
      )
    ) {
      document.getElementById("iwh_header_block_services").className = "off";
    }
    var icmenu = document.getElementById("iwh_header_menu");
    var blockMenu = document.getElementById("iwh_header_popin_menu");
    if (
      !(
        icmenu == null ||
        e.target == blockMenu ||
        blockMenu.contains(e.target) ||
        e.target == icmenu ||
        icmenu.contains(e.target)
      )
    ) {
      document.getElementById("iwh_header_popin_menu").className = "off";
    }
  });
  document
    .getElementById("iwh_header_services")
    .addEventListener("click", function() {
      var popin = document.getElementById("iwh_header_block_services");
      if (popin.className == "on") popin.className = "off";
      else popin.className = "on";
    });

  loadServices();
  addReadme();
}

function addTwitterScript() {
  var s = document.createElement("script");
  s.setAttribute("src", "https://platform.twitter.com/widgets.js");
  s.onload = function() {
    twttr.ready(function(twttr) {
      loadTweet();
      setInterval(loadTweet, 60000);
    });
  };
  document.head.appendChild(s);
}

function loadTweet() {
  if (
    document.getElementById("iwh_header_block_tweets").className == "off" ||
    document.getElementById("iwh_tweets").innerHTML == ""
  ) {
    document.getElementById("iwh_tweets").innerHTML = "";
    twttr.widgets
      .createTimeline(
        {
          sourceType: "profile",
          screenName: "ISTEX_Platform"
        },
        document.getElementById("iwh_tweets"),
        {
          chrome: "nofooter noborders transparent noheader",
          theme: "dark",
          linkColor: "#c4d733",
          tweetLimit: "6"
        }
      )
      .then(function(el) {
        newTweet();
        if (initweet) {
          initweet = false;
          document
            .getElementById("iwh_header_notif")
            .addEventListener("click", function() {
              var popin = document.getElementById("iwh_header_block_tweets");
              if (popin.className == "on") {
                popin.className = "off";
              } else {
                popin.className = "on";
                if (tweets != "") {
                  var now = new Date();
                  var time = now.getTime();
                  time += 2592000 * 1000;
                  now.setTime(time);
                  document.cookie =
                    "iwh_tweets=" +
                    tweets +
                    ";expires=" +
                    now.toUTCString() +
                    ";domain=.istex.fr;path=/";
                }
                document.getElementById("iwh_header_notif_img").src =
                  ressourceUrl + "img/ic_notifications.svg";
              }
            });
          document.addEventListener("click", function(e) {
            var icnotif = document.getElementById("iwh_header_notif");
            var blockTweet = document.getElementById("iwh_header_block_tweets");
            if (
              !(
                e.target == blockTweet ||
                blockTweet.contains(e.target) ||
                e.target == icnotif ||
                icnotif.contains(e.target)
              )
            ) {
              document.getElementById("iwh_header_block_tweets").className =
                "off";
            }
          });
        }
      });
  }
}

function newTweet() {
  var iframeDocument =
    document.querySelector("#iwh_tweets > iframe").contentDocument ||
    document.querySelector("#iwh_tweets > iframe").contentWindow.document;
  if (iframeDocument) {
    tweets = iframeDocument
      .getElementsByClassName("timeline-Tweet-text")[0]
      .innerHTML.replace(/;/g, "");
    if (
      document.cookie.indexOf("iwh_tweets=" + tweets) == -1 &&
      document.getElementById("iwh_header_block_tweets").className == "off"
    )
      document.getElementById("iwh_header_notif_img").src =
        ressourceUrl + "img/ic_notifications_new.svg";
    else
      document.getElementById("iwh_header_notif_img").src =
        ressourceUrl + "img/ic_notifications.svg";
  }
}

// Permet de charger les services
function loadServices() {
  nanoajax.ajax(
    {
      url: ressourceUrl + "/config.json"
    },
    function(code, responseText) {
      if (code == 200) {
        try {
          var config = JSON.parse(responseText);
          var html = "<ul id='iwh_popin_services_ul'>";
          for (var i = 0; i < config.total; i++) {
            if (
              url.indexOf(
                config.data[i].QoTd.replace("https://", "").replace(
                  "http://",
                  ""
                )
              ) != -1
            ) {
              loadMenu(config.data[i].menu);
            } else if (!config.data[i].hidden) {
              html +=
                "<li class='iwh_popin_services'><a title=\"" +
                config.data[i].BNzf +
                "\" href='" +
                config.data[i].QoTd +
                "' class='iwh_services_link'><div class='iwh_services_link_block'><div class='iwh_services_link_block_img'><img src='" +
                config.data[i].Cl2W +
                "' alt='" +
                config.data[i].z351 +
                "'/></div><p>" +
                config.data[i].z351 +
                "</p></div></a></li>";
            }
          }
          html += "</ul>";
          document.getElementById("iwh_popin_services").innerHTML = html;
        } catch (error) {
          document.getElementById("iwh_popin_services").innerHTML =
            "Intégration des services au menu impossible : " + error;
        }
      } else {
        document.getElementById("iwh_popin_services").innerHTML =
          "Intégration des services au menu impossible : error" + code;
      }
    }
  );
}

// Permet de charger le menu
function loadMenu(menu) {
  if (menu.length != 0 && document.getElementById("iwh_header_menu") == null) {
    try {
      var limenu = document.createElement("li");
      limenu.innerHTML =
        '<img title="menu du site" src="' +
        ressourceUrl +
        'img/ic_menu.svg" data-filename="ic_menu" alt="menu"/>';
      limenu.id = "iwh_header_menu";
      limenu.addEventListener("click", function() {
        var popin = document.getElementById("iwh_header_popin_menu");
        if (popin.className == "on") popin.className = "off";
        else popin.className = "on";
      });
      var ulheader = document.getElementById("iwh_header_ul");
      ulheader.insertBefore(limenu, ulheader.childNodes[0]);
      var html = "<ul id='iwh_header_popin_menu_ul'>";
      for (var i = 0; i < menu.length; i++) {
        html +=
          '<li class="iwh_header_popin_menu_li"><a class="iwh_header_popin_menu_a" href="' +
          menu[i].link +
          '">';

        if (menu[i].icon != "") html += '<img src="' + menu[i].icon + '"/>';

        html += menu[i].title + " &#8250</a></li>";
      }
      html += "</ul>";
      document.getElementById("iwh_header_popin_menu").innerHTML = html;
    } catch (error) {
      document.getElementById("iwh_header_popin_menu").innerHTML =
        "<p >Menu non trouvé : " + error + "</p>";
    }
  }
}

// Permet de charger le statut de la plateforme istex
function stateIstex() {
  nanoajax.ajax(
    {
      url:
        "https://api.uptimerobot.com/getMonitors?format=json&apiKey=m776418461-ff1f20a5aa934776fbafc596"
    },
    function(code, responseText) {
      if (code == 200) {
        try {
          var json = JSON.parse(
            responseText.replace("jsonUptimeRobotApi(", "").replace(")", "")
          );
          if (json.stat == "ok")
            document.getElementById("iwh_header_status_a").innerHTML =
              '<img src="' +
              ressourceUrl +
              'img/ic_status_ok.svg" alt="statut" title="plateforme ISTEX en ligne"/>';
          else
            document.getElementById("iwh_header_status_a").innerHTML =
              '<img src="' +
              ressourceUrl +
              'img/ic_status_down.svg" alt="statut" title="plateforme ISTEX momentanément hors service"/> ';
        } catch (error) {
          document.getElementById("iwh_header_status_a").innerHTML =
            '<img src="' +
            ressourceUrl +
            'img/ic_status_unknow.svg" alt="statut" title="état de la plateforme ISTEX inconnu"/>';
        }
      } else
        document.getElementById("iwh_header_status_a").innerHTML =
          '<img src="' +
          ressourceUrl +
          'img/ic_status_unknow.svg" alt="statut" title="état de la plateforme ISTEX inconnu"/>';
    }
  );
}

function addReadme() {
  var iwh_readme = document.getElementById("iwh_readme");
  if (iwh_readme != null)
    iwh_readme.innerHTML = '<div id="iwh_readme_text">' + readme + "</div>";
}

// On lance le chargement du header
if (window.addEventListener) {
  // W3C standard
  window.addEventListener("load", loadHeader(), false); // NB **not** 'onload'
} else if (window.attachEvent) {
  // Microsoft
  window.attachEvent("onload", loadHeader());
}
