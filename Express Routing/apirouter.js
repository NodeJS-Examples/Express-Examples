var express = require('express');
var router = express.Router();

router.get('/test', function(req, res){
   res.send('GET API called.');
});

router.post('/test', function(req, res){
   res.send('POST API called.');
});

module.exports = router;