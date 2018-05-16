import nanoajax from "nanoajax";
import "./header.css";
import htmlHeader from "./header.html";

var ressourceUrl = document
  .getElementById("iwh_script")
  .src.split("bundle.js")[0];

function loadHeader() {
  document.body.innerHTML = htmlHeader + document.body.innerHTML;
  var images = document.querySelectorAll("#istex_web_header img");
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
}

//Permet de charger les services
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
              "' class='iwh_services_lien'><div class='iwh_services_lien_block'><div class='iwh_services_lien_block_img'><img src='" +
              services.data[i].Cl2W +
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

//permet de gérer les erreurs de chargement
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

//On lance le chargement du header
if (window.addEventListener) {
  // W3C standard
  window.addEventListener("load", loadHeader(), false); // NB **not** 'onload'
} else if (window.attachEvent) {
  // Microsoft
  window.attachEvent("onload", loadHeader());
}
