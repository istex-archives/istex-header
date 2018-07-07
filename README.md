
# istex-header

[![Build Status](https://travis-ci.org/istex/istex-header.svg?branch=master)](https://travis-ci.org/istex/istex-header) [![Docker Pulls](https://img.shields.io/docker/pulls/istex/istex-header.svg)](https://registry.hub.docker.com/u/istex/istex-header/)

Le header web affiché sur tous les sites de la Galaxy Istex

## Installation dans un sous-site

Intégrer simplement la balise présentée ci-dessous à la fin du body de votre page html :
```html
<script id="iwh_script" src="//web-header.delivery.istex.fr/bundle.js" ></script>
```

Vous pouvez facilement modifier le comportement d'un service avec le header directement depuis le lodex dédié.

Exemple pour le service www (Accueil ISTEX) qui correspond au site www.istex.fr, qui ne s'affiche pas dans la popin des services (hidden) et qui possède un menu à gauche:
```json
{
    "_id": "5acca78fa736dcf0f0676868",
    "uri": "ark:/12345/DZ2-1XP09DLT-M",
    "z351": "www",
    "A2KZ": [
        "doc"
    ],
    "QoTd": "https://www.istex.fr/",
    "Cl2W": "https://www.istex.fr/wp-content/themes/istex/images/istex_logo.svg",
    "publicationDate": "2018-04-23T12:50:40.350Z",
    "BNzf": "Accueil ISTEX",
    "hidden": true,
    "menu": [{
      "title": "Home",
      "icon": "https://www.istex.fr/wp-content/themes/istex/images/ic_home_menu.svg",
      "link": "//www.istex.fr"
    },
    {
      "title": "Chercheur",
      "icon": "https://www.istex.fr/wp-content/themes/istex/images/ic_chercheur_menu.svg",
      "link": "//www.istex.fr/chercheur/"
    },
    {
      "title": "Responsable",
      "icon": "https://www.istex.fr/wp-content/themes/istex/images/ic_responsable_menu.svg",
      "link": "//www.istex.fr/responsable/"
    },
    {
      "title": "Curieux",
      "icon": "https://www.istex.fr/wp-content/themes/istex/images/ic_curieux_menu.svg",
      "link": "//www.istex.fr/curieux/"
    }] 
}
```

## Développeur

### Via NodeJs

Pour installer les dépendances nécessaires :
```
npm install
```

Pour lancer un serveur web visualisant votre index.html et qui recharge en temps réel les modifications réalisées dans src/ (js, css, html ...) tapez ceci :
```
npm run watch
```
Ouvrez alors votre navigateur sur http://localhost:8080 pour visualiser votre istex-web-header local.

Pour tester le build du projet comme en prod (qui se fait via le dockerfile) tapez :
```
npm run build
```
Le résultat du build sera présent dans le répertoire `public/`

### Via Docker

prérequis: 

* Docker
* Docker Compose
* Pour le développement : Git et Make

Pour installer et lancer en mode développement/debug :
```
make install
make run-debug
```
Ouvrez alors votre navigateur sur http://localhost:8080 pour visualiser votre istex-web-header local.

Pour installer et lancer en mode production :
```
make build
make run-prod
```
Remarque : cette application peut être déployée sur [ezmaster](https://github.com/Inist-CNRS/ezmaster)


Pour connaître les autres commandes disponibles :
```
make help
```
