var script = document.getElementById("iwh_script");
var ressourceUrl = script.src.split("bundle.js")[0];
var menuName = script.dataset.menu;

import nanoajax from "nanoajax";
import "./header.css";
import htmlHeader from "./header.html";
import readme from "../README.md";

// Permet de charger le header istex
function loadHeader() {
  document.body.innerHTML = htmlHeader + document.body.innerHTML;
  stateIstex();
  setInterval(stateIstex, 60000);
  if (script.dataset.logo == "hide") {
    var iclogo = document.getElementById("iwh_header_logo");
    iclogo.parentNode.removeChild(iclogo);
  }
  var images = document.querySelectorAll("#iwh_header_ul img");
  for (var i = 0; i < images.length; i++) {
    images[i].src = ressourceUrl + "img/" + images[i].dataset.filename + ".svg";
  }
  document.addEventListener("click", function(e) {
    var services = document.getElementById("iwh_header_block_services");
    var icservices = document.getElementById("iwh_header_services");
    if (
      !(
        e.target == services ||
        services.contains(e.target) ||
        e.target == icservices ||
        icservices.contains(e.target)
      )
    ) {
      document.getElementById("iwh_header_block_services").className = "off";
    }
    var icmenu = document.getElementById("iwh_header_menu");
    var menu = document.getElementById("iwh_popin_menu");
    if (
      !(
        icmenu == null ||
        e.target == menu ||
        menu.contains(e.target) ||
        e.target == icmenu ||
        icmenu.contains(e.target)
      )
    ) {
      document.getElementById("iwh_popin_menu").className = "off";
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
      var popin = document.getElementById("iwh_popin_menu");
      if (popin.className == "on") popin.className = "off";
      else popin.className = "on";
    });
  loadServices();
  loadMenu();
  addReadme();
}

// Permet de charger les services
function loadServices() {
  nanoajax.ajax(
    {
      url:
        "https://istex-services.data.istex.fr/api/run/all-documents?maxSize=20",
      method: "GET",
      headers: { "Content-Type": "application/json" }
    },
    function(code, responseText) {
      if (code == 200) {
        try {
          var services = JSON.parse(responseText);
          var html = "<ul id='iwh_popin_services_ul'>";
          for (var i = 0; i < services.total; i++) {
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
          }
          html += "</ul>";
          document.getElementById("iwh_popin_services").innerHTML = html;
        } catch (error) {
          document.getElementById("iwh_popin_services").innerHTML =
            "Intégration des services au menu impossible : " + error;
        }
      } else
        document.getElementById("iwh_popin_services").innerHTML = loadError(
          "iwh_popin_services",
          code
        );
    }
  );
}

// Permet de charger le menu
function loadMenu() {
  if (menuName == "" || menuName == undefined) {
    var icmenu = document.getElementById("iwh_header_menu");
    icmenu.parentNode.removeChild(icmenu);
  }
  try {
    var menu = require("./menu/" + menuName + ".json");
    var html = "<ul id='iwh_popin_menu_ul'>";
    for (var i = 0; i < menu.menu.length; i++) {
      html +=
        '<li class="iwh_popin_menu_li"><a class="iwh_popin_menu_a" href="' +
        menu.menu[i].link +
        '">';

      if (menu.menu[i].icon != "")
        html +=
          '<img src="' +
          ressourceUrl +
          "img/menu/" +
          menuName +
          "/" +
          menu.menu[i].icon +
          '.svg"/>';

      html += menu.menu[i].title + " &#8250</a></li>";
    }
    html += "</ul>";
    document.getElementById("iwh_popin_menu").innerHTML = html;
  } catch (error) {
    document.getElementById("iwh_popin_menu").innerHTML =
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

// Permet de gérer les erreurs de chargement
function loadError(objet, code) {
  var debErr = "Le chargement de '" + objet + "' a échoué : ";
  switch (code) {
    case 400:
      return debErr + "contenu de la requête invalide : error 400";
      break;
    case 403:
      return debErr + "ressources interdites d'accès : error 403";
      break;
    case 401:
      return debErr + "accès aux ressources refusé : error 401";
      break;
    case 404:
      return debErr + "ressources non trouvées : error 404";
      break;
    case 500:
      return debErr + "erreur serveur interne : error 500";
      break;
    case 503:
      return debErr + "serveur indisponible : error 503";
      break;
    default:
      return debErr + "error : " + code;
      break;
  }
}

function addReadme() {
  var iwh_readme = document.getElementById("iwh_readme");
  if (iwh_readme != null) iwh_readme.innerHTML = readme;
}

// On lance le chargement du header
if (window.addEventListener) {
  // W3C standard
  window.addEventListener("load", loadHeader(), false); // NB **not** 'onload'
} else if (window.attachEvent) {
  // Microsoft
  window.attachEvent("onload", loadHeader());
}
