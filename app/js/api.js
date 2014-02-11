var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/qstat');
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
    team:[ {
        name: String,
        team_id: String,
        dateFrom: Date,
        dateTo: Date
    }],
    position:[ {
        name: String,
        position_id: String
    }],
    statistics:[]
});
var teamSchema = new Schema({
    '@context': {
        type: String, default: 'http://schema.org/Organization'
    },
    name: String,
    players:[ {
        name: String, player_id: String
    }],
    url: String,
    description: String,
    statistics:[]
});
var gameSchema = new Schema({
'@context': {type: String, default: 'http://schema.org/SportsEvent'},
        name: String,
        teams: [
            {
                name: String,
                team_id: String,
                score: Number,
                snitchCatch: Boolean,
                winner: Boolean
            }
        ],
        location: {
            name: String,
            latitude: Number,
            longitude: Number
        },
        date: Date,
        time: Date,
        statistics: []
});
var statSchema = new Schema({
    name: String,
    role:[String],
    type: String,
    time: Date,
    player:[ {
        name: String,
        player_id: String
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
var statModel = mongoose.model('Stat', statSchema);
var positionModel = mongoose.model('Position', statSchema);

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
    var player;
    player = new playerModel({
        name: req.body.name,
        phone: req.body.number,
    });
    player.save(function (err) {
        if (! err) {
            console.log("created");
        } else {
            console.log(err);
        }
    });
    
    return res.send(player);
}
exports.playerUpdate = function (req, res) {
    return playerModel.findById(req.params.id, function (err, player) {
        player.name = req.body.name;
        player.number = req.body.number;
        player.save(function (err) {
            if (! err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            res.send(player);
        });
    });
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
    // Add function here
}
exports.teamUpdate = function (req, res) {
    // Add function here
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
    // Add function here
}
exports.gameUpdate = function (req, res) {
    // Add function here
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
exports.statAdd = function (req, res) {
    // Add function here
}
exports.statDelete = function (req, res) {
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