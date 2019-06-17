# Express - Handlebars - Bulma - MongoDB

## Features
- Docker
- Mongoose
- Express
- Express Bodyparser
- Flash
- Bulma
- Babel
- SCSS

## Requirements
- [Docker](https://www.docker.com/products/docker-desktop)
- [MongoDB](https://www.mongodb.com/download-center/community)

## First time setup
- `git clone` this repo
- `cd` into the *server* folder
- Go into *Docker settings > Shared Drives* and share the drive the directory is on
- `docker build -t "server" .`

## Running server
- Windows: `docker run -p 80:8080 -it --name server -v "%cd%\app":/var/www/app server`
- Mac (untested): `docker run -p 80:8080 -it --name server -v "pwd/app":/var/www/app server` 
- `Ctrl-C` to detach
- `docker container attach server` to reattach
- type `rs` while attached to manually restart

## Running client side compilers
Only needed if you want to edit the files in the `src` directory
- Make sure [Node](https://nodejs.org/en/) is installed
- `cd` into the *src* folder
- `npm run watch`
- Note: SCSS will not compile on startup, only after the first detected change
- Note: Changes to es6 files will not result in any console output, but the files will still be compiled