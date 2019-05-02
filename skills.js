var skillsData = new Object();
window.onload = checkLoggedIn;

function checkLoggedIn() {
  fetch(skillsURL)
  .then(res => res.json())
  .then((res) => {
    console.log(res);
    skillsData = res;
    displaySkillsList();
  });
  document.getElementById("skill").className = "hidden";
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
    document.getElementById("navbarLoggedInManage").className = "shown navbar";
    document.getElementById("navbarLoggedInTactics").className = "shown navbar";
    document.getElementById("navbarLogoutAnchor").innerHTML = "Logged in as " + Stitch.defaultAppClient.auth.user.profile.data.email;
  }

  document.getElementById("skillsList").addEventListener("change", displaySkillData);
}
/* 
 * builds a clickable list of skills found in JSON database in a container called "select"
 */
function displaySkillsList() {
  console.log("Building Skills list...");
  var skillsList = document.getElementById("skillsList");
  for (var i = 0; i < skillsData.length; i++) {
    var option = document.createElement("option");
    option.innerHTML = skillsData[i].name;
    skillsList.appendChild(option);
  }
}
/*
 * displays data for a given skill in a container called "skill"
 */
function displaySkillData() {
  document.getElementById("skill").className = "shown";
  //var s = "";
  //var p = "";
  var skill = skillsData[document.getElementById("skillsList").selectedIndex - 1];

  console.log("Displaying skill data", skill);
  //console.log(skillsData[skillId]);
  //name
  const skillName = document.getElementById("skillName");
  skillName.innerHTML = skill.name;
  //class/type image
  const skillClass = document.getElementById("skillClass");
  if (skill.class === 'weapon') {
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
  if (skill.class === "weapon") {
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
    if (skill.refines) {//refineable
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
      if (skill.refines.neweffect) {
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
        if (skill.refines.neweffect) {
          srEffEffect.innerHTML = skill.refines.neweffect;
        } else if (skill.effect) {
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
      if (skill.refines.neweffect) {
        srAtkEffect.innerHTML = skill.refines.neweffect
      } else if (skill.effect) {
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
      if (skill.refines.neweffect) {
        srSpdEffect.innerHTML = skill.refines.neweffect
      } else if (skill.effect) {
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
      if (skill.refines.neweffect) {
        srDefEffect.innerHTML = skill.refines.neweffect
      } else if (skill.effect) {
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
      if (skill.refines.neweffect) {
        srResEffect.innerHTML = skill.refines.neweffect
      } else if (skill.effect) {
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
  } else if (skill.class === "special") {//is special
    skillIsSpecial.className = "shown";
    const skillCooldown = document.getElementById("skillCooldown");
    skillCooldown.innerHTML = skill.cooldown.$numberInt;
  } else if (skill.class === "assist") {//is assist
    skillIsAssist.className = "shown";
    const skillRange = document.getElementById("skillRange");
    skillRange.innerHTML = skill.range.$numberInt;
  }
}
