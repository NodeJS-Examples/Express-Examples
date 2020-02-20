var express = require('express');
var router = express.Router();

router.get('/test', function(req, res){
   res.send('GET site route called.');
});

router.post('/test', function(req, res){
   res.send('POST site route called.');
});

module.exports = router;