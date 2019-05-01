var userData;
var A1, B1, C1, D1, E1, F1;
var A2, B2, C2, D2, E2, F2;
var A3, B3, C3, D3, E3, F3;
var A4, B4, C4, D4, E4, F4;
var A5, B5, C5, D5, E5, F5;
var A6, B6, C6, D6, E6, F6;
var A7, B7, C7, D7, E7, F7;
var A8, B8, C8, D8, E8, F8;

window.onload = function () {
  //check if logged in
  if(Stitch.defaultAppClient.auth.user) {
    document.getElementById("loggedIn").className = "shown";
    document.getElementById("notLoggedIn").className = "hidden";
  } else {
    document.getElementById("loggedIn").className = "hidden";
    document.getElementById("notLoggedIn").className = "shown";
  }
  //get hero data and fill enemy select fields
  fetch(heroesURL)
    .then(res => res.json())
    .then((res) => {
      console.log("Fetched Heroes list: ", res);
      heroData = res;
      fillEnemyFields();
    });
  //get skills data
  fetch(skillsURL)
    .then(res => res.json())
    .then((res) => {
      console.log("Fetched Skills list: ", res);
      skillsData = res;
      //function call to do things with the skillsData object we just got
    });
  //get user's heroes and add to <select>s
  const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('PocketTactician');
  db.collection('Users').find().asArray()
    .then(res => {
      userData = res;
      console.log("Fetched user data: ", userData);
      fillHeroFields();
    });

  getBoard();
  document.getElementById("start").addEventListener("click", addHeroToBoard);
  document.getElementById("mapType").selectedIndex = 0;
  handleMapTypeChange();
  document.getElementById("mapType").addEventListener("change", handleMapTypeChange);
  
  document.getElementById("hero1").addEventListener("change", displayHeroes);
  document.getElementById("hero2").addEventListener("change", displayHeroes);
  document.getElementById("hero3").addEventListener("change", displayHeroes);
  document.getElementById("hero4").addEventListener("change", displayHeroes);
  document.getElementById("hero5").addEventListener("change", displayHeroes);
  document.getElementById("enemy1").addEventListener("change", displayHeroes);
  document.getElementById("enemy2").addEventListener("change", displayHeroes);
  document.getElementById("enemy3").addEventListener("change", displayHeroes);
  document.getElementById("enemy4").addEventListener("change", displayHeroes);
  document.getElementById("enemy5").addEventListener("change", displayHeroes);
  document.getElementById("enemy6").addEventListener("change", displayHeroes);
}

function getBoard() {
  A1 = document.getElementById("A1");
  A2 = document.getElementById("A2");
  A3 = document.getElementById("A3");
  A4 = document.getElementById("A4");
  A5 = document.getElementById("A5");
  A6 = document.getElementById("A6");
  A7 = document.getElementById("A7");
  A8 = document.getElementById("A8");
  B1 = document.getElementById("B1");
  B2 = document.getElementById("B2");
  B3 = document.getElementById("B3");
  B4 = document.getElementById("B4");
  B5 = document.getElementById("B5");
  B6 = document.getElementById("B6");
  B7 = document.getElementById("B7");
  B8 = document.getElementById("B8");
  C1 = document.getElementById("C1");
  C2 = document.getElementById("C2");
  C3 = document.getElementById("C3");
  C4 = document.getElementById("C4");
  C5 = document.getElementById("C5");
  C6 = document.getElementById("C6");
  C7 = document.getElementById("C7");
  C8 = document.getElementById("C8");
  D1 = document.getElementById("D1");
  D2 = document.getElementById("D2");
  D3 = document.getElementById("D3");
  D4 = document.getElementById("D4");
  D5 = document.getElementById("D5");
  D6 = document.getElementById("D6");
  D7 = document.getElementById("D7");
  D8 = document.getElementById("D8");
  E1 = document.getElementById("E1");
  E2 = document.getElementById("E2");
  E3 = document.getElementById("E3");
  E4 = document.getElementById("E4");
  E5 = document.getElementById("E5");
  E6 = document.getElementById("E6");
  E7 = document.getElementById("E7");
  E8 = document.getElementById("E8");
  F1 = document.getElementById("F1");
  F2 = document.getElementById("F2");
  F3 = document.getElementById("F3");
  F4 = document.getElementById("F4");
  F5 = document.getElementById("F5");
  F6 = document.getElementById("F6");
  F7 = document.getElementById("F7");
  F8 = document.getElementById("F8");
}

