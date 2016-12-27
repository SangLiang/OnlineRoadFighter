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
            radomCode =Math.floor(Math.random()*10000);
            socket.emit("loginSuccess",radomCode);
        }
        socket.id = nickname;
        socket.randomCode = randomCode;
        passCodeList.push(randomCode);
    });

    socket.on("addRoom",function(passCode){
        if(passCodeList.indexOf(passCode)!=-1){
            
        }else{
            socket.emit("addSuccess");
            gamePlayer++;
            if(gamePlayer==2){
                console.log("达到了两个玩家哟");
            }
        }
    })

});