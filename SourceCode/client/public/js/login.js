$(function () {
    var log = new Login();
    log.init();
});

function Login() {
    var self = this;
    self.socket = io.connect();
}

Login.prototype.init = function () {
    var self = this;
    self.socket.on("connect", function () {
        $(".result .notice").empty();
        $(".result .text").text("Connect Sucess!");
    });

    // 创建游戏房间
    $("#build-button").click(function () {
        if ($("#build-text").val().length <= 0) {
            $(".result .notice").text("ERROR");
            $(".result .text").text("Please Input Your ID");
        } else {
            var nickName = $("#build-text").val();
            self.socket.emit("login", nickName);
        }
        console.log(1);
    });

    self.socket.on("loginSuccess", function (passCode) {
        $(".result .text").text(passCode);
    });

    self.socket.on("nickExisted", function () {
        $(".result .text").text("Nickname is existed");
    });

    // 通过passcode加入游戏
    $("#join-button").click(function () {
        if ($("#join-text").val().length <= 0) {
            $(".result .notice").text("ERROR");
            $(".result .text").text("Pass Code Wrong");
        } else {
            self.socket.emit("addRoom", $("#join-text").val());
        }
    });

    self.socket.on("addSuccess", function () {
        $(".result .text").text("Wait For Another Player");
    });

    // self.socket.on("myposiTion",function(pos){
    //     console.log(pos);
    // });

    self.socket.on("gameStart", function (position) {
        window.player = position;
        $(".wrapper").fadeOut();
        console.log(position);
        var game = new GameLogic(self.socket);

    });
}

// 游戏客户端主逻辑
function GameLogic(socket) {
    var self = this;
    self.socket = socket;
    setTimeout(function () {
        self.init(socket);
    }, 1000);
}

GameLogic.prototype.init = function (socket) {
    console.log(socket);
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
    flash.scale(6, 6);
    flash.x = -120;
    flash.y = 0;

    var timeout = setTimeout(function () {
        Hamster.remove(flash);
    }, 3000);

    var road = Hamster.sprite({
        "name": "road_bg",
        "imageName": "road_bg",
        "x": "0",
        "y": "0"
    });

    road.x = 200;
    road.y = 50;
    Hamster.add(road);

    var hero1 = Hamster.sprite({
        "name": "Hero1",
        "imageName": "Hero1",
        "x": "0",
        "y": "0"
    });

    hero1.setSize(11, 16);
    hero1.scale(2.5, 2.5);

    hero1.x = 340;
    hero1.y = 520;

    var hero2 = Hamster.sprite({
        "name": "Hero2",
        "imageName": "Hero2",
        "x": "0",
        "y": "0"
    });
    hero2.setSize(11, 16);
    hero2.scale(2.5, 2.5);

    hero2.x = 410;
    hero2.y = 520;

    Hamster.add(hero1);
    Hamster.add(hero2);

    socket.on("position1Fresh", function (position1) {
        if (window.player == "2p") {
            hero1.y = position1;
        }
    });

    Hamster.addEventListener(hero1, "keyUp", function (e) {
        if (e.code == "KeyW") {
            if (window.player == "1p") {
                hero1.y -= 3;
                socket.emit("position1", hero1.y);

            } else if (window.player == "2p") {
                hero2.y -= 3;
            }
        }
    });

}