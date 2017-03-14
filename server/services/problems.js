var ProblemModel = require("../models/problemModel");

var problems = [
    {
        id: 1,
        name: 'Two Sum',
        desc: `Given an array of integers, return indices of the two numbers such that they add up to a specific target.

            You may assume that each input would have exactly one solution, and you may not use the same element twice.
            
            Example:
            Given nums = [2, 7, 11, 15], target = 9,
            
            Because nums[0] + nums[1] = 2 + 7 = 9,
            return [0, 1]. `,
        difficulty: 'easy'
    },
    {
        id: 2,
        name: 'Add Two Numbers',
        desc: ` You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
        
            You may assume the two numbers do not contain any leading zero, except the number 0 itself.
            
            Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
            Output: 7 -> 0 -> 8`,
        difficulty: 'medium'
    },
    {
        id: 3,
        name: 'Longest Substring Without Repeating Characters',
        desc: ` Given a string, find the length of the longest substring without repeating characters.

            Examples:
            
            Given "abcabcbb", the answer is "abc", which the length is 3.
            
            Given "bbbbb", the answer is "b", with the length of 1.
            
            Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.`,
        difficulty: 'hard'
    }
];

var getProblems = function(){
    return new Promise(
        function(resolve, reject){
            ProblemModel.find({}, function(err, problems){
                if(err) {
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
            var sameProblem = problems.find(problem => problem.name === newProblem.name);
            if(sameProblem) {

            } else {
                problems.push(newProblem);
                resolve(newProblem.name+" added to system");
            }
        });
}

module.exports = {
    getProblems: getProblems,
    getProblemByID: getProblemByID,
    addProblem: addProblem
}