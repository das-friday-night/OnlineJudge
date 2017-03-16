var ProblemModel = require("../models/problemModel");

var getProblems = function(){
    return new Promise(
        function(resolve, reject){
            ProblemModel.find({}, function(err, problems){
                if(err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(problems);
                }
            });
        });
};

var getProblemByID = function(id){
    return new Promise(
        function(resolve, reject){
            ProblemModel.findOne({id: id}, function(err, problem){
                if(err) {
                    console.log(err);
                    reject(err);
                }

                if(problem){
                    resolve(problem);
                } else{
                    reject("problem not found");
                }
            });
        });
};

var addProblem = function(newProblem){
    return new Promise(
        function(resolve, reject){
            ProblemModel.findOne({name: newProblem.name}, function (err, problem) {
                if(problem){
                    reject("problem already exists");
                } else{
                    if(err) {
                        reject(err);
                    } else {
                        ProblemModel.count({}, function (err, count) {
                            newProblem.id = count + 1;
                            (new ProblemModel(newProblem)).save();
                            resolve(newProblem);
                        });
                    }
                }
            });
        });
}

module.exports = {
    getProblems: getProblems,
    getProblemByID: getProblemByID,
    addProblem: addProblem
}