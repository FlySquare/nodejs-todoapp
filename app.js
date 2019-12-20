var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();


app.use(session({secret: 'todotopsecret'}))


//yapılacaklar listesi boşsa oluşturuyor
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

//yapılacaklar listesi görüntüleniyor
.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist});
})

//yapılacaklar listesine bie öğe ekleme
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

//yapılacaklar listesinden bir öğe silme
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

//404 sayfası
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);   