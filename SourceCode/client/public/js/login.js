$(function() {
    var log = new Login();
    log.init();
});

function Login() {
    var self = this;
    self.socket = io.connect();
}

Login.prototype.init = function() {
    var self = this;
    self.socket.on("connect", function() {
        $(".result .notice").empty();
        $(".result .text").text("Connect Sucess!");
    });

    // 创建游戏房间
    $("#build-button").click(function() {
        if ($("#build-text").val().length <= 0) {
            $(".result .notice").text("ERROR");
            $(".result .text").text("Please Input Your ID");
        } else {
            var nickName = $("#build-text").val();
            self.socket.emit("login", nickName);
        }
        console.log(1);
    });

    self.socket.on("loginSuccess", function(passCode) {
        $(".result .text").text(passCode);
    });

    self.socket.on("nickExisted", function() {
        $(".result .text").text("Nickname is existed");
    });

    // 通过passcode加入游戏
    $("#join-button").click(function() {
        if ($("#join-text").val().length <= 0) {
            $(".result .notice").text("ERROR");
            $(".result .text").text("Pass Code Wrong");
        } else {
            self.socket.emit("addRoom",$("#join-text").val());
        }
    });

    self.socket.on("addSuccess",function(){
        $(".result .text").text("Wait For Another Player");
    });

    
}