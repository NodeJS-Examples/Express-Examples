var express = require('express');
var router = express.Router();

var dogs = [{
        id: 1,
        name: "Tiny",
        age: 3
    },
    {
        id: 2,
        name: "Tim",
        age: 3
    }
];

router.get('/', function(req,res){
    if(req.query.id)
        res.redirect('/' + req.query.id);
    res.json(dogs);
});

router.get('/:id', function(req,res){
    var getDog = dogs.filter(function(dog){
        if(dog.id == req.params.id)
            return true;
    });
});

module.exports = router;