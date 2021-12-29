var info = (req, res) => {
    res.render('about', {
        title: 'e-knjižni nomad',
        subtitle: 'O nomadu',
        vsebina: 'testno'
    });
};

module.exports = {
    info
};