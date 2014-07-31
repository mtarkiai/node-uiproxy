# DOCKER-VERSION 0.10.0

FROM ubuntu

# make sure apt is up to date
RUN apt-get update

# install nodejs and npm
RUN apt-get install -y nodejs npm git git-core

# Bundle app source
COPY . /app
# Install app dependencies
RUN cd /app; npm install

WORKDIR /app/
EXPOSE  9000
CMD ["nodejs", "/app/server.js"]