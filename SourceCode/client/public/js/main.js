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
  flash.scale(6, 6);
  flash.x = -120;
  flash.y = 0;

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

  Hamster.addEventListener(hero1,"keyDown",function(e){
      if(e.code == "KeyW"){
          hero1.y-=3;
      }
  });