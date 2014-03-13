var mongoose = require('mongoose');
db_url = process.env.MONGOHQ_URL || "mongodb://app:qstat@troup.mongohq.com:10055/qstat"
mongoose.connect(db_url);
//mongoose.connect('mongodb://localhost/qstat');
var Schema = mongoose.Schema;

// SCHEMAS
var playerSchema = new Schema({
    '@context': {
        type: String, default: 'http://schema.org/Person'
    },
    name: String,
    image: String,
    number: String,
    description: String,
    positions: [],
});
var teamSchema = new Schema({
    '@context': {
        type: String, default: 'http://schema.org/Organization'
    },
    name: String,
    players: [],
    url: String,
    description: String,
});
var gameSchema = new Schema({
    '@context': {
        type: String, default: 'http://schema.org/SportsEvent'
    },
    name: String,
    game_id: String,
    teams:[ {
        name: String,
        team_id: String,
    }],
    location: {
        name: String,
        url: String,
    },
    date: String,
    time: String,
    statistics:[],
    inProgress: Boolean
});
var statisticSchema = new Schema({
    name: String,
    stat_id: String,
    player:[ {
        name: String,
        player_id: String
    }],
    position: [{
        name: String,
        position_id: String
    }],
    team:[ {
        name: String,
        team_id: String
    }],
    time: String,
    scorekeeper: [{
        name: String,
        scorekeeper_id: String
    }]
});
var positionSchema = new Schema({
    '@context': {
        type: String, default: 'http://schema.org/Person'
    },
    name: String,
    description: String
});

var playerModel = mongoose.model('Player', playerSchema);
var teamModel = mongoose.model('Team', teamSchema);
var gameModel = mongoose.model('Game', gameSchema);
var statisticModel = mongoose.model('Statistic', statisticSchema);
var positionModel = mongoose.model('Position', positionSchema);

