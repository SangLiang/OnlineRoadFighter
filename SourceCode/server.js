var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

app.use("/",express.static(__dirname+"/client"));
server.listen(3000,function(){
    console.log("server is running now.");
});


