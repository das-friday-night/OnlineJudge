var router = require("express").Router();
var problemServices = require('../services/problems');
var jsonParser = require('body-parser').json();

// https://www.npmjs.com/package/node-rest-client
var node_rest_client = require('node-rest-client').Client;
var rest_client = new node_rest_client();

const EXECUTOR_SERVER_URL = 'http://localhost:5000/buildrun';
const DEBUGMODE = false;

rest_client.registerMethod('buildrun_POST', EXECUTOR_SERVER_URL, 'POST');

router.get('/problems', function(req, res){
    problemServices.getProblems()
        .then(problems => res.json(problems))
        .catch(err => res.status(400).send("Server get all problems failed!"));
});

router.get('/problems/:id', function(req, res){
    problemServices.getProblemByID(req.params.id)
        .then(problem => res.json(problem))
        .catch(err => {
            if(err === "problem not found"){
                res.status(400).send("Server can't find such problem!");
            } else {
                res.status(400).send(err);
            }
        });
});

router.post('/problems', jsonParser, function(req, res){
    problemServices.addProblem(req.body)
        .then(problem => res.json(problem))
        .catch(err => {
            if(err === "problem already exists"){
                res.status(400).send("Server found repeated problem!");
            } else {
                res.status(400).send(err);
            }
        });
});

router.post('/buildrun', jsonParser, function(req, res){
    const USER_CODE = req.body.user_code;
    const LANG = req.body.lang;

    rest_client.methods.buildrun_POST(
        {
            data: {code: USER_CODE, lang: LANG},
            headers: {"Content-Type": "application/json"}
        },
        function (data, response) {
            if(DEBUGMODE) console.log("received response:\n" + response);
            // we will put data in to build and run in executor server
            const text = `Build output:\n${data['build']}\nExecute output:\n${data['run']}`;
            res.json({text: text});
        }
    );

});

module.exports = router;