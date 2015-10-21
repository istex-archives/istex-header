SHELL:=/bin/bash

less-compilation: less-checking ./less/main.less
	@ ./node_modules/.bin/lessc ./less/main.less ./public/css/main.min.css --clean-css="-s0"
	@ echo "Fichier less/main.less compilé et minifié  dans public/css/main.min.css"

less-checking: ./node_modules/.bin/lessc ./node_modules/less-plugin-clean-css
	@ echo "Verification des modules nodes lessc et less-plugin-clean-css"

npm-install:
	@ npm install

install: ./package.json npm-install less-compilation