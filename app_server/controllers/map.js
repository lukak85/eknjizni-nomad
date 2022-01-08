var mapa = (req, res) => {
    res.render('map', {
        title: 'E-KNJIŽNI NOMAD',
        layout: '../views/layout.hbs',
    });
};

module.exports = {
    mapa
};