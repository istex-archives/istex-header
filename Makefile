SHELL:=/bin/bash

npm-install:
	@ npm install

install: ./package.json npm-install