window.onload = checkLoggedIn;

function checkLoggedIn() {
  //nav bar stuff
  document.getElementById("navbarLogout").addEventListener("click", logout);
  document.getElementById("navbarLogin").addEventListener("click", toggleLogin);
  if(!Stitch.defaultAppClient.auth.user) {//user is not logged in
    document.getElementById("navbarLogin").className = "shown";
    document.getElementById("navbarLogout").className = "hidden";
    document.getElementById("navbarLoggedInManage").className = "hidden";
    document.getElementById("navbarLoggedInTactics").className = "hidden";
    document.getElementById("navbarAdminLoggedIn").className = "hidden";
  } else {//user is logged in
    //user is admin
    if(checkUserIsAdmin()) document.getElementById("navbarAdminLoggedIn").className = "shown navbar";
    else document.getElementById("navbarAdminLoggedIn").className = "hidden";
    document.getElementById("navbarLogout").className = "shown";
    document.getElementById("navbarLogin").className = "hidden";
    document.getElementById("floatingLogin").className = "hidden";
    document.getElementById("navbarLoggedInManage").className = "shown navbar active";
    document.getElementById("navbarLoggedInTactics").className = "shown navbar";
    document.getElementById("navbarLogoutAnchor").innerHTML = "Logged in as " + Stitch.defaultAppClient.auth.user.profile.data.email;
  }
  if (Stitch.defaultAppClient.auth.user) {
    document.getElementById("notLoggedIn").className = "hidden";
    document.getElementById("loggedIn").className = "shown";
  } else {
    document.getElementById("notLoggedIn").className = "shown";
    document.getElementById("loggedIn").className = "hidden";
  }

  loadYourHeroes();
  //load list of heroes
  fetch(heroesURL)
    .then(res => res.json())
    .then((res) => {
      console.log("Fetched Heroes list: ", res);
      heroData = res;
      loadNewHeroes();
    });
  //load list of skills
  fetch(skillsURL)
    .then(res => res.json())
    .then((res) => {
      console.log("Fetched Skills list: ", res);
      skillsData = res;
      //function call to do things with the skillsData object we just got
    });

  document.getElementById("boon").onchange = handleIVChange;
  document.getElementById("bane").onchange = handleIVChange;
  document.getElementById("neut").onchange = handleIVChange;

  document.getElementById("saveChanges").onclick = saveYourHeroChanges;
  document.getElementById("deleteHero").onclick = deleteHero;

  document.getElementById("equippedWeapon").onchange = updateStats;
  document.getElementById("equippedAssist").onchange = updateStats;
  document.getElementById("equippedSpecial").onchange = updateStats;
  document.getElementById("equippedA").onchange = updateStats;
  document.getElementById("equippedB").onchange = updateStats;
  document.getElementById("equippedC").onchange = updateStats;
  document.getElementById("equippedSeal").onchange = updateStats;
}

function loadNewHeroes() {
  const list = document.getElementById("newHeroes");
  for (i in heroData) {
    const newOption = document.createElement("option");
    newOption.value = i;
    newOption.text = heroData[i].name + ": " + heroData[i].title;
    list.add(newOption);
  }
}

