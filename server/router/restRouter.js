var router = require("express").Router();
var problemServices = require('../services/problems');
var jsonParser = require('body-parser').json();

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

module.exports = router;