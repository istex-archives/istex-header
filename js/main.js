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
      document.getElementById("header_services").addEventListener("click",function(){
        displayServices();
      });
      loadServices();
    }
    else
      document.body.innerHTML = loadError("header",code)+document.body.innerHTML;
  });
}

//Permet d'afficher ou non le menu des services
function displayServices(){
  var popin= document.getElementById("header_block_services");
  if(popin.style.display=="block")
    popin.style.display="none";
  else
    popin.style.display="block";
}

//Permet de charger les services à intégrer
function loadServices(){
 nanoajax.ajax({
  url:"https://istex-services.data.istex.fr/api/run/all-documents?maxSize=20",
  method: 'GET',
  headers: {'Content-Type':'application/json'}
}, function (code, responseText) {
  if(code==200)
    integrateServices(responseText);
  else
    document.getElementById("popin_services").innerHTML=loadError("popin_services",code);
});
}

//permet d'intégrer les services au menu
function integrateServices(json){
  try{
    var services=JSON.parse(json);
    var html="<ul>";
    for (var i = 0; i < services.total; i++) {
      html+="<li><a href='"+services.data[i].QoTd+"'><div><img src='"+services.data[i].Cl2W+"'/><p>"+services.data[i].z351+"</p></div></a></li>";
    }
    html+="</ul>";
    document.getElementById("popin_services").innerHTML=html;
  }catch(error){
    document.getElementById("popin_services").innerHTML="Intégration des services au menu impossible : "+error;
  }
}

//permet de gérer les erreurs de chargement
function loadError(objet,code){
  var debErr="Le chargement de '"+objet+"' a échoué : ";
  switch(code){
    case 400:
      return(debErr+"contenu de la requête invalide : error 400");
    break;
    case 403:
      return(debErr+"ressources interdites d'accès : error 403");
    break;
    case 401:
      return(debErr+"accès aux ressources refusé : error 401");
    break;
    case 404:
      return(debErr+"ressources non trouvées : error 404");
    break;
    case 500:
      return(debErr+"erreur serveur interne : error 500");
    break;
    case 503:
      return(debErr+"serveur indisponible : error 503");
    break;
    default:
      return(debErr+"error : "+code);
    break;
  }
}

//On lance les fonctions.
load()