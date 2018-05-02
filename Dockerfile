# build the vuejs app
FROM node:8.9.0 as build-deps
WORKDIR /app/
COPY ./package.json /app/
RUN npm install
COPY . /app
RUN npm run webpack

# use the ngnix server to serve the built stuff
FROM nginx:1.13.3

COPY --from=build-deps /app/public /app/public
COPY --from=build-deps /app/index.html /app/index.html

COPY ./nginx.conf etc/nginx/conf.d/default.conf
