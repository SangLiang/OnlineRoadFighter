/**
 * description:Hamster Socket Demo RoderFighter
 * author:Sa
 * e-mail:378305868@qq.com
 * engine version:Hamster-v0.0.1
 * date:2016-12－24
 */

Hamster.init("main", 800, 600);
var BackGround = Hamster.sprite({
    "name": "BackGround",
    "imageName": "background",
    "x": "0",
    "y": "0"
});

BackGround.setSize(100,100);

Hamster.add(BackGround);

Hamster.addEventListener(BackGround, "keyDown", function (e) {
    console.log(e.code);
});

var time = setTimeout(function () {
    Hamster.remove(BackGround);
}, 1000);

// console.log(Hamster);

