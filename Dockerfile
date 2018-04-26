# build the vuejs app
FROM node:8.9.0 as build-deps
WORKDIR /app/
COPY ./package.json /app/
RUN npm install
COPY . /app
RUN npm run webpack

# use the ngnix server to serve the built stuff
FROM nginx:1.13.3

# to help docker debugging
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -y update && apt-get -y install vim curl apache2-utils

COPY ./nginx.conf /etc/nginx/nginx.conf.orig
