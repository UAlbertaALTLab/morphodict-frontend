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
#COPY docker/app.sh /app

# uWSGI will bind HTTP to this port:
EXPOSE 3000
# uWSGI stats are accessible on this port
# I view them with this command:
#
#    $ nc 127.0.0.1 9191 | jq
#
EXPOSE 4141

# start apps
CMD ["/app/app.sh"]
