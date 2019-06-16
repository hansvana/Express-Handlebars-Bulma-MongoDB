// EXPRESS
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

// Handlebars default config
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');

// favicon
const favicon = require('serve-favicon');

// dotenv
require('dotenv').config();

/**
 * 
 * Api
 * 
 * Main controller.
 * 
 */

class Api {

    constructor() {
        this.port = 80;
        this.init();
    }

    init() {

        this.app = express();

        // use sessions
        this.app.use(session({
            secret: 'Blinky',
            resave: false,
            saveUninitialized: true
        }));

        // use body-parser
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // serve the public folder and favicon
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

        // use handlebars as the default view engine
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'hbs');

        // register handlebars partials
        this.registerPartials('/views/partials');

        // use flash for messages
        this.app.use(flash());
        this.app.use((req, res, next) => {
            res.locals.errors = req.flash('error');
            res.locals.info = req.flash('info');
            console.log(res.locals.info);
            next();
        });

        // register routes
        const index = require('./routes/routes');
        this.app.use('/', index);

        this.app.listen(this.port, () => console.log(`Server listening on port ${this.port}!`));
    }

    // register Handlebars partials
    registerPartials(dir) {
        const partialsDir = __dirname + dir;

        const filenames = fs.readdirSync(partialsDir);

        filenames.forEach(function (filename) {
            const matches = /^([^.]+).hbs$/.exec(filename);
            if (!matches) {
                return;
            }
            const name = matches[1];
            const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
            hbs.registerPartial(name, template);
        });
    }
}

const api = new Api();