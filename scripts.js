const heroesURL = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/473pockettactician-jcxsp/service/http/incoming_webhook/getHeroes';
const skillsURL = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/473pockettactician-jcxsp/service/http/incoming_webhook/getSkills';
const APP_ID = "473pockettactician-jcxsp";

var heroData = new Object();
/*
 * builds list of heroes found in the database
 * items can be clicked to show that hero's data
 */
function displayHeroesList() {
  console.log("Building Heroes list...");
  const heroesList = document.getElementById("heroesList");
  for(var i = 0; i < heroData.length; i++) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "javascript:displayHeroData(" + i + ")";
    a.appendChild(document.createTextNode(heroData[i].name + ": " + heroData[i].title));
    li.appendChild(a);
    heroesList.appendChild(li);
  }
}
/*
 * displays selected hero's data on the page inside of a container with id="hero"
 */
function displayHeroData(heroid) { 
  document.getElementById("hero").className = "shown";
  //var s = "";
  console.log("Displaying hero data for id = ", heroid);  
  const hero = heroData[heroid];
  //image
  const heroImg = document.getElementById("heroImg");
  heroImg.src = "data/" + hero.assets.main;
  //name and title
  const heroNameAndTitle = document.getElementById("heroNameAndTitle");
  heroNameAndTitle.innerHTML = hero.name + ": " + hero.title;
  //weapon and movetype images
  const heroWeapon = document.getElementById("heroWeapon");
  heroWeapon.src = "data/assets/skills/" + hero.color + hero.weapon + ".png";
  const heroMoveType = document.getElementById("heroMoveType");
  heroMoveType.src = "data/assets/skills/" + hero.movetype + ".png";
  //stats table
  const heroStatsTable = document.getElementById("heroStatsTable");
  heroStatsTable.innerHTML = "";
  for (const o of hero.stats) {
    const tr = document.createElement("tr");
    const tdRank = document.createElement("td");
    tdRank.innerHTML = o.rank;
    const tdHP = document.createElement("td");
    const tdAtk = document.createElement("td");
    const tdSpd = document.createElement("td");
    const tdDef = document.createElement("td");
    const tdRes = document.createElement("td");
    if(hero.hasIV) {
      tdHP.innerHTML = o.hp[0].$numberInt + ", " + o.hp[1].$numberInt + ", " + o.hp[2].$numberInt;
      tdAtk.innerHTML = o.atk[0].$numberInt + ", " + o.atk[1].$numberInt + ", " + o.atk[2].$numberInt;
      tdSpd.innerHTML = o.spd[0].$numberInt + ", " + o.spd[1].$numberInt + ", " + o.spd[2].$numberInt;
      tdDef.innerHTML = o.def[0].$numberInt + ", " + o.def[1].$numberInt + ", " + o.def[2].$numberInt;
      tdRes.innerHTML = o.res[0].$numberInt + ", " + o.res[1].$numberInt + ", " + o.res[2].$numberInt;
    } else {
      tdHP.innerHTML = o.hp.$numberInt;
      tdAtk.innerHTML = o.atk.$numberInt;
      tdSpd.innerHTML = o.spd.$numberInt;
      tdDef.innerHTML = o.def.$numberInt;
      tdRes.innerHTML = o.res.$numberInt;
    }
    tr.appendChild(tdRank);
    tr.appendChild(tdHP);
    tr.appendChild(tdAtk);
    tr.appendChild(tdSpd);
    tr.appendChild(tdDef);
    tr.appendChild(tdRes);
    heroStatsTable.appendChild(tr);    
  }
  const heroSkillsTable = document.getElementById("heroSkillsTable");
  heroSkillsTable.innerHTML = "";
  //skills table
  for (const o of hero.skills) {
    const tr = document.createElement("tr");
    const tdSName = document.createElement("td");
    tdSName.innerHTML = o.name;
    const tdSRarity = document.createElement("td");
    const imgSRarity = document.createElement("img");
    imgSRarity.src = "data/assets/ui/stars-" + o.rarity + "star.png";
    tdSRarity.appendChild(imgSRarity);
    const tdSType = document.createElement("td");
    imgSType = document.createElement("img");
    imgSType.src = "data/assets/skills/" + o.type + ".png";
    tdSType.appendChild(imgSType);
    
    tr.appendChild(tdSName);
    tr.appendChild(tdSRarity);
    tr.appendChild(tdSType);
    heroSkillsTable.appendChild(tr);
  }  
}

//------------------------------Skills-----------------------------------------------
var skillsData = new Object();
/* 
 * builds a clickable list of skills found in JSON database in a container called "select"
 */
