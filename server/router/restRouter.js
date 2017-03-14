var router = require("express").Router();
var problemServices = require('../services/problems');
var jsonParser = require('body-parser').json();

router.get('/problems', function(req, res){
    problemServices.getProblems()
        .then(problems => res.send(problems));
});

router.get('/problems/:id', function(req, res){
    problemServices.getProblemByID(req.params.id)
        .then(problem => res.send(problem))
        .catch(errmsg => res.send(errmsg));
});

router.post('/problems', jsonParser, function(req, res){
    problemServices.addProblem(req.body)
        .then(log => res.send(log))
        .catch(log => res.send(log));
});

module.exports = router;