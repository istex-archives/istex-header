

# use the ngnix server to serve the built stuff
FROM nginx:1.13.12

# to help docker debugging
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -y update && apt-get -y install vim curl gnupg2 git jq

# nodejs instalation used for startup scripts
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y build-essential nodejs

WORKDIR /app/
COPY ./package.json /app/
RUN npm install
COPY . /app
RUN npm run webpack

COPY nginx.conf /etc/nginx/nginx.conf

RUN echo '{ \
  "httpPort": 80, \
  "configPath": "/etc/nginx/nginx.conf", \
  "configType": "text", \
  "dataPath":   "/app/public" \
}' > /etc/ezmaster.json