var express = require('express');
const { route } = require('express/lib/application');
// const { route } = require('express/lib/application');
var router = express.Router();
var ctrlDela = require("../controllers/dela");
var ctrlInfo = require("../controllers/info");
var ctrlMap = require("../controllers/map");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('welcome', { title: 'e-knjižni nomad' });
// });

// router.get('/about', function(req, res, next) {
//   res.render('about', { 
//     title: 'e-knjižni nomad',
//     slika: '"/public/images/about.png"',
//     vsebina: 'E-knjižni nomad predstavlja virtualno knjižnico del slovenskih pesnikov, ki skuša poezijo približati ljudem. Trenutno se v e-knjižnici nahaja 20 del, ki jih lahko prebirate, ob enem pa izbirate besede, ki po vašem mnenju najbolj zaznamujejo prebrano poezijo.'
//    });
// });

router.get('/', ctrlDela.seznam);
router.get('/about', ctrlInfo.info);
router.get('/:id', ctrlDela.podrobnostiDela);
router.get('/map', ctrlMap.mapa);
router.get('/pesem/:id', ctrlDela.podrobnostiPesmi);


module.exports = router;