function addYourHero() {
  const heroVal = document.getElementById("newHeroes").value;
  const newHero = JSON.parse(JSON.stringify(heroData[heroVal]));
  //change id, add owner id
  delete newHero._id;
  newHero._ownerid = Stitch.defaultAppClient.auth.user.id;
  //remove possible IVs from stats property, replace with neutral 5* lv 40 values
  var newStats = new Object();
  if (newHero.hasIV) {
    newStats.hp = heroData[heroVal].stats[1].hp[1];
    newStats.atk = heroData[heroVal].stats[1].atk[1];
    newStats.spd = heroData[heroVal].stats[1].spd[1];
    newStats.def = heroData[heroVal].stats[1].def[1];
    newStats.res = heroData[heroVal].stats[1].res[1];
  } else {
    newStats.hp = heroData[heroVal].stats[1].hp;
    newStats.atk = heroData[heroVal].stats[1].atk;
    newStats.spd = heroData[heroVal].stats[1].spd;
    newStats.def = heroData[heroVal].stats[1].def;
    newStats.res = heroData[heroVal].stats[1].res;
  }
  newHero.stats = newStats;
  //change rarity to 5*
  newHero.rarity = 5;
  newHero.boon = "neut";
  newHero.bane = "neut";
  //skills
  newHero.skills = new Object();
  var rarity = 0;
  var index = -1;
  //weapon
  var weapons = heroData[heroVal].skills.filter(obj => {
    return obj.type === "Weapon";
  });
  console.log(weapons);
  for (var i in weapons) {
    if (weapons[i].rarity > rarity) index = i;
  }
  newHero.skills.weapon = weapons[index];
  //assist
  rarity = 0;
  index = -1;
  var assists = heroData[heroVal].skills.filter(obj => {
    return obj.type === "Assist";
  });
  for (var i in assists) {
    if (assists[i].rarity > rarity) index = i;
  }
  newHero.skills.assist = assists[index];
  //special
  rarity = 0;
  index = -1;
  var specials = heroData[heroVal].skills.filter(obj => {
    return obj.type === "special";
  });
  for (var i in specials) {
    if (specials[i].rarity > rarity) index = i;
  }
  newHero.skills.special = specials[index];
  //a
  rarity = 0;
  index = -1;
  var as = heroData[heroVal].skills.filter(obj => {
    return obj.type === "A";
  });
  for (var i in as) {
    if (as[i].rarity > rarity) index = i;
  }
  newHero.skills.a = as[index];
  //b
  rarity = 0;
  index = -1;
  var bs = heroData[heroVal].skills.filter(obj => {
    return obj.type === "B";
  });
  for (var i in bs) {
    if (bs[i].rarity > rarity) index = i;
  }
  newHero.skills.b = bs[index];
  //c
  rarity = 0;
  index = -1;
  var cs = heroData[heroVal].skills.filter(obj => {
    return obj.type === "C";
  });
  for (var i in cs) {
    if (cs[i].rarity > rarity) index = i;
  }
  newHero.skills.c = cs[index];
  //all done! add to collection
  console.log("Adding new hero: ", newHero);
  const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('PocketTactician');
  db.collection('Users').insertOne(newHero)
    .then(() => {
      alert("Successfully added new hero!");
      loadYourHeroes();
    })
    .catch(err => {
      alert("Error communicating with database, check console for details.");
      console.error(err);
    });
}

/*
 * loads saved heroes from database
 * return: array of all heroes in your database
 */
function loadYourHeroes() {
  const yourHeroesList = document.getElementById("yourHeroesList");
  yourHeroesList.innerHTML = "";
  const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('PocketTactician');
  db.collection('Users').find().asArray()
    .then(res => {
      for (i in res) {
        var yourHero = document.createElement("li");
        var yourHeroLink = document.createElement("a");
        yourHeroLink.href = "javascript:editYourHeroes(" + i + ")";
        yourHeroLink.innerHTML = res[i].name + ": " + res[i].title;
        yourHero.appendChild(yourHeroLink);
        yourHeroesList.appendChild(yourHero);
      }
      console.log("Found user's heroes: ", res);
      yourHeroes = res;
    })
    .catch(err => {
      alert("Error communicating with database while fetching user's heroes: " + err);
      console.error(err);
    });
  document.getElementById("editHero").className = "hidden";
}

