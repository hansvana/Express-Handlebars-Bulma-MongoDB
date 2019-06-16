# Express - Handlebars - Bulma - MongoDB

## Features
- Mongoose
- Express
- Express Bodyparser
- Flash
- Bulma
- Babel
- SCSS

## Requirements
- [Node](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/download-center/community)

## First time setup
- Install pm2 globally: `npm install pm2@latest -g`
- `git clone` this repo
- `cd` into folder

## Server side
- `cd server`
- `npm install` to install all dependencies
- `pm2 start server/index.js --name "server" --watch` to run the server, it will automatically restart when you change any file
- `pm2 monit` to monitor the server
- `pm2 stop server` to stop the server

## Client side CSS and JS
- `cd src`
- `npm run watch`
- Note: SCSS will not compile on startup, make a change to the scss file to trigger compilation