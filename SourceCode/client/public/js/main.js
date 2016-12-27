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

flash.setSize(178, 100);
flash.scale(3, 3);
flash.x = 130;
flash.y = 110;
console.log(flash);

Hamster.addEventListener(flash, "keyDown", function(e) {
    console.log(e.code);
});
