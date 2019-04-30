var userData;

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

  document.getElementById("start").addEventListener("click", addHeroToBoard);
  document.getElementById("mapType").addEventListener("change", handleMapTypeChange);
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
    document.getElementById("enemy5").selectedIndex = 0;
    document.getElementById("enemy6").disabled = false;
    document.getElementById("enemy6").selectedIndex = 0;
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

function addHeroToBoard() {
  if (document.getElementById("hero1").selectedIndex > 0) {
    const hero1 = userData[document.getElementById("hero1").selectedIndex - 1];
    const h1pic = document.createElement("img");
    h1pic.src = "data/" + hero1.assets.main;
    const a1 = document.getElementById("A1");
    a1.innerHTML = "";
    a1.appendChild(h1pic);
  }
  if (document.getElementById("hero2").selectedIndex > 0) {
    const hero2 = userData[document.getElementById("hero2").selectedIndex- 1];
    const h2pic = document.createElement("img");
    h2pic.src = "data/" + hero2.assets.main;
    const b1 = document.getElementById("B1");
    b1.innerHTML = "";
    b1.appendChild(h2pic);
  }
  if (document.getElementById("hero3").selectedIndex > 0) {
    const hero3 = userData[document.getElementById("hero3").selectedIndex- 1];
    const h3pic = document.createElement("img");
    h3pic.src = "data/" + hero3.assets.main;
    const c1 = document.getElementById("C1");
    c1.innerHTML = "";
    c1.appendChild(h3pic);
  }
  if (document.getElementById("hero4").selectedIndex > 0) {
    const hero4 = userData[document.getElementById("hero4").selectedIndex- 1];
    const h4pic = document.createElement("img");
    h4pic.src = "data/" + hero4.assets.main;
    const d1 = document.getElementById("D1");
    d1.innerHTML = "";
    d1.appendChild(h4pic);
  }
  if (document.getElementById("hero5").selectedIndex > 0) {
    const hero5 = userData[document.getElementById("hero5").selectedIndex - 1];
    const h5pic = document.createElement("img");
    h5pic.src = "data/" + hero5.assets.main;
    const e1 = document.getElementById("E1");
    e1.innerHTML = "";
    e1.appendChild(h5pic);
  }

  if (document.getElementById("enemy1").selectedIndex > 0) {
    const e1 = heroData[document.getElementById("enemy1").selectedIndex - 1];
    const e1pic = document.createElement("img");
    e1pic.src = "data/" + e1.assets.main;
    const A8 = document.getElementById("A8");
    A8.innerHTML = "";
    A8.appendChild(e1pic);
  }
  if (document.getElementById("enemy2").selectedIndex > 0) {
    const e2 = heroData[document.getElementById("enemy2").selectedIndex - 1];
    const e2pic = document.createElement("img");
    e2pic.src = "data/" + e2.assets.main;
    const B8 = document.getElementById("B8");
    B8.innerHTML = "";
    B8.appendChild(e2pic);
  }
  if (document.getElementById("enemy3").selectedIndex > 0) {
    const e3 = heroData[document.getElementById("enemy3").selectedIndex - 1];
    const e3pic = document.createElement("img");
    e3pic.src = "data/" + e3.assets.main;
    const C8 = document.getElementById("C8");
    C8.innerHTML = "";
    C8.appendChild(e3pic);
  }
  if (document.getElementById("enemy4").selectedIndex > 0) {
    const e4 = heroData[document.getElementById("enemy4").selectedIndex - 1];
    const e4pic = document.createElement("img");
    e4pic.src = "data/" + e4.assets.main;
    const D8 = document.getElementById("D8");
    D8.innerHTML = "";
    D8.appendChild(e4pic);
  }
  if (document.getElementById("enemy5").selectedIndex > 0) {
    const e5 = heroData[document.getElementById("enemy5").selectedIndex - 1];
    const e5pic = document.createElement("img");
    e5pic.src = "data/" + e5.assets.main;
    const E8 = document.getElementById("E8");
    E8.innerHTML = "";
    E8.appendChild(e5pic);
  }
  if (document.getElementById("enemy6").selectedIndex > 0) {
    const e6 = heroData[document.getElementById("enemy6").selectedIndex - 1];
    const e6pic = document.createElement("img");
    e6pic.src = "data/" + e6.assets.main;
    const F8 = document.getElementById("F8");
    F8.innerHTML = "";
    F8.appendChild(e6pic);
  }
}