function displaySkillsList() {
  console.log("Building Skills list...");
  const skillsList = document.getElementById("skillsList");
  for(var i = 0; i < skillsData.length; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "javascript:displaySkillData(" + i + ")";
    a.innerHTML = skillsData[i].name;
    li.appendChild(a);
    skillsList.appendChild(li);
  }
}
/*
 * displays data for a given skill in a container called "skill"
 */
function displaySkillData(skillId) {
  document.getElementById("skill").className = "shown";
  //var s = "";
  //var p = "";
  var skill = skillsData[skillId];

  console.log("Displaying skill data for skill #", skillId);
  console.log(skillsData[skillId]);
  //name
  const skillName = document.getElementById("skillName");
  skillName.innerHTML = skill.name;
  //class/type image
  const skillClass = document.getElementById("skillClass");
  if(skill.class === 'weapon') {
    skillClass.src = "data/assets/skills/" + skill.color + skill.type + ".png";
  } else {
    skillClass.src = "data/assets/skills/" + skill.class + ".png";
  }
  //effect
  const skillEffect = document.getElementById("skillEffect");
  skill.effect ? skillEffect.innerHTML = skill.effect : skillEffect.innerHTML = "";
  //sp
  const skillSP = document.getElementById("skillSP");
  skillSP.innerHTML = skill.sp.$numberInt;
  //inheritable
  const skillInheritable = document.getElementById("skillInheritable");
  skill.inheritable ? skillInheritable.innerHTML = "Yes" : skillInheritable.innerHTML = "No";
  
  const skillIsWeapon = document.getElementById("skillIsWeapon");
  const skillIsSpecial = document.getElementById("skillIsSpecial");
  const skillIsAssist = document.getElementById("skillIsAssist");
  skillIsWeapon.className = "hidden";
  skillIsSpecial.className = "hidden";
  skillIsAssist.className = "hidden";
  //is weapon
  if(skill.class === "weapon") {
    skillIsWeapon.className = "shown";
    //stats
    const skillStats = document.getElementById("skillStats");
    var s = "HP: " + skill.stats[0].$numberInt + ", ";
    s += "Atk: " + skill.stats[1].$numberInt + ", ";
    s += "Spd: " + skill.stats[2].$numberInt + ", ";
    s += "Def: " + skill.stats[3].$numberInt + ", ";
    s += "Res: " + skill.stats[4].$numberInt;
    skillStats.innerHTML = s;
    const skillHasRefines = document.getElementById("skillHasRefines");
    if(skill.refines) {//refineable
      skillHasRefines.className = "shown";
      //refine type
      const skillRefineType = document.getElementById("skillRefineType");
      skillRefineType.innerHTML = skill.refines.type;
      //refine cost
      const skillRefineCost = document.getElementById("skillRefineCost");
      skillRefineCost.innerHTML = skill.refines.cost.$numberInt;
      //refines table
      const skillRefinesTable = document.getElementById("skillRefinesTable");
      skillRefinesTable.innerHTML = "";
      if(skill.refines.neweffect) {
        const srEffRow = document.createElement("tr");
        const srEffRefine = document.createElement("td");
        const srEffStats = document.createElement("td");
        const srEffEffect = document.createElement("td");
        srEffRefine.innerHTML = "Effect";
        s = "HP: " + skill.refines.eff.stats[0].$numberInt + ", ";
        s += "Atk: " + skill.refines.eff.stats[1].$numberInt + ", ";
        s += "Spd: " + skill.refines.eff.stats[2].$numberInt + ", ";
        s += "Def: " + skill.refines.eff.stats[3].$numberInt + ", ";
        s += "Res: " + skill.refines.eff.stats[4].$numberInt;
        srEffStats.innerHTML = s;
        const srEffNewEffectSpan = document.createElement("span");
        srEffNewEffectSpan.innerHTML = skill.refines.eff.effect;
        srEffNewEffectSpan.id = "skillRefinesTableNewEffectSpan";
        const srEffNewEffectBR = document.createElement("br");
        if(skill.refines.neweffect) {
          srEffEffect.innerHTML = skill.refines.neweffect;
        } else if(skill.effect) {
          srEffEffect.innerHTML = skill.effect;
        } else {
          srEffEffect.innerHTML = "";
        }
        srEffEffect.appendChild(srEffNewEffectBR);
        srEffEffect.appendChild(srEffNewEffectSpan);
        srEffRow.appendChild(srEffRefine);
        srEffRow.appendChild(srEffStats);
        srEffRow.appendChild(srEffEffect);
        skillRefinesTable.appendChild(srEffRow);
      }
      //atk refine
      const srAtkRow = document.createElement("tr");
      const srAtkRefine = document.createElement("td");
      const srAtkStats = document.createElement("td");
      const srAtkEffect = document.createElement("td");
      srAtkRefine.innerHTML = "Attack";
      s = "HP: " + skill.refines.atk.stats[0].$numberInt + ", ";
      s += "Atk: " + skill.refines.atk.stats[1].$numberInt + ", ";
      s += "Spd: " + skill.refines.atk.stats[2].$numberInt + ", ";
      s += "Def: " + skill.refines.atk.stats[3].$numberInt + ", ";
      s += "Res: " + skill.refines.atk.stats[4].$numberInt;
      srAtkStats.innerHTML = s;
      if(skill.refines.neweffect) {
        srAtkEffect.innerHTML = skill.refines.neweffect
      } else if(skill.effect) {
        srAtkEffect.innerHTML = skill.effect;
      } else {
        srAtkEffect.innerHTML = "";
      }
      srAtkRow.appendChild(srAtkRefine);
      srAtkRow.appendChild(srAtkStats);
      srAtkRow.appendChild(srAtkEffect);
      skillRefinesTable.appendChild(srAtkRow);
      //spd refine
      const srSpdRow = document.createElement("tr");
      const srSpdRefine = document.createElement("td");
      const srSpdStats = document.createElement("td");
      const srSpdEffect = document.createElement("td");
      srSpdRefine.innerHTML = "Speed";
      s = "HP: " + skill.refines.spd.stats[0].$numberInt + ", ";
      s += "Atk: " + skill.refines.spd.stats[1].$numberInt + ", ";
      s += "Spd: " + skill.refines.spd.stats[2].$numberInt + ", ";
      s += "Def: " + skill.refines.spd.stats[3].$numberInt + ", ";
      s += "Res: " + skill.refines.spd.stats[4].$numberInt;
      srSpdStats.innerHTML = s;
      if(skill.refines.neweffect) {
        srSpdEffect.innerHTML = skill.refines.neweffect
      } else if(skill.effect) {
        srSpdEffect.innerHTML = skill.effect;
      } else {
        srSpdEffect.innerHTML = "";
      }
      srSpdRow.appendChild(srSpdRefine);
      srSpdRow.appendChild(srSpdStats);
      srSpdRow.appendChild(srSpdEffect);
      skillRefinesTable.appendChild(srSpdRow);
      //def refine
      const srDefRow = document.createElement("tr");
      const srDefRefine = document.createElement("td");
      const srDefStats = document.createElement("td");
      const srDefEffect = document.createElement("td");
      srDefRefine.innerHTML = "Defense";
      s = "HP: " + skill.refines.def.stats[0].$numberInt + ", ";
      s += "Atk: " + skill.refines.def.stats[1].$numberInt + ", ";
      s += "Spd: " + skill.refines.def.stats[2].$numberInt + ", ";
      s += "Def: " + skill.refines.def.stats[3].$numberInt + ", ";
      s += "Res: " + skill.refines.def.stats[4].$numberInt;
      srDefStats.innerHTML = s;
      if(skill.refines.neweffect) {
        srDefEffect.innerHTML = skill.refines.neweffect
      } else if(skill.effect) {
        srDefEffect.innerHTML = skill.effect;
      } else {
        srDefEffect.innerHTML = "";
      }
      srDefRow.appendChild(srDefRefine);
      srDefRow.appendChild(srDefStats);
      srDefRow.appendChild(srDefEffect);
      skillRefinesTable.appendChild(srDefRow);
      //res refine
      const srResRow = document.createElement("tr");
      const srResRefine = document.createElement("td");
      const srResStats = document.createElement("td");
      const srResEffect = document.createElement("td");
      srResRefine.innerHTML = "Resistance";
      s = "HP: " + skill.refines.res.stats[0].$numberInt + ", ";
      s += "Atk: " + skill.refines.res.stats[1].$numberInt + ", ";
      s += "Spd: " + skill.refines.res.stats[2].$numberInt + ", ";
      s += "Def: " + skill.refines.res.stats[3].$numberInt + ", ";
      s += "Res: " + skill.refines.res.stats[4].$numberInt;
      srResStats.innerHTML = s;
      if(skill.refines.neweffect) {
        srResEffect.innerHTML = skill.refines.neweffect
      } else if(skill.effect) {
        srResEffect.innerHTML = skill.effect;
      } else {
        srResEffect.innerHTML = "";
      }
      srResRow.appendChild(srResRefine);
      srResRow.appendChild(srResStats);
      srResRow.appendChild(srResEffect);
      skillRefinesTable.appendChild(srResRow);
    } else {
      skillHasRefines.className = "hidden";
    }
  } else if(skill.class === "special") {//is special
    skillIsSpecial.className = "shown";
    const skillCooldown = document.getElementById("skillCooldown");
    skillCooldown.innerHTML = skill.cooldown.$numberInt;
  } else if(skill.class === "assist") {//is assist
    skillIsAssist.className = "shown";
    const skillRange = document.getElementById("skillRange");
    skillRange.innerHTML = skill.range.$numberInt;
  }
}
/*======================STITCH USER AUTH/REGISTRATION=========================================*/
const {
  Stitch,
  UserPasswordAuthProviderClient
} = stitch;
const client = Stitch.initializeDefaultAppClient(APP_ID);
const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