function handleMapTypeChange() {
  const option = document.getElementById("mapType").selectedIndex;
  //0 = normal, 1 = aether raids, 2 = grand conquest
  if (option == 0) {
    document.getElementById("hero5").disabled = true;
    document.getElementById("hero5").selectedIndex = 0;
    document.getElementById("enemy5").disabled = true;
    document.getElementById("enemy5").selectedIndex = 0;
    document.getElementById("enemy6").disabled = true;
    document.getElementById("enemy6").selectedIndex = 0;
  } else if (option == 1) {
    document.getElementById("hero5").disabled = false;
    document.getElementById("hero5").selectedIndex = 0;
    document.getElementById("enemy5").disabled = false;
    document.getElementById("enemy6").disabled = false;
  } else if (option == 2) {

  }
}

function fillEnemyFields() {
  const enemy1 = document.getElementById("enemy1");
  const enemy2 = document.getElementById("enemy2");
  const enemy3 = document.getElementById("enemy3");
  const enemy4 = document.getElementById("enemy4");
  const enemy5 = document.getElementById("enemy5");
  const enemy6 = document.getElementById("enemy6");
  for (i in heroData) {
    const e1 = document.createElement("option");
    e1.innerHTML = heroData[i].name + ": " + heroData[i].title;
    enemy1.add(e1);
    const e2 = document.createElement("option");
    e2.innerHTML = heroData[i].name + ": " + heroData[i].title;
    enemy2.add(e2);
    const e3 = document.createElement("option");
    e3.innerHTML = heroData[i].name + ": " + heroData[i].title;
    enemy3.add(e3);
    const e4 = document.createElement("option");
    e4.innerHTML = heroData[i].name + ": " + heroData[i].title;
    enemy4.add(e4);
    const e5 = document.createElement("option");
    e5.innerHTML = heroData[i].name + ": " + heroData[i].title;
    enemy5.add(e5);
    const e6 = document.createElement("option");
    e6.innerHTML = heroData[i].name + ": " + heroData[i].title;
    enemy6.add(e6);
  }
}

function fillHeroFields() {
  const hero1 = document.getElementById("hero1");
  const hero2 = document.getElementById("hero2");
  const hero3 = document.getElementById("hero3");
  const hero4 = document.getElementById("hero4");
  const hero5 = document.getElementById("hero5");
  for (i in userData) {
    const yourHero1 = document.createElement("option");
    yourHero1.innerHTML = userData[i].name + ": " + userData[i].title;
    hero1.add(yourHero1);
    const yourHero2 = document.createElement("option");
    yourHero2.innerHTML = userData[i].name + ": " + userData[i].title;
    hero2.add(yourHero2);
    const yourHero3 = document.createElement("option");
    yourHero3.innerHTML = userData[i].name + ": " + userData[i].title;
    hero3.add(yourHero3);
    const yourHero4 = document.createElement("option");
    yourHero4.innerHTML = userData[i].name + ": " + userData[i].title;
    hero4.add(yourHero4);
    const yourHero5 = document.createElement("option");
    yourHero5.innerHTML = userData[i].name + ": " + userData[i].title;
    hero5.add(yourHero5);
  }
}

