var scan = (req, res) => {
    res.render('scan', {
        title: 'E-KNJIŽNI NOMAD',
        layout: '../views/layout.hbs',
    });
};

module.exports = {
    scan
};