var mapa = (req, res) => {
    res.render('map', {
        title: 'e-knjižni nomad'
    });
};

module.exports = {
    mapa
};