var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

var userList = [];
var passCodeList = [];
var gamePlayer = 0;
app.use("/", express.static(__dirname + "/client"));
server.listen(3000, function() {
    console.log("server is running now.");
});

io.on("connection", function(socket) {
    socket.on("login", function(nickname) {
        var randomCode = 0;
        if (userList.indexOf(nickname) != -1) {
            socket.emit("nickExisted");
        } else {
            randomCode = Math.floor(Math.random() * 10000);
            socket.emit("loginSuccess", randomCode);
            socket.randomCode = randomCode;
            passCodeList.push(randomCode);
        }

    });

    socket.on("disconnect", function() {
        userList = [];
        passCodeList = [];
        gamePlayer = 0;

        console.log("玩家离线");
    });

    socket.on("addRoom", function(passCode) {

        if (passCodeList.indexOf(parseInt(passCode)) == -1) {
            console.log(passCode);
            console.log(passCodeList);
        } else {
            socket.emit("addSuccess");
            gamePlayer++;
            if (gamePlayer == 1) {
                socket.position = "1p";
            } else if (gamePlayer == 2) {
                socket.position = "2p";
            } else {
                socket.position = "wrong";
            }
            // socket.emit("myposiTion", socket.position);
            if (gamePlayer == 2) {
                console.log("达到了两个玩家哟");
                socket.emit("gameStart", socket.position);
            }
        }
    })

});