function login(email, password) {
  const credential = new stitch.UserPasswordCredential(email, password);
  Stitch.defaultAppClient.auth.loginWithCredential(credential)
    .then(authedUser => {
      console.log("Successfully logged in with id: " + authedUser.id);
      checkLoggedIn();
    })
    .catch(err => {
      alert("Login failed: " + err);
      console.error(err);
    });
}

function logout() {
  Stitch.defaultAppClient.auth.logout()
    .then(() => {
      alert("You have been logged out");
      location.replace("./index.html");
      checkLoggedIn();
    })
    .catch(err => {
      console.error("Error logging out: ", err);
    });
}

function register(email, password) {
  console.log("Registering " + email + ", " + password);
  emailPassClient.registerWithEmail(email, password)
    .then(() => {
      console.log("Successfully sent account confirmation email!");
      alert("Please check your email to confirm your account");
    })
    .catch(err => {
      console.error("Error registering new user: ", err);
    });
}

function confirmEmail() {
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const token = params.get('token');
  const tokenId = params.get('tokenId');
  emailPassClient
    .confirmUser(token, tokenId)
    .then(() => alert('Successfully confirmed your email, you may close this page.'))
    .catch(err => console.error("Unable to register user, " + err))
}

function resendConfirmEmail(email) {
  emailPassClient
    .resendConfirmationEmail(email)
    .then(() => alert("Successfully resent confirmation email"))
    .catch(err => console.error("Unable to send confirmation email, " + err))
}

