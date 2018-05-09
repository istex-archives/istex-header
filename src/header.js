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
    if (clickOutsidePopin(e.target)) {
      var popin = document.getElementById("iwh_header_block_services");
      if (popin.className == "on") popin.className = "off";
    }
  });
  document
    .getElementById("iwh_header_services")
    .addEventListener("click", function() {
      displayServices();
    });
  loadServices();
}

//Permet de savoir si on clique sur un element de la popin ou non
function clickOutsidePopin(elem) {
  var icone = document.querySelector("#iwh_header_services");
  var popin = document.querySelector("#iwh_header_block_services");
  if(elem == icone || elem == popin || icone.contains(elem) || popin.contains(elem))
  return false;
  else
  return true;
}

//Permet de mettre à jour le lien des images
function rebaseImgUrl() {
  var images = document.querySelectorAll("#istex_web_header img");
  images.forEach(function(image) {
    image.src = ressourceUrl + "img/" + image.dataset.filename + ".svg";
  });
}

//Permet d'afficher ou non le menu des services
function displayServices() {
  var popin = document.getElementById("iwh_header_block_services");
  if (popin.className == "on") popin.className = "off";
  else popin.className = "on";
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
        "<li class='iwh_popin_services'><a href='" +
        services.data[i].QoTd +
        "' class='iwh_services_lien'><div class='iwh_services_lien_block'><div class='iwh_services_lien_block_img'><img src='" +
        services.data[i].Cl2W +
        "'/></div><p>" +
        services.data[i].z351 +
        "</p></div></a><span class='ihw_services_text_hover'>" +
        services.data[i].BNzf +
        "</span></li>";
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

//On lance les fonctions.
window.onload = loadHeader();