function displayHeroes() {
  if (document.getElementById("hero1").selectedIndex > 0) {
    //hero1
    document.getElementById("hero1Stats").className = "shown";
    hero1 = userData[document.getElementById("hero1").selectedIndex - 1];
    //console.log(hero1);
    //img
    document.getElementById("h1Img").src = "data/" + hero1.assets.main;
    //name
    document.getElementById("h1Name").innerHTML = hero1.name;
    //hp
    //var hp = hero1.stats.hp + hero1.skills.weapon.stats[0] + hero1.skills.a.stats[0] + hero1.skills.seal.stats[0];
    document.getElementById("h1HP").innerHTML = "HP: " + hero1.stats.hp;
    //atk
    document.getElementById("h1Atk").innerHTML = "Atk: " + hero1.stats.atk;
    //spd
    document.getElementById("h1Spd").innerHTML = "Spd: " + hero1.stats.spd;
    //def
    document.getElementById("h1Def").innerHTML = "Def: " + hero1.stats.def;
    //res
    document.getElementById("h1Res").innerHTML = "Res: " + hero1.stats.res;
    //a
    if (hero1.skills.a) document.getElementById("h1A").innerHTML = hero1.skills.a.name;
    else document.getElementById("h1A").innerHTML = " ";
    //b
    if (hero1.skills.b) document.getElementById("h1B").innerHTML = hero1.skills.b.name;
    else document.getElementById("h1B").innerHTML = " ";
    //c
    if (hero1.skills.c) document.getElementById("h1C").innerHTML = hero1.skills.c.name;
    else document.getElementById("h1C").innerHTML = " ";
    //s
    if (hero1.skills.s) document.getElementById("h1S").innerHTML = hero1.skills.s.name;
    else document.getElementById("h1S").innerHTML = " ";
    //weapon
    if (hero1.skills.weapon) document.getElementById("h1Weapon").innerHTML = hero1.skills.weapon.name;
    else document.getElementById("h1Weapon").innerHTML = "-";
    //assist
    if (hero1.skills.assist) document.getElementById("h1Assist").innerHTML = hero1.skills.assist.name;
    else document.getElementById("h1Assist").innerHTML = "-";
    //special
    if (hero1.skills.special) document.getElementById("h1Special").innerHTML = hero1.skills.special.name;
    else document.getElementById("h1Special").innerHTML = "-";
  } else document.getElementById("hero1Stats").className = "hidden";

  if (document.getElementById("hero2").selectedIndex > 0) {
    //hero2
    document.getElementById("hero2Stats").className = "shown";
    hero2 = userData[document.getElementById("hero2").selectedIndex - 1];
    //console.log(hero2);
    //img
    document.getElementById("h2Img").src = "data/" + hero2.assets.main;
    //name
    document.getElementById("h2Name").innerHTML = hero2.name;
    //hp
    //var hp = hero2.stats.hp + hero2.skills.weapon.stats[0] + hero2.skills.a.stats[0] + hero2.skills.seal.stats[0];
    document.getElementById("h2HP").innerHTML = "HP: " + hero2.stats.hp;
    //atk
    document.getElementById("h2Atk").innerHTML = "Atk: " + hero2.stats.atk;
    //spd
    document.getElementById("h2Spd").innerHTML = "Spd: " + hero2.stats.spd;
    //def
    document.getElementById("h2Def").innerHTML = "Def: " + hero2.stats.def;
    //res
    document.getElementById("h2Res").innerHTML = "Res: " + hero2.stats.res;
    //a
    if (hero2.skills.a) document.getElementById("h2A").innerHTML = hero2.skills.a.name;
    else document.getElementById("h2A").innerHTML = " ";
    //b
    if (hero2.skills.b) document.getElementById("h2B").innerHTML = hero2.skills.b.name;
    else document.getElementById("h2B").innerHTML = " ";
    //c
    if (hero2.skills.c) document.getElementById("h2C").innerHTML = hero2.skills.c.name;
    else document.getElementById("h2C").innerHTML = " ";
    //s
    if (hero2.skills.s) document.getElementById("h2S").innerHTML = hero2.skills.s.name;
    else document.getElementById("h2S").innerHTML = " ";
    //weapon
    if (hero2.skills.weapon) document.getElementById("h2Weapon").innerHTML = hero2.skills.weapon.name;
    else document.getElementById("h2Weapon").innerHTML = "-";
    //assist
    if (hero2.skills.assist) document.getElementById("h2Assist").innerHTML = hero2.skills.assist.name;
    else document.getElementById("h2Assist").innerHTML = "-";
    //special
    if (hero2.skills.special) document.getElementById("h2Special").innerHTML = hero2.skills.special.name;
    else document.getElementById("h2Special").innerHTML = "-";
  } else document.getElementById("hero2Stats").className = "hidden";

  if (document.getElementById("hero3").selectedIndex > 0) {
    //hero3
    document.getElementById("hero3Stats").className = "shown";
    hero3 = userData[document.getElementById("hero3").selectedIndex - 1];
    //console.log(hero3);
    //img
    document.getElementById("h3Img").src = "data/" + hero3.assets.main;
    //name
    document.getElementById("h3Name").innerHTML = hero3.name;
    //hp
    //var hp = hero3.stats.hp + hero3.skills.weapon.stats[0] + hero3.skills.a.stats[0] + hero3.skills.seal.stats[0];
    document.getElementById("h3HP").innerHTML = "HP: " + hero3.stats.hp;
    //atk
    document.getElementById("h3Atk").innerHTML = "Atk: " + hero3.stats.atk;
    //spd
    document.getElementById("h3Spd").innerHTML = "Spd: " + hero3.stats.spd;
    //def
    document.getElementById("h3Def").innerHTML = "Def: " + hero3.stats.def;
    //res
    document.getElementById("h3Res").innerHTML = "Res: " + hero3.stats.res;
    //a
    if (hero3.skills.a) document.getElementById("h3A").innerHTML = hero3.skills.a.name;
    else document.getElementById("h3A").innerHTML = " ";
    //b
    if (hero3.skills.b) document.getElementById("h3B").innerHTML = hero3.skills.b.name;
    else document.getElementById("h3B").innerHTML = " ";
    //c
    if (hero3.skills.c) document.getElementById("h3C").innerHTML = hero3.skills.c.name;
    else document.getElementById("h3C").innerHTML = " ";
    //s
    if (hero3.skills.s) document.getElementById("h3S").innerHTML = hero3.skills.s.name;
    else document.getElementById("h3S").innerHTML = " ";
    //weapon
    if (hero3.skills.weapon) document.getElementById("h3Weapon").innerHTML = hero3.skills.weapon.name;
    else document.getElementById("h3Weapon").innerHTML = "-";
    //assist
    if (hero3.skills.assist) document.getElementById("h3Assist").innerHTML = hero3.skills.assist.name;
    else document.getElementById("h3Assist").innerHTML = "-";
    //special
    if (hero3.skills.special) document.getElementById("h3Special").innerHTML = hero3.skills.special.name;
    else document.getElementById("h3Special").innerHTML = "-";
  } else document.getElementById("hero3Stats").className = "hidden";

  if (document.getElementById("hero4").selectedIndex > 0) {
    //hero4
    document.getElementById("hero4Stats").className = "shown";
    hero4 = userData[document.getElementById("hero4").selectedIndex - 1];
    //console.log(hero4);
    //img
    document.getElementById("h4Img").src = "data/" + hero4.assets.main;
    //name
    document.getElementById("h4Name").innerHTML = hero4.name;
    //hp
    //var hp = hero4.stats.hp + hero4.skills.weapon.stats[0] + hero4.skills.a.stats[0] + hero4.skills.seal.stats[0];
    document.getElementById("h4HP").innerHTML = "HP: " + hero4.stats.hp;
    //atk
    document.getElementById("h4Atk").innerHTML = "Atk: " + hero4.stats.atk;
    //spd
    document.getElementById("h4Spd").innerHTML = "Spd: " + hero4.stats.spd;
    //def
    document.getElementById("h4Def").innerHTML = "Def: " + hero4.stats.def;
    //res
    document.getElementById("h4Res").innerHTML = "Res: " + hero4.stats.res;
    //a
    if (hero4.skills.a) document.getElementById("h4A").innerHTML = hero4.skills.a.name;
    else document.getElementById("h4A").innerHTML = " ";
    //b
    if (hero4.skills.b) document.getElementById("h4B").innerHTML = hero4.skills.b.name;
    else document.getElementById("h4B").innerHTML = " ";
    //c
    if (hero4.skills.c) document.getElementById("h4C").innerHTML = hero4.skills.c.name;
    else document.getElementById("h4C").innerHTML = " ";
    //s
    if (hero4.skills.s) document.getElementById("h4S").innerHTML = hero4.skills.s.name;
    else document.getElementById("h4S").innerHTML = " ";
    //weapon
    if (hero4.skills.weapon) document.getElementById("h4Weapon").innerHTML = hero4.skills.weapon.name;
    else document.getElementById("h4Weapon").innerHTML = "-";
    //assist
    if (hero4.skills.assist) document.getElementById("h4Assist").innerHTML = hero4.skills.assist.name;
    else document.getElementById("h4Assist").innerHTML = "-";
    //special
    if (hero4.skills.special) document.getElementById("h4Special").innerHTML = hero4.skills.special.name;
    else document.getElementById("h4Special").innerHTML = "-";
  } else document.getElementById("hero4Stats").className = "hidden";

  if (document.getElementById("hero5").selectedIndex > 0) {
    //hero5
    document.getElementById("hero5Stats").className = "shown";
    hero5 = userData[document.getElementById("hero5").selectedIndex - 1];
    //console.log(hero5);
    //img
    document.getElementById("h5Img").src = "data/" + hero5.assets.main;
    //name
    document.getElementById("h5Name").innerHTML = hero5.name;
    //hp
    //var hp = hero5.stats.hp + hero5.skills.weapon.stats[0] + hero5.skills.a.stats[0] + hero5.skills.seal.stats[0];
    document.getElementById("h5HP").innerHTML = "HP: " + hero5.stats.hp;
    //atk
    document.getElementById("h5Atk").innerHTML = "Atk: " + hero5.stats.atk;
    //spd
    document.getElementById("h5Spd").innerHTML = "Spd: " + hero5.stats.spd;
    //def
    document.getElementById("h5Def").innerHTML = "Def: " + hero5.stats.def;
    //res
    document.getElementById("h5Res").innerHTML = "Res: " + hero5.stats.res;
    //a
    if (hero5.skills.a) document.getElementById("h5A").innerHTML = hero5.skills.a.name;
    else document.getElementById("h5A").innerHTML = " ";
    //b
    if (hero5.skills.b) document.getElementById("h5B").innerHTML = hero5.skills.b.name;
    else document.getElementById("h5B").innerHTML = " ";
    //c
    if (hero5.skills.c) document.getElementById("h5C").innerHTML = hero5.skills.c.name;
    else document.getElementById("h5C").innerHTML = " ";
    //s
    if (hero5.skills.s) document.getElementById("h5S").innerHTML = hero5.skills.s.name;
    else document.getElementById("h5S").innerHTML = " ";
    //weapon
    if (hero5.skills.weapon) document.getElementById("h5Weapon").innerHTML = hero5.skills.weapon.name;
    else document.getElementById("h5Weapon").innerHTML = "-";
    //assist
    if (hero5.skills.assist) document.getElementById("h5Assist").innerHTML = hero5.skills.assist.name;
    else document.getElementById("h5Assist").innerHTML = "-";
    //special
    if (hero5.skills.special) document.getElementById("h5Special").innerHTML = hero5.skills.special.name;
    else document.getElementById("h5Special").innerHTML = "-";
  } else document.getElementById("hero5Stats").className = "hidden";
  
  //enemy1
  
  //enemy2
  
  //enemy3
  
  //enemy4
  
  //enemy5
  
  //enemy6
  
}

