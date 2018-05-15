import nanoajax from "nanoajax";
import "./header.css";
import htmlHeader from "./header.html";

var ressourceUrl = document
  .getElementById("iwh_script")
  .src.split("bundle.js")[0];

function loadHeader() {
  document.body.innerHTML = htmlHeader + document.body.innerHTML;
  rebaseImgUrl();
  document.addEventListener("click", function(e) {
    if (
      clickOutsideNode(e.target, "iwh_header_block_services") &&
      clickOutsideNode(e.target, "iwh_header_services")
    ) {
      closeNode("iwh_header_block_services");
    }
    if (
      clickOutsideNode(e.target, "iwh_popin_menu") &&
      clickOutsideNode(e.target, "iwh_header_menu")
    ) {
      closeNode("iwh_popin_menu");
    }
  });
  document
    .getElementById("iwh_header_services")
    .addEventListener("click", function() {
      displayNode("iwh_header_block_services");
    });
  document
    .getElementById("iwh_header_menu")
    .addEventListener("click", function() {
      displayNode("iwh_popin_menu");
    });
  loadServices();
}

//Permet de savoir si on clique sur un element du node choisit
function clickOutsideNode(elem, node) {
  var node = document.getElementById(node);
  if (elem == node || node.contains(elem)) return false;
  else return true;
}

//Permet de mettre à jour le lien des images
function rebaseImgUrl() {
  var images = document.querySelectorAll("#istex_web_header img");
  for (var i = 0; i < images.length; i++) {
    images[i].src = ressourceUrl + "img/" + images[i].dataset.filename + ".svg";
  }
}

//Permet d'afficher ou non le node
function displayNode(node) {
  var popin = document.getElementById(node);
  if (popin.className == "on") popin.className = "off";
  else popin.className = "on";
}

//Permet de fermer directement le node
function closeNode(node) {
  document.getElementById(node).className = "off";
}

//Permet de charger les services à intégrer
function loadServices() {
  nanoajax.ajax(
    {
      url:
        "https://istex-services.data.istex.fr/api/run/all-documents?maxSize=20",
      method: "GET",
      headers: { "Content-Type": "application/json" }
    },
    function(code, responseText) {
      if (code == 200) integrateServices(responseText);
      else
        document.getElementById("iwh_popin_services").innerHTML = loadError(
          "iwh_popin_services",
          code
        );
    }
  );
}

//permet d'intégrer les services au menu
function integrateServices(json) {
  try {
    var services = JSON.parse(json);
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
