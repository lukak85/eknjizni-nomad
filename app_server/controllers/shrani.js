const fs = require('fs');
const path = require('path');
const app = require('../../app');
let content = JSON.parse(fs.readFileSync('app_server/models/besede.json', 'utf8'));

var increaseWordByOne = (req, res) => {
    var work_id = req.body.params.work_id,
        clicked_id = req.body.params.clicked_id;
    
    console.log();
    console.log(work_id);
    console.log(clicked_id);
    console.log();

    for (let i = 0; i <= content.length; i++) {
        if (content[i].id == work_id) {
            for (let j = 0; j < content[i].besedeIzb.length; j++) {
                if (content[i].besedeIzb[j]["id-b"] == clicked_id) {
                    content[i].besedeIzb[j].stIzbir += 1;
                    content[i].besedeIzb[j].stizbir = Math.min(10, content[i].besedeIzb[j].stizbir);
                    fs.writeFileSync('app_server/models/besede.json', JSON.stringify(content));
                    res.json({
                        response: "ok",
                        i: work_id,
                        j: clicked_id
                    });
                    return;
                }
            }
        }
    }

    res.json({
        response: "no word counts iterated",
        i: req
    });
}

module.exports = {
    increaseWordByOne
};