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
            self.socket.emit("addRoom", $("#join-text").val());
        }
    });

    self.socket.on("addSuccess", function() {
        $(".result .text").text("Wait For Another Player");
    });

    // self.socket.on("myposiTion",function(pos){
    //     console.log(pos);
    // });

    self.socket.on("gameStart", function(position) {
        $(".wrapper").fadeOut();
        var game = new GameLogic(self);

    });
}


function GameLogic(socket) {
    var self = this;
    self.socket = socket;
    setTimeout(function() {
        self.init();
    }, 1000);
    console.log(socket);
}

GameLogic.prototype.init = function() {
    /**
     * description:Hamster Socket Demo RoderFighter
     * author:Sa
     * e-mail:378305868@qq.com
     * engine version:Hamster-v0.0.1
     * date:2016-12－24
     */
    Hamster.init("main", 800, 600, null, "#000");

    // 闪屏logo
    var flash = Hamster.sprite({
        "name": "flash",
        "imageName": "flash",
        "x": "0",
        "y": "0"
    });
    Hamster.add(flash);
    flash.setIndex(1);
    flash.setSize(178, 100);
    flash.scale(3, 3);
    flash.x = 130;
    flash.y = 110;

    var timeout = setTimeout(function() {
        Hamster.remove(flash);
    }, 3000);

    var road = Hamster.sprite({
        "name": "road_bg",
        "imageName": "road_bg",
        "x": "0",
        "y": "0"
    });

    road.x = 200;
    Hamster.add(road);


    var hero1 = Hamster.sprite({
        "name": "road_bg",
        "imageName": "road_bg",
        "x": "0",
        "y": "0"
    });

    // Hamster.addEventListener(flash, "keyDown", function(e) {
    //     console.log(e.code);
    // });

}