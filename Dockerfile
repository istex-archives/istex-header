# build the vuejs app
FROM node:alpine as build-deps
WORKDIR /app/
COPY ./package.json /app/
RUN npm install
COPY . /app
RUN npm run webpack

# use the ngnix server to serve the built stuff
FROM nginx

# to help docker debugging
ENV DEBIAN_FRONTEND noninteractive

COPY --from=build-deps /app/public /app/public
COPY --from=build-deps /app/index.html /app/index.html

COPY ./nginx.conf etc/nginx/conf.d/default.conf
