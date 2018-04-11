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
      loadApp();
    }
    else
      alert("Erreur chargement header : error "+code);
  });
}

//Permet d'afficher ou non les apps
function displayApp(){
  var frame= document.getElementById("header_block_app");
  if(frame.style.display=="block")
    frame.style.display="none";
  else
    frame.style.display="block";
}

function loadApp(){
   nanoajax.ajax({
        url:'https://istex-services.data.istex.fr/api/run/all-documents',
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }, function (code, responseText) {
    if(code==200){
      integrateApp(responseText);
    }
    else
      alert("Erreur chargement header : error "+code);
  });
}

function integrateApp(json){
  var app=JSON.parse(json);
  var html="<ul>";
  for (var i = 0; i < app.total-1; i++) {
    html+="<li><a href='"+app.data[i].QoTd+"'><div><img src='"+app.data[i].Cl2W+"'/><p>"+app.data[i].z351+"</p></div></a></li>";
  }
  html+="</ul>";
   document.getElementById("frame_app").innerHTML=html;
}

//On lance les fonctions.
load()