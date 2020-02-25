exports.CreateRecord = function(newUser, callback) {
    newUser.save(function(err) {
        if (err)
            return callback(err);
        else
            return callback(null, true);
    });
};

exports.CheckUserExists = function(model, username, callback) {
    model.countDocuments({ username: username }, function(err, count){
        if (err) return callback(err); //Unknown error
        if (count > 0) return callback(null, true); //User exists
        else return callback(null, false); //User doesn't exist
    });
};
