var besede = require("../models/besede.json");

var naslov = "E-KNJIŽNI NOMAD";

var seznam = (req, res) => {
    res.render('izbira', {
        title: naslov,
        besede: besede,
        layout: '../views/layout.hbs'
    });
};

var podrobnostiBesed = (req, res) => {
    var seznamIndex = req.params.id;

    besede.forEach(function (item, index) {
        if(item.id == seznamIndex) {
            res.render('izbira', item);
        }
    });
};

var vizualizacijaBesed = (req, res) => {
    var seznamIndex = req.params.id;

    besede.forEach(function (item, index) {
        if(item.id == seznamIndex) {
            res.render('vizualizacija', item);
        }
    });
};

module.exports = {
    seznam,
    podrobnostiBesed,
    vizualizacijaBesed
};