function displayResult(res, err) {
  const message = document.getElementById("message");
  if(res === "success") {
    message.innerText = "Successfully confirmed your email, you may close this window."
  } else if(res === "error") {
    message.innerText = "Unable to register user, " + err;
  }
}

function sendPassResetEmail(email) {
  emailPassClient.sendResetPasswordEmail(email)
    .then(() => {
      console.log("Successfully sent password reset email!");
    }).catch(err => {
      console.error("Error sending password reset email:", err);
    });
}

function resetPassword(newPassword) {
  // Parse the URL query parameters
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const token = params.get('token');
  const tokenId = params.get('tokenId');

  // Confirm the user's email/password account
  emailPassClient.resetPassword(token, tokenId, newPassword).then(() => {
    alert("Successfully reset password!");
  }).catch(err => {
    console.log("Error resetting password:", err);
    });
}

function checkPasswords() {
  const pass1 = document.getElementById("pass1");
  const pass2 = document.getElementById("pass2");
  if (pass1.value != pass2.value) pass2.setCustomValidity("Passwords must match");
  else pass2.setCustomValidity('');
}

function checkUserIsAdmin() {
  //console.log(Stitch.defaultAppClient.auth.user);
  if (Stitch.defaultAppClient.auth.user.id == "5ca376cee668456b3216dbaf" //gqpw@iup.edu
    || Stitch.defaultAppClient.auth.user.id == "5ca3937e01fb6305e2268cfd" //hpcw@iup.edu
    || Stitch.defaultAppClient.auth.user.id == "5ca3a59a490daf5027811f14") { //qyqs@iup.edu
    //console.log("User recognized as administrator");
    return true;
  }
  return false;
}

/*==========================Manage Heroes===================================*/
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
    return obj.type === "Special";
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
  //todo: need way to link skills in heroData to object in skillData to grab description and type and etc
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
  for(j in skillsData) {
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
    else if(skillsData[j].class === "assist") equippedAssist.appendChild(newSkill);
    //specials
    else if(skillsData[j].class === "special") equippedSpecial.appendChild(newSkill);
    //a skills
    else if(skillsData[j].class === "a") equippedA.appendChild(newSkill);
    //b skills
    else if(skillsData[j].class === "b") equippedB.appendChild(newSkill);
    //c skills
    else if(skillsData[j].class === "c") equippedC.appendChild(newSkill);
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
  db.collection('Users').updateOne({_id:yourHero._id}, yourHero)
    .then(() => {
      alert("Successfully saved changes to " + yourHero.name + "!");
      loadYourHeroes();
    })
    .catch(err => {
      alert("Error communicating with database, check console for details.");
      console.error(err);
    });
}
