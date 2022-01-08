var avtorji = [{
    "id": 01,
    "naziv": "Tone Pavček"
},
{
    "id": 02,
    "naziv": "France Prešeren"
}];

var seznam = (req, res) => {
    res.render('welcome', {
        title: 'e-knjižni nomad',
        avtorji: avtorji
    });
};

module.exports = {
    seznam
};