var yourHeroes = new Object();
var yourHero = new Object();
var templateHero = new Object();
function editYourHeroes(i) {
  yourHero = yourHeroes[i];
  //get template hero
  templateHero = heroData.filter(obj => {
    return obj.name === yourHero.name && obj.title === yourHero.title;
  })[0];
  console.log("Template hero: ", templateHero);
  console.log("Editing hero #" + i + ": ", yourHero);
  document.getElementById("editHero").className = "shown";
  //portrait
  document.getElementById("yourHeroImage").src = "data/" + yourHero.assets.main;
  //name and title
  document.getElementById("yourHeroNameAndTitle").innerHTML = yourHero.name + ": " + yourHero.title;
  //set rarity
  var yourHeroRarity = document.getElementById("yourHeroRarity");
  yourHeroRarity.src = "data/assets/ui/stars-" + yourHero.rarity + "star.png";
  var changeHeroRarity = document.getElementById("changeHeroRarity");
  changeHeroRarity.innerHTML = "";
  for (var j = 5; j >= templateHero.rarity.$numberInt; j--) {
    var option = document.createElement("option");
    option.value = j;
    option.innerHTML = j;
    if (j == yourHero.rarity) {
      option.selected = "selected";
    }
    changeHeroRarity.appendChild(option);
  }
  changeHeroRarity.onchange = function () {
    yourHero.rarity = parseInt(changeHeroRarity.value);
    yourHeroRarity.src = "data/assets/ui/stars-" + yourHero.rarity + "star.png";
    console.log("calling updateStats() from changeHeroRarity.onchange");
    updateStats();
  }
  //set IVs
  var boon = document.getElementById("boon");
  var neut = document.getElementById("neut");
  var bane = document.getElementById("bane");
  if (!yourHero.hasIV) {
    boon.disabled = true;
    bane.disabled = true;
    neut.checked = true;
    neut.disabled = true;
  } else {
    neut.disabled = false;
  }
  if (yourHero.boon == "neut" && yourHero.bane == "neut") {
    neut.checked = true;
    boon.disabled = true;
    bane.disabled = true;
  } else {
    neut.checked = false;
    boon.disabled = false;
    bane.disabled = false;
    for (var j, k = 0; j = boon.options[k]; k++) {
      if (j.value == yourHero.boon) {
        boon.selectedIndex = k;
        break;
      }
    }
    for (var j, k = 0; j = bane.options[k]; k++) {
      if (j.value == yourHero.bane) {
        bane.selectedIndex = k;
        break;
      }
    }
  }

  //weapon
  var equippedWeapon = document.getElementById("equippedWeapon");
  equippedWeapon.innerHTML = "";
  var defaultWeapon = document.createElement("option");
  if (yourHero.skills.weapon != null) defaultWeapon.innerHTML = yourHero.skills.weapon.name;
  else defaultWeapon.innerHTML = "None";
  equippedWeapon.appendChild(defaultWeapon);
  //assist
  var equippedAssist = document.getElementById("equippedAssist");
  equippedAssist.innerHTML = "";
  var defaultAssist = document.createElement("option");
  if (yourHero.skills.assist != null) defaultAssist.innerHTML = yourHero.skills.assist.name;
  else defaultAssist.innerHTML = "None";
  equippedAssist.appendChild(defaultAssist);
  //special
  var equippedSpecial = document.getElementById("equippedSpecial");
  equippedSpecial.innerHTML = "";
  var defaultSpecial = document.createElement("option");
  if (yourHero.skills.special != null) defaultSpecial.innerHTML = yourHero.skills.special.name;
  else defaultSpecial.innerHTML = "None";
  equippedSpecial.appendChild(defaultSpecial);
  //a
  var equippedA = document.getElementById("equippedA");
  equippedA.innerHTML = "";
  var defaultA = document.createElement("option");
  if (yourHero.skills.a != null) defaultA.innerHTML = yourHero.skills.a.name;
  else defaultA.innerHTML = "None";
  equippedA.appendChild(defaultA);
  //b
  var equippedB = document.getElementById("equippedB");
  equippedB.innerHTML = "";
  var defaultB = document.createElement("option");
  if (yourHero.skills.b != null) defaultB.innerHTML = yourHero.skills.b.name;
  else defaultB.innerHTML = "None";
  equippedB.appendChild(defaultB);
  //c
  var equippedC = document.getElementById("equippedC");
  equippedC.innerHTML = "";
  var defaultC = document.createElement("option");
  if (yourHero.skills.c != null) defaultC.innerHTML = yourHero.skills.c.name;
  else defaultC.innerHTML = "None";
  equippedC.appendChild(defaultC);
  //seal
  var equippedSeal = document.getElementById("equippedSeal");
  equippedSeal.innerHTML = "";
  var defaultSeal = document.createElement("option");
  if (yourHero.skills.seal != null) defaultSeal.innerHTML = yourHero.skills.seal.name;
  else defaultSeal.innerHTML = "None";
  equippedSeal.appendChild(defaultSeal);
  //populate selects with possible skills
  for (j in skillsData) {
    if (skillsData[j].inheritable === false) continue;
    else if (skillsData[j].name === equippedWeapon.value) continue;
    else if (skillsData[j].name === equippedAssist.value) continue;
    else if (skillsData[j].name === equippedSpecial.value) continue;
    else if (skillsData[j].name === equippedA.value) continue;
    else if (skillsData[j].name === equippedB.value) continue;
    else if (skillsData[j].name === equippedC.value) continue;
    else if (skillsData[j].name === equippedSeal.value) continue;
    var newSkill = document.createElement("option");
    newSkill.innerHTML = skillsData[j].name;
    //weapons
    if (skillsData[j].class === "weapon" && skillsData[j].color === yourHero.color && skillsData[j].type === yourHero.weapon) equippedWeapon.appendChild(newSkill);
    //assists
    else if (skillsData[j].class === "assist") equippedAssist.appendChild(newSkill);
    //specials
    else if (skillsData[j].class === "special") equippedSpecial.appendChild(newSkill);
    //a skills
    else if (skillsData[j].class === "a") equippedA.appendChild(newSkill);
    //b skills
    else if (skillsData[j].class === "b") equippedB.appendChild(newSkill);
    //c skills
    else if (skillsData[j].class === "c") equippedC.appendChild(newSkill);
    //seals
    else if (skillsData[j].class === "seal") equippedSeal.appendChild(newSkill);
    //console.log(newSkill);
  }
  updateStats();
}

