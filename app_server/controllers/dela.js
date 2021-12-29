var dela = require("../models/dela.json");
// var dela2 = require("../models/dela2.json");
// var dela3 = require("../models/dela3.json");
// var dela4 = require("../models/dela4.json");

var seznam = (req, res) => {
    res.render('index', {
        title: 'e-knjižni nomad',
        dela: dela
        // dela2: dela2
        // // dela3: dela3,
        // // dela4: dela4
    });
};

var podrobnostiDela = (req, res) => {
    var seznamIndex = req.params.id;

    dela.forEach(function (item, index) {
        if(item.id == seznamIndex) {
            res.render('podrobno', item);
        }
    });
};

var podrobnostiPesmi = (req, res) => {
    var seznamIndex = req.params.id;

    dela.forEach(function (item, index) {
        if(item.id == seznamIndex) {
            res.render('pesem', item);
        }
    });
};

module.exports = {
    seznam,
    podrobnostiDela,
    podrobnostiPesmi
};


// FRANCE PREŠEREN 1800-1849      /Rožna ulica 5  /     3                

// Pesem moja je posoda tvojega imena,
// mojega srca gospoda tvojega imena,
// v nji bom med slovenske brate sladki glas zanesel.
// Od zahoda do izhoda tvojega imena,
// na posodi v zlatih črkah slava se bo brala.
// Od naroda do naroda tvojega imena
// z njo svetloba bo gorela še takrat, ko bova
// onstran karonov'ga broda, tvojega imena.
// Bolj Kodelije, Korine, Cintije al' Laure,
// bi bilo pozabiti škoda tvojega imena.
//            / Gazele I /


// IVAN CANKAR 1876-1918          /Rožnik         /     4

// Objamem in poljubim te,
//  da v mehkih rokah tvojih
// ugasne ta pekoča strast,
//  ta ogenj v prsih mojih…
//            / Erotika-1899 /


// ANTON AŠKERC 1856-1912         /Prešernova cesta 9/  5                 

// Mol ita že polje in log,
// Tam onkraj slavonskih ostrog
// v neskrbnem že spanju po iva.
// Zavit v plašČ  temne noči
// Ogledat poslani smo mi,
// kot zdaj naš sovražnik se skriva…«
//              / Brodnik /


// DRAGOTIN KETTE 1876-1899             /Cukrarna,Poljanski nasip / 6                   

// V tiho samoto se kradejo, sijejo
// polni nemira in polni mladosti
// sončni prameni, in ljubko se vijejo
// lahki zefiri, otroci prostosti.
//              / Izprehod /




// Janez Menart 1929-2004        /Poljanski nasip 30   /           7                     

// Prihajali so z rimami v očeh
// In s polnimi rokavi šal. Drobiž
// Je žvenketal na pladenj. Vsenavzkriž
// Sta se prerivala prepir in smeh.
//         / Stara kavarna /


// Valentin Vodnik 1758-1819 /Vodnikova domačija,Vodnikova cesta  / 8

// Ne hčere ne sina
//  po meni ne bo.
// Dovolj je spomina,
//  me pesmi pojo.
//         / Moj spomenik /


// Srečko Kosovel 1904-1926      /Križevniška 8 /                  9                        

// Rotacijksi večer.
// Drevje ob zeleni vodi.
// Rotacija duha
// Moj duh je rdeč.
//      / Integrali /


// Mila Kačič 1912 – 2000       /Lepi pot 4     /                   10   

// Pomladno jutro, vstalo iz noči,

// V predivo megle skrilo je obzorje.
// Tam daleč, daleč zadaj, tam je morje,
// Še dlje za morjem sonce je in ti.
//         / Skoz pomladni dež /
 

// Edvard Kocbek 1904-1981     /Valvazorjeva 10   /                 11      

// Glej , ti si zdaj
// In jaz sem zdaj,
// Oba sva brez prestanka

//          / Oba /



// Gregor Strniša  1930-1987   /Rožna dolina,Cesta 5/21             12                                         

// Pride svit, svet je kot prej, 
// Zida ni, ti lahko greš.
// Greš lahko na vse strani,
// Samo, to nisi vešč ti.

//        /Pesem o kamnitem pragu /



// Cene Vipotnik 1914-1972       / Tabor 3a,vhod iz Vrhovčeve 9 /   13                  

// Ti si, kot da presiješ vse globine,
// Da skozi zmedo, zmote krčiš pot,
// Da v ostrem žaru vsa resnica sine,
// Da svetuješ vam zvesto, kam naj kod…
//         / Pesem o soncu / 

// Alojz Gradnik 1882-1967          / Župančičeva 14 /            14

// Pil sem te in ne izpil, ljubezen.
// Ko duhteče vino sladkih trt
// užil sem te, da nisem bil več trezen
// in da nisem vedel, da si smrt
//            /Eros Tanatos /





// Dane Zajc 1929-2005                  /Praprotnikova 5 /          15

// Je na drugem svetu. Enakem.
// Je drug na drugem svetu. Enak.
// Je enak na istem svetu. 
// Drug na drugem isti.
//           / Isti /



// Jure Detela 1951-1992           /Gregorčičeva 17/                16           

// Je res že čas, da se nad našim mestom
// Zasveti predstave v železu?
// Nekje morejo biti natančne meje.
// Črke so drugje.
//       / Potujoči /



// Marko Pavček 1958-1979          /Trubarjeva 61 /                 17

// Z vsako pesmijo 
// me je manj.
// Spraskam se v pesem.
// Počasi. Kos za kosom.
// Bolečina je pekoča, a sladka.
//       / Z vsako pesmijo me je manj /p













// }]