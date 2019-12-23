# build the vuejs app
FROM node:12 as build-deps
WORKDIR /app/
COPY ./package.json /app/
RUN npm install
COPY . /app
RUN npm run webpack

# use the ngnix server to serve the built stuff
FROM nginx:1.13.12

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-deps /app/public /app/public

RUN echo '{ \
  "httpPort": 80, \
  "configPath": "/etc/nginx/nginx.conf", \
  "configType": "text", \
  "dataPath":   "/app/public" \
}' > /etc/ezmaster.json