function updateStats() {
  //stats from IVs
  //5 => 1, 4 => 3, 3 => 5, 2 => 7, 1 => 9
  var j = yourHero.rarity * -2 + 11;
  var yourHeroHP = document.getElementById("yourHeroHP");
  var yourHeroAtk = document.getElementById("yourHeroAtk");
  var yourHeroSpd = document.getElementById("yourHeroSpd");
  var yourHeroDef = document.getElementById("yourHeroDef");
  var yourHeroRes = document.getElementById("yourHeroRes")
  if (yourHero.hasIV) {
    var hp = 1, atk = 1, spd = 1, def = 1, res = 1;
    if (yourHero.boon == "hp") hp++;
    else if (yourHero.boon == "atk") atk++;
    else if (yourHero.boon == "spd") spd++;
    else if (yourHero.boon == "def") def++;
    else if (yourHero.boon == "res") res++;
    if (yourHero.bane == "hp") hp--;
    else if (yourHero.bane == "atk") atk--;
    else if (yourHero.bane == "spd") spd--;
    else if (yourHero.bane == "def") def--;
    else if (yourHero.bane == "res") res--;
    yourHeroHP.innerHTML = templateHero.stats[j].hp[hp].$numberInt;
    yourHeroAtk.innerHTML = templateHero.stats[j].atk[atk].$numberInt;
    yourHeroSpd.innerHTML = templateHero.stats[j].spd[spd].$numberInt;
    yourHeroDef.innerHTML = templateHero.stats[j].def[def].$numberInt;
    yourHeroRes.innerHTML = templateHero.stats[j].res[res].$numberInt;
  } else {
    yourHeroHP.innerHTML = templateHero.stats[j].hp.$numberInt;
    yourHeroAtk.innerHTML = templateHero.stats[j].atk.$numberInt;
    yourHeroSpd.innerHTML = templateHero.stats[j].spd.$numberInt;
    yourHeroDef.innerHTML = templateHero.stats[j].def.$numberInt;
    yourHeroRes.innerHTML = templateHero.stats[j].res.$numberInt;
  }
  //stats from skills
  var skillHP = 0, skillAtk = 0, skillSpd = 0, skillDef = 0, skillRes = 0;
  var equippedWeapon = document.getElementById("equippedWeapon");
  var equippedA = document.getElementById("equippedA");
  var equippedB = document.getElementById("equippedB");
  var equippedC = document.getElementById("equippedC");
  var equippedSeal = document.getElementById("equippedSeal");
  var weapon, a, b, c, seal;
  if (equippedWeapon.value != "None") {
    weapon = skillsData.filter(obj => {
      return obj.name === equippedWeapon.value;
    })[0];
    if (weapon.stats) {
      skillHP += parseInt(weapon.stats[0].$numberInt);
      skillAtk += parseInt(weapon.stats[1].$numberInt);
      skillSpd += parseInt(weapon.stats[2].$numberInt);
      skillDef += parseInt(weapon.stats[3].$numberInt);
      skillRes += parseInt(weapon.stats[4].$numberInt);
    }
  }
  if (equippedA.value != "None") {
    a = skillsData.filter(obj => {
      return obj.name === equippedA.value;
    })[0];
    if (a.stats) {
      skillHP += parseInt(a.stats[0].$numberInt);
      skillAtk += parseInt(a.stats[1].$numberInt);
      skillSpd += parseInt(a.stats[2].$numberInt);
      skillDef += parseInt(a.stats[3].$numberInt);
      skillRes += parseInt(a.stats[4].$numberInt);
    }
  }
  if (equippedB.value != "None") {
    b = skillsData.filter(obj => {
      return obj.name === equippedB.value;
    })[0];
    if (b.stats) {
      skillHP += parseInt(b.stats[0].$numberInt);
      skillAtk += parseInt(b.stats[1].$numberInt);
      skillSpd += parseInt(b.stats[2].$numberInt);
      skillDef += parseInt(b.stats[3].$numberInt);
      skillRes += parseInt(b.stats[4].$numberInt);
    }
  }
  if (equippedC.value != "None") {
    c = skillsData.filter(obj => {
      return obj.name === equippedC.value;
    })[0];
    if (c.stats) {
      skillHP += parseInt(c.stats[0].$numberInt);
      skillAtk += parseInt(c.stats[1].$numberInt);
      skillSpd += parseInt(c.stats[2].$numberInt);
      skillDef += parseInt(c.stats[3].$numberInt);
      skillRes += parseInt(c.stats[4].$numberInt);
    }
  }
  if (equippedSeal.value != "None") {
    console.log(equippedSeal.value);
    seal = skillsData.filter(obj => {
      return obj.name === equippedSeal.value;
    })[0];
    if (seal.stats) {
      skillHP += parseInt(seal.stats[0].$numberInt);
      skillAtk += parseInt(seal.stats[1].$numberInt);
      skillSpd += parseInt(seal.stats[2].$numberInt);
      skillDef += parseInt(seal.stats[3].$numberInt);
      skillRes += parseInt(seal.stats[4].$numberInt);
    }
  }
  //console.log("stats from skills: ", skillHP, skillAtk, skillSpd, skillDef, skillRes);
  yourHeroHP.innerHTML = skillHP + parseInt(yourHeroHP.innerHTML);
  yourHeroAtk.innerHTML = skillAtk + parseInt(yourHeroAtk.innerHTML);
  yourHeroSpd.innerHTML = skillSpd + parseInt(yourHeroSpd.innerHTML);
  yourHeroDef.innerHTML = skillDef + parseInt(yourHeroDef.innerHTML);
  yourHeroRes.innerHTML = skillRes + parseInt(yourHeroRes.innerHTML);

  //update yourHero with selected skills
  yourHero.skills.weapon = weapon;
  yourHero.skills.assist = skillsData.filter(obj => {
    return obj.name === document.getElementById("equippedAssist").value;
  })[0];
  yourHero.skills.special = skillsData.filter(obj => {
    return obj.name === document.getElementById("equippedSpecial").value;
  })[0];
  yourHero.skills.a = a;
  yourHero.skills.b = b;
  yourHero.skills.c = c;
  yourHero.skills.seal = seal;
}

