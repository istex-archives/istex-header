var script = document.getElementById("iwh_script");
var ressourceUrl = script.src.split("bundle.js")[0];
var url = document.location.href;
var tweets = "";
import nanoajax from "nanoajax";
import "./header.css";
import htmlHeader from "./header.html";
import readme from "../README.md";
import services from "./menu.json";

// Permet de charger le header istex
function loadHeader() {
  document.body.innerHTML = htmlHeader + document.body.innerHTML;
  stateIstex();
  setInterval(stateIstex, 60000);
  addTwitterScript();
  if (script.dataset.logo == "hide") {
    var iclogo = document.getElementById("iwh_header_logo");
    iclogo.parentNode.removeChild(iclogo);
  }
  var images = document.querySelectorAll("#iwh_header_ul img");
  for (var i = 0; i < images.length; i++) {
    images[i].src = ressourceUrl + "img/" + images[i].dataset.filename + ".svg";
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
      document.getElementById("iwh_header_block_tweets").className = "off";
      document.querySelector("#iwh_tweets > iframe").style.visibility =
        "hidden";
    }
  });
  document
    .getElementById("iwh_header_services")
    .addEventListener("click", function() {
      var popin = document.getElementById("iwh_header_block_services");
      if (popin.className == "on") popin.className = "off";
      else popin.className = "on";
    });
  document
    .getElementById("iwh_header_menu")
    .addEventListener("click", function() {
      var popin = document.getElementById("iwh_header_popin_menu");
      if (popin.className == "on") popin.className = "off";
      else popin.className = "on";
    });
  document
    .getElementById("iwh_header_notif")
    .addEventListener("click", function() {
      var popin = document.getElementById("iwh_header_block_tweets");
      if (popin.className == "on") {
        popin.className = "off";
        document.querySelector("#iwh_tweets > iframe").style.visibility =
          "hidden";
      } else {
        popin.className = "on";
        document.querySelector("#iwh_tweets > iframe").style.visibility =
          "visible";
        document.cookie = "iwh_tweets=" + tweets;
        document.getElementById("iwh_header_notif_img").src =
          ressourceUrl + "img/ic_notifications.svg";
      }
    });
  loadServices();
  addReadme();
}

function addTwitterScript() {
  var s = document.createElement("script");
  s.setAttribute("src", "https://platform.twitter.com/widgets.js");
  s.onload = function() {
    loadTweet();
    setInterval(loadTweet, 60000);
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
        document.querySelector("#iwh_tweets > iframe").style.visibility =
          "hidden";
        if (
          document.getElementById("iwh_header_block_tweets").className == "on"
        )
          document.querySelector("#iwh_tweets > iframe").style.visibility =
            "visible";
        newTweet();
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
      !document.cookie.includes("iwh_tweets=" + tweets) &&
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
  try {
    var menu = services.default.menu;
    var html = "<ul id='iwh_popin_services_ul'>";
    for (var i = 0; i < services.total; i++) {
      if (!url.includes(services.data[i].QoTd)) {
        html +=
          "<li class='iwh_popin_services'><a title=\"" +
          services.data[i].BNzf +
          "\" href='" +
          services.data[i].QoTd +
          "' class='iwh_services_link'><div class='iwh_services_link_block'><div class='iwh_services_link_block_img'><img src='" +
          services.data[i].Cl2W +
          "' alt='" +
          services.data[i].z351 +
          "'/></div><p>" +
          services.data[i].z351 +
          "</p></div></a></li>";
      } else if (services.data[i].menu.length != 0)
        menu = services.data[i].menu;
    }
    html += "</ul>";
    document.getElementById("iwh_popin_services").innerHTML = html;
    loadMenu(menu);
  } catch (error) {
    document.getElementById("iwh_popin_services").innerHTML =
      "Intégration des services au menu impossible : " + error;
  }
}

// Permet de charger le menu
function loadMenu(menu) {
  if (script.dataset.menu == "hide") {
    var icmenu = document.getElementById("iwh_header_menu");
    icmenu.parentNode.removeChild(icmenu);
  } else
    try {
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
              'img/ic_status_ok.svg" alt="statut"/>';
          else
            document.getElementById("iwh_header_status_a").innerHTML =
              '<img src="' +
              ressourceUrl +
              'img/ic_status_down.svg" alt="statut"/>';
        } catch (error) {
          document.getElementById("iwh_header_status_a").innerHTML =
            '<img src="' +
            ressourceUrl +
            'img/ic_status_unknow.svg" alt="statut"/>';
        }
      } else
        document.getElementById("iwh_header_status_a").innerHTML =
          '<img src="' +
          ressourceUrl +
          'img/ic_status_unknow.svg" alt="statut"/>';
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
