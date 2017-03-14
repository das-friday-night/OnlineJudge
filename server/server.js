var express = require("express");
var app = express();
var restRouter = require('./router/restRouter');
var indexRouter = require('./router/indexRouter');
var path = require("path");

var mongoose = require("mongoose");
mongoose.connect("mongodb://user:user@ds125060.mlab.com:25060/onlinejudge");

app.use('/', indexRouter);

app.use(express.static(path.join(__dirname, "../public")));

app.use('/api/v1', restRouter);

app.use(function(req, res){
    res.sendFile("index.html", { root: path.join(__dirname, '../public/') });
});

app.listen(3000, function () {
    console.log('port 3000!')
})