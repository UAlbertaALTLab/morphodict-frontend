# referencing: https://www.pluralsight.com/guides/using-react.js-with-docker

# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

# add app
COPY . ./
COPY docker/app.sh /app

# start apps
CMD ["/app/app.sh"]