// PLAYER EXPORTS
exports.playerList = function (req, res) {
    return playerModel.find(function (err, players) {
        if (! err) {
            res.json(players);
        } else {
            console.log(err);
        }
    });
}
exports.playerDetail = function (req, res) {
    return playerModel.findById(req.params.id, function (err, player) {
        if (! err) {
            res.json(player);
        } else {
            console.log(err);
        }
    });
}
exports.playerAdd = function (req, res) {
    var player = req.body;
    var raw = req.body.name
    var id = raw.replace(/\.,\/#!$%\^&\*;:{}=\-_`~()/g, "").replace(/\s/g, "-").toLowerCase();
    player = new playerModel({
        name: req.body.name,
        player_id: id,
        number: req.body.number,
        description: req.body.description,
        team:[req.body.team],
        positions: req.body.positions
    });
    player.save(function (err) {
        if (! err) {
            console.log("Player created");
            res.json(true);
        } else {
            console.log(err);
            res.json(false);
        }
    });
    return res.json(req.body);
}
exports.playerUpdate = function (req, res) {
    var id = req.body._id;
    var player_id = req.body.player_id;
    if (id) {
        playerModel.findById(id, function (err, player) {
            player.name = req.body.name,
            player.image = req.body.image,
            player.number = req.body.number,
            player.description = req.body.description,
            player.team = req.body.team,
            player.positions = req.body.positions,
            player.save(function (err) {
                if (! err) {
                    res.json(true);
                    console.log("Player updated");
                } else {
                    res.json(false);
                    console.log(err);
                }
            });
        });
    }
}
exports.playerDelete = function (req, res) {
    return playerModel.findById(req.params.id, function (err, player) {
        return player.remove(function (err) {
            if (! err) {
                console.log("Player removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
}

// TEAM EXPORTS
exports.teamList = function (req, res) {
    return teamModel.find(function (err, team) {
        if (! err) {
            res.json(team);
        } else {
            console.log(err);
        }
    });
}
exports.teamDetail = function (req, res) {
    return teamModel.findById(req.params.id, function (err, team) {
        if (! err) {
            res.json(team);
        } else {
            console.log(err);
        }
    });
}
exports.teamAdd = function (req, res) {
    var team = req.body;
    var raw = req.body.name
    var id = raw.replace(/\.,\/#!$%\^&\*;:{}=\-_`~()/g, "").replace(/\s/g, "-").toLowerCase();
    
    team = new teamModel({
        name: req.body.name,
        team_id: id,
        url: req.body.url,
        description: req.body.description,
        players: req.body.players
    });
    team.save(function (err) {
        if (! err) {
            console.log("Team created");
            res.json(true);
        } else {
            console.log(err);
            res.json(false);
        }
    });
    return res.json(req.body);
}
exports.teamUpdate = function (req, res) {
    var id = req.body._id;
    if (id) {
        teamModel.findById(id, function (err, team) {
            team.name = req.body.name,
            team.players = req.body.players,
            team.url = req.body.url,
            team.description = req.body.description,
            team.save(function (err) {
                if (! err) {
                    res.json(true);
                    console.log("Team updated");
                } else {
                    res.json(false);
                    console.log(err);
                }
            });
        });
    }
}
exports.teamDelete = function (req, res) {
    return teamModel.findById(req.params.id, function (err, team) {
        return team.remove(function (err) {
            if (! err) {
                console.log("Team removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
}

// GAME EXPORTS
exports.gameList = function (req, res) {
    return gameModel.find(function (err, game) {
        if (! err) {
            res.json(game);
        } else {
            console.log(err);
        }
    });
}
exports.gameDetail = function (req, res) {
    return gameModel.findById(req.params.id, function (err, game) {
        if (! err) {
            res.json(game);
        } else {
            console.log(err);
        }
    });
}
exports.gameAdd = function (req, res) {
    var game = req.body;
    var raw = req.body.team1.name + ' vs ' + req.body.team2.name
    var id = raw.replace(/\.,\/#!$%\^&\*;:{}=\-_`~()/g, "").replace(/\s/g, "-").toLowerCase();
    game = new gameModel({
        name: req.body.team1.name + ' vs ' + req.body.team2.name,
        game_id: id,
        teams:[req.body.team1, req.body.team2],
        location: {
            name: req.body.location.name,
            url: req.body.location.url
        },
        date: req.body.startTime,
        time: req.body.gameTime,
    });
    game.save(function (err) {
        if (! err) {
            console.log("Game created");
            res.json(true);
        } else {
            console.log(err);
            res.json(false);
        }
    });
    return res.json(req.body);
}
exports.gameUpdate = function (req, res) {
    var id = req.body._id;
    if (id) {
        gameModel.findById(id, function (err, game) {
            game.name = req.body.teams[0].name + ' vs ' + req.body.teams[1].name
            game.teams = req.body.teams,
            game.location = req.body.location,
            game.date = req.body.startTime,
            game.time = req.body.gameTime,
            game.statistics = req.body.statistics,
            game.inProgress = req.body.inProgress,
            game.save(function (err) {
                if (! err) {
                    res.json(true);
                    console.log("Game updated");
                } else {
                    res.json(false);
                    console.log(err);
                }
            });
        });
    }
}
exports.gameDelete = function (req, res) {
    return gameModel.findById(req.params.id, function (err, game) {
        return game.remove(function (err) {
            if (! err) {
                console.log("Game removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
}

// STATISTICS EXPORTS
exports.statisticList = function (req, res) {
    return statisticModel.find(function (err, stat) {
        if (! err) {
            res.json(stat);
        } else {
            console.log(err);
        }
    });
}
exports.statisticDelete = function (req, res) {
    return statModel.findById(req.params.id, function (err, stat) {
        return stat.remove(function (err) {
            if (! err) {
                console.log("Stat removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
}

// POSITIONS EXPORTS
exports.positionList = function (req, res) {
    return positionModel.find(function (err, position) {
        if (! err) {
            res.json(position);
        } else {
            console.log(err);
        }
    });
}