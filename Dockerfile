# build the vuejs app
FROM node:8.9.0 as build-deps
WORKDIR /app/
COPY ./package.json /app/
RUN npm install
COPY . /app
RUN mkdir -p /app/build
RUN npm run webpack

# -------------------

# use the ngnix server to serve the built stuff
FROM nginx:1.13.3

# to help docker debugging
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -y update && apt-get -y install vim curl apache2-utils

COPY --from=build-deps /app/build /app/public

COPY ./nginx.prod.conf /etc/nginx/nginx.conf.orig

COPY entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 35268