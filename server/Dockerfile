# https://hub.docker.com/_/node/
FROM node:10.16.0-alpine

# Create app directory
WORKDIR /var/www

# Install app dependencies
COPY package*.json ./
RUN npm install

# Expose port 8080
EXPOSE 8080

# Start the server
CMD [ "npm", "start" ]