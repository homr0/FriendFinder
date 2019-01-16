var path = require("path");
var fs = require("fs");
var friends = require("../data/friends.js");

module.exports = (app) => {
    // Displays all friends.
    app.get("/api/friends", function(req, res) {
        // Gets the data from the friends.js file.
        res.json(friends);
    });

    // Gets survey results and finds a compatible friend.
    app.post("/api/friends", function(req, res) {
        var newUser = req.body;

        var scores = newUser.scores;

        // Check the differences between scores for each person in the friends data set.
        var newFriend = {};
        var closeness = 50;

        for(var i = 0; i < friends.length; i++) {
            var totalDifference = 0;

            for(var j = 0; j < scores.length; j++) {
                totalDifference += Math.abs(scores[j] - friends[i].scores[j]);
            }

            if(totalDifference < closeness) {
                closeness = totalDifference;
                newFriend = friends[i];
            }
        }

        // Adds the user to the friends list.
        friends.push(newUser);

        // Updates the friends file.
        fs.writeFileSync(path.join(__dirname, "../data/friends.js"), "module.exports = " + JSON.stringify(friends, null, 4));

        // Sends the new friend to the user.
        res.json(newFriend);
    });
}