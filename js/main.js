//Permets de charger le header et tous ses fichiers nécessaires.
function load(){
  loadCSS();
  loadNanoAjax();
}

function loadCSS(){
  //Chargement css.
  var css=document.createElement("link");
  css.rel="stylesheet";
  css.href="css/main.css";
  document.head.appendChild(css);
}

function loadNanoAjax(){
  //Chargement nanoAjax.
  var script = document.createElement("script");
  script.src = "node_modules/nanoajax/nanoajax.min.js";
  script.onload = function() {
    //chargement du header après l'installation de nanoAjax.
    loadHeader();
  };
  document.head.appendChild(script);
}

//Utilisé après le chargement de nanoAjax.
function loadHeader(){
  nanoajax.ajax({url:"views/header.html"}, function (code, responseText) {
    if(code==200){
      document.body.innerHTML = responseText+document.body.innerHTML;
      document.getElementById("header_app").addEventListener("click",function(){
        displayApp();
      });
    }
    else
      alert("Erreur chargement header : error "+code);
  });
}

function displayApp(){
  var frame= document.getElementById("header_frame");
  if(frame.style.display=="block")
    frame.style.display="none";
  else
    frame.style.display="block";
}

//On lance les fonctions.
load()