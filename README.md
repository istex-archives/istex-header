# istex-web-header

Le header web affiché sur tous les sites de  la Galaxy Istex

## Installation dans un sous-site

### En utilisant le serveur web-header.delivery.istex.fr

Intégrer simplement la balise présentée ci-dessous à la fin du body de votre page html :

```
<script id="iwh_script" src="https://web-header.delivery.istex.fr/public/js/bundle.js" ></script>
```

### En utilisant votre serveur

Déposer les fichiers nécessaires dans votre serveur :

```
- npm install
- npm run webpack
- copier/coller le fichier 'public' dans votre serveur à l'endroit voulu
```

Il ne vous restera plus qu'à intégrer la balise suivante à la fin du body de votre page html :

```
<script id="iwh_script" src="[chemin d'accès]/public/js/bundle.js" ></script>
```
