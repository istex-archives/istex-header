# istex-web-header

Le header web affiché sur tous les sites de  la Galaxy Istex

## Installation dans un sous-site

### En utilisant le serveur web-header.delivery.istex.fr

Intégrer simplement la balise présentée ci-dessous à la fin du body de votre page html :

```
<script id="iwh_script" src="//web-header.delivery.istex.fr/public/bundle.js" ></script>
```

### Développeur

Prérequis: nodejs

Pour installer les dépendances nécessaires :
```
- npm install
```

Pour modifier en temps réel le header:
```
- npm run watch
  Le résultat est visible sur localhost:8080
```

Pour build le projet:
```
- npm run build
  Les fichiers buildés se trouvent dans le dossier public.
```