function addHeroToBoard() {
  if (document.getElementById("hero1").selectedIndex > 0) {
    const hero1 = userData[document.getElementById("hero1").selectedIndex - 1];
    const h1pic = document.createElement("img");
    h1pic.src = "data/" + hero1.assets.main;
    A1.innerHTML = "";
    A1.appendChild(h1pic);
  }
  if (document.getElementById("hero2").selectedIndex > 0) {
    const hero2 = userData[document.getElementById("hero2").selectedIndex - 1];
    const h2pic = document.createElement("img");
    h2pic.src = "data/" + hero2.assets.main;
    B1.innerHTML = "";
    B1.appendChild(h2pic);
  }
  if (document.getElementById("hero3").selectedIndex > 0) {
    const hero3 = userData[document.getElementById("hero3").selectedIndex - 1];
    const h3pic = document.createElement("img");
    h3pic.src = "data/" + hero3.assets.main;
    C1.innerHTML = "";
    C1.appendChild(h3pic);
  }
  if (document.getElementById("hero4").selectedIndex > 0) {
    const hero4 = userData[document.getElementById("hero4").selectedIndex - 1];
    const h4pic = document.createElement("img");
    h4pic.src = "data/" + hero4.assets.main;
    D1.innerHTML = "";
    D1.appendChild(h4pic);
  }
  if (document.getElementById("hero5").selectedIndex > 0) {
    const hero5 = userData[document.getElementById("hero5").selectedIndex - 1];
    const h5pic = document.createElement("img");
    h5pic.src = "data/" + hero5.assets.main;
    E1.innerHTML = "";
    E1.appendChild(h5pic);
  }

  if (document.getElementById("enemy1").selectedIndex > 0) {
    const e1 = heroData[document.getElementById("enemy1").selectedIndex - 1];
    const e1pic = document.createElement("img");
    e1pic.src = "data/" + e1.assets.main;
    A8.innerHTML = "";
    A8.appendChild(e1pic);
  }
  if (document.getElementById("enemy2").selectedIndex > 0) {
    const e2 = heroData[document.getElementById("enemy2").selectedIndex - 1];
    const e2pic = document.createElement("img");
    e2pic.src = "data/" + e2.assets.main;
    B8.innerHTML = "";
    B8.appendChild(e2pic);
  }
  if (document.getElementById("enemy3").selectedIndex > 0) {
    const e3 = heroData[document.getElementById("enemy3").selectedIndex - 1];
    const e3pic = document.createElement("img");
    e3pic.src = "data/" + e3.assets.main;
    C8.innerHTML = "";
    C8.appendChild(e3pic);
  }
  if (document.getElementById("enemy4").selectedIndex > 0) {
    const e4 = heroData[document.getElementById("enemy4").selectedIndex - 1];
    const e4pic = document.createElement("img");
    e4pic.src = "data/" + e4.assets.main;
    D8.innerHTML = "";
    D8.appendChild(e4pic);
  }
  if (document.getElementById("enemy5").selectedIndex > 0) {
    const e5 = heroData[document.getElementById("enemy5").selectedIndex - 1];
    const e5pic = document.createElement("img");
    e5pic.src = "data/" + e5.assets.main;
    E8.innerHTML = "";
    E8.appendChild(e5pic);
  }
  if (document.getElementById("enemy6").selectedIndex > 0) {
    const e6 = heroData[document.getElementById("enemy6").selectedIndex - 1];
    const e6pic = document.createElement("img");
    e6pic.src = "data/" + e6.assets.main;
    F8.innerHTML = "";
    F8.appendChild(e6pic);
  }
}