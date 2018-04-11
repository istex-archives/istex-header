//Permets de charger le header et tous ses fichiers nécessaires.
function charger(){
  chargerCSS();
  chargerHeader();
}

function chargerCSS(){
  //Chargement css.
  var css=document.createElement("link");
  css.rel="stylesheet";
  css.href="public/css/main.css";
  document.head.appendChild(css);
}

function chargerNanoAjax(){
  //Chargement nanoAjax.
  var script = document.createElement("script");
  script.src = "public/js/nanoajax.min.js";
  script.onload = function() {
    //chargement du header après l'installation de nanoAjax.
    chargerHeader();
  };
  document.head.appendChild(script);
}

//Utilisé après le chargement de nanoAjax.
function chargerHeader(){
  nanoajax.ajax({url:"public/views/header.html"}, function (code, responseText) {
    if(code==200){
      document.body.innerHTML = responseText+document.body.innerHTML;
      document.getElementById("header_app").addEventListener("click",function(){
        affichageApp();
      });
    }
    else
      alert("Erreur chargement header : error "+code);
  });
}

function affichageApp(){
  var frame= document.getElementById("header_frame");
  if(frame.style.display=="block")
    frame.style.display="none";
  else
    frame.style.display="block";
}

//On lance les fonctions.
charger()