# istex-web-header

Le header web affiché sur tous les sites de  la Galaxy Istex

## Installation dans un sous-site

### En utilisant le serveur web-header.delivery.istex.fr

Intégrer simplement la balise présentée ci-dessous à la fin du body de votre page html :
```html
<script id="iwh_script" src="//web-header.delivery.istex.fr/bundle.js" ></script>
```

### Développeur

Prérequis : nodejs

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
