[![Build Status](https://travis-ci.org/istex/istex-web-header.svg?branch=master)](https://travis-ci.org/istex/istex-web-header)
# istex-web-header

Le header web affiché sur tous les sites de la Galaxy Istex

## Installation dans un sous-site

Intégrer simplement la balise présentée ci-dessous à la fin du body de votre page html :
```html
<script id="iwh_script" src="//web-header.delivery.istex.fr/bundle.js" ></script>
```
Vous pouvez choisir d'enlever le menu personnalisé existant ou d'enlever le logo en y intégrant respectivement l'attribut `data-menu="hide"` et `data-logo="hide"`.

Exemple d'utilisation (header sans menu personnalisé et sans logo) :
```html
<script id="iwh_script" data-menu="hide" data-logo="hide" src="//web-header.delivery.istex.fr/bundle.js" ></script>
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

    Docker
    Docker Compose
    Pour le développement : Git et Make

Pour installer et lancer en mode développement/debug :
```
make install
make build
make run-debug
```
Ouvrez alors votre navigateur sur http://localhost:8080 pour visualiser votre istex-web-header local.

Pour installer et lancer en mode production :
```
make install
make build
make run-prod
```

Pour connaître les autres commandes disponibles :
```
make help
```
