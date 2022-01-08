var info = (req, res) => {
    res.render('about', {
        title: 'E-KNJIŽNI NOMAD',
        subtitle: 'O nomadu',
        layout: '../views/layout.hbs',
        vsebina: 'testno'
    });
};

module.exports = {
    info
};