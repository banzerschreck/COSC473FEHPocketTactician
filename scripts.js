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
  /*s += "<h3>" + skill.name + "</h3>";
  if(skill.class=="weapon") {
    s += "<img src=\"data/assets/skills/" + skill.color + skill.type + ".png\"><br />";
  } else {
    s += "<img src=\"data/assets/skills/" + skill.class + ".png\"><br />";
  }
  skill.effect ? p = skill.effect : p = "";
  s += "Effect: " + p + "<br />";
  s += "SP: " + skill.sp.$numberInt + "<br />";
  skill.inheritable ? p = "Yes" : p = "No";
  s += "Can be inherited?: " + p + "<br />";
  
  if(skill.class=="weapon") {
    s += "Stats: ";
    s += skill.stats[0].$numberInt + ", ";
    s += skill.stats[1].$numberInt + ", ";
    s += skill.stats[2].$numberInt + ", ";
    s += skill.stats[3].$numberInt + ", ";
    s += skill.stats[4].$numberInt + "<br />";
    if (skill.refines) {//Refines
      s += "Refines: <br />";
      s += "Refine Type: " + skill.refines.type;
      s += " Refine Cost: " + skill.refines.cost.$numberInt;
      s += "<table><tr><th>Refine</th><th>Stats</th>";
      if (skill.refines.neweffect) {
        p = skill.refines.neweffect ;
        s += "<th>Effect</th></tr>";
      } else {
        p = "";
        s += "</tr>";
      }
      //Eff refine
      if (skill.refines.eff) {
        s += "<tr><td>Effect</td><td>" + skill.refines.eff.stats[0].$numberInt + ", "
          + skill.refines.eff.stats[1].$numberInt + ", "
          + skill.refines.eff.stats[2].$numberInt + ", "
          + skill.refines.eff.stats[3].$numberInt + ", "
          + skill.refines.eff.stats[4].$numberInt + "</td>";
        if (skill.effect) {
          s += "<td>" + p + "<br /><span>" + skill.refines.eff.effect + "</span></td></tr>";
        } else {
          s += "</tr>";
        }
      }
      //atk refine
      s += "<tr><td>Attack</td><td>" + skill.refines.atk.stats[0].$numberInt + ", "
        + skill.refines.atk.stats[1].$numberInt + ", "
        + skill.refines.atk.stats[2].$numberInt + ", "
        + skill.refines.atk.stats[3].$numberInt + ", "
        + skill.refines.atk.stats[4].$numberInt + "</td>";
      if (skill.effect) {
        s += "<td>" + p + "</td></tr>";
      } else {
        s += "</tr>";
      }
      //spd refine
      s += "<tr><td>Speed</td><td>" + skill.refines.spd.stats[0].$numberInt + ", "
        + skill.refines.spd.stats[1].$numberInt + ", "
        + skill.refines.spd.stats[2].$numberInt + ", "
        + skill.refines.spd.stats[3].$numberInt + ", "
        + skill.refines.spd.stats[4].$numberInt + "</td>";
      if (skill.effect) {
        s += "<td>" + p + "</td></tr>";
      } else {
        s += "</tr>";
      }
      //def refine
      s += "<tr><td>Defense</td><td>" + skill.refines.def.stats[0].$numberInt + ", "
        + skill.refines.def.stats[1].$numberInt + ", "
        + skill.refines.def.stats[2].$numberInt + ", "
        + skill.refines.def.stats[3].$numberInt + ", "
        + skill.refines.def.stats[4].$numberInt + "</td>";
      if (skill.effect) {
        s += "<td>" + p + "</td></tr>";
      } else {
        s += "</tr>";
      }
      //res refine
      s += "<tr><td>Resistance</td><td>" + skill.refines.res.stats[0].$numberInt + ", "
        + skill.refines.res.stats[1].$numberInt + ", "
        + skill.refines.res.stats[2].$numberInt + ", "
        + skill.refines.res.stats[3].$numberInt + ", "
        + skill.refines.res.stats[4].$numberInt + "</td>";
      if (skill.effect) {
        s += "<td>" + p + "</td></tr>";
      } else {
        s += "</tr>";
      }
      s += "</table>";
    }
  } else if(skill.class=="special") {
    s += "Cooldown: " + skill.cooldown.$numberInt + "<br />";
  } else if(skill.class=="assist") {
    s += "Range: " + skill.range.$numberInt + "<br />";
  }
  document.getElementById("skill").innerHTML = s;*/
}
/*======================STITCH USER AUTH/REGISTRATION=========================================*/
const {
  Stitch,
  UserPasswordAuthProviderClient
} = stitch;
Stitch.initializeDefaultAppClient(APP_ID);
const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

function login(email, password) {
  const credential = new stitch.UserPasswordCredential(email, password);
  Stitch.defaultAppClient.auth.loginWithCredential(credential)
    .then(authedUser => {
      console.log("Successfully logged in with id: " + authedUser.id);
      checkLoggedIn();
    })
    .catch(err => console.error("Failed to login: " + err));
}

function logout() {
  Stitch.defaultAppClient.auth.logout()
    .then(() => {
      alert("You have been logged out");
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
