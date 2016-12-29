var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

var passCodeList = [];
var gamePlayer = 0;
app.use("/", express.static(__dirname + "/client"));
server.listen(3000, function () {
    console.log("server is running now.");
});

io.on("connection", function (socket) {
    if (passCodeList.length > 2) {
        return;
    }

    socket.on("login", function (nickname) {

        var randomCode = 0;
        randomCode = Math.floor(Math.random() * 10000);
        socket.emit("loginSuccess", randomCode);
        passCodeList.push(randomCode);

    });
    // 离线事件广播
    socket.on("disconnect", function () {
        passCodeList = [];
        gamePlayer = 0;
        socket.broadcast.emit("refresh");
        console.log("玩家离线");
    });

    socket.on("addRoom", function (passCode) {
        
        if (passCodeList.indexOf(parseInt(passCode)) != -1) {
            passCodeList.push(passCode);
            socket.emit("addSuccess");
            gamePlayer++;
            if (gamePlayer == 1) {
                socket.position = "1p";
            } else if (gamePlayer == 2) {
                socket.position = "2p";
            } else {
                socket.position = "wrong";
            }
            if (gamePlayer == 2) {
                console.log("达到了两个玩家哟");
                socket.emit("gameStart", socket.position);
                socket.broadcast.emit("gameStart", "1p");
            }
        }
    });

    socket.on("position1", function (position1) {
        socket.broadcast.emit("position1Fresh", position1);
        if (position1 <= 50) {
            var result = "1p";
            socket.emit("gameOver", result);
            socket.broadcast.emit("gameOver", result);
        }

    });

    socket.on("position2", function (position2) {
        socket.broadcast.emit("position2Fresh", position2);
        if (position2 <= 50) {
            var result = "2p";
            socket.broadcast.emit("gameOver", result);
            socket.emit("gameOver", result);
        }

    });

});