/*
 * enables/disables IV controls
 * afterwards, calls updateStats()
 */
function handleIVChange() {
  if (neut.checked) {
    boon.disabled = true;
    bane.disabled = true;
    yourHero.boon = "neut";
    yourHero.bane = "neut";
  } else {
    boon.disabled = false;
    bane.disabled = false;
    if (boon.value == bane.value) {
      bane.setCustomValidity("Boon and bane must be different");
    } else {
      yourHero.boon = boon.value;
      yourHero.bane = bane.value;
      bane.setCustomValidity("");
    }
  }
  //console.log("calling updateStats() from handleIVChange()");
  updateStats();
}

function saveYourHeroChanges() {
  console.log("Saving hero: ", yourHero);
  const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('PocketTactician');
  db.collection('Users').updateOne({ _id: yourHero._id }, yourHero)
    .then(() => {
      alert("Successfully saved changes to " + yourHero.name + "!");
      loadYourHeroes();
    })
    .catch(err => {
      alert("Error communicating with database, check console for details.");
      console.error(err);
    });
}

function deleteHero() {
  if (!confirm("Are you sure you want to delete " + yourHero.name + "?")) {
    return;
  }
  const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('PocketTactician');
  db.collection('Users').deleteOne({ _id: yourHero._id })
    .then(() => {
      alert("Successfully deleted " + yourHero.name);
      loadYourHeroes();
    })
    .catch(err => {
      alert("Error communicating with database, check console for details.");
      console.error(err);
    });
}

