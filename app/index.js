var express = require("express");
var api = require("./js/api");

var app = module.exports = express();

app.listen(8000, "127.0.0.1");

app.configure(function () {
    app.locals.pretty = true;
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'secret!'
    }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static (__dirname));
    app.set('views', __dirname);
    app.set('port', 8000);
    app.engine('html', require('ejs').renderFile);
});

app.get('/api/players', api.playerList);
app.get('/api/players/:id', api.playerDetail);
app.post('/api/players', api.playerAdd);
app.put('/api/players/:id', api.playerUpdate);
app. delete ('/api/players/:id', api.playerDelete);

app.get('/api/games', api.gameList);
app.get('/api/games/:id', api.gameDetail);
app.post('/api/games', api.gameAdd);
app.put('/api/games/:id', api.gameUpdate);
app. delete ('/api/games/:id', api.gameDelete);

app.get('/api/teams', api.teamList);
app.get('/api/teams/:id', api.teamDetail);
app.post('/api/teams', api.teamAdd);
app.put('/api/teams/:id', api.teamUpdate);
app. delete ('/api/teams/:id', api.teamDelete);

app.get('/api/positions', api.positionList);