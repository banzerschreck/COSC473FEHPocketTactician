/* 
 * TODO:
 */
const heroesURL = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/473pockettactician-jcxsp/service/http/incoming_webhook/getHeroes';
const skillsURL = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/473pockettactician-jcxsp/service/http/incoming_webhook/getSkills';

var heroData = new Object();
/*
 * builds list of heroes found in the database
 * items can be clicked to show that hero's data
 */
function displayHeroesList() {
  console.log("Building Heroes list...");
  var s = "<ul>";
  for (var i=0; i<heroData.length; i++) {
    s+="<li><a href=\"javascript:displayHeroData("+i+")\">";
    s += heroData[i].name + ": " + heroData[i].title + "</a></li>";
    console.log("Added hero #" + i + ": " + heroData[i].name);
  }
  s+="</ul>";
  
  console.log("Built Heroes list! Displaying");  
  document.getElementById("select").innerHTML = s;
}
/*
 * displays selected hero's data on the page inside of a container with id="hero"
 */
function displayHeroData(heroid) { 
  var s = "";
  var hero = heroData[heroid];
  
  console.log("Displaying hero data for id = ", heroid);  

  s += "<img src=\"data/" + hero.assets.main + "\"/><br />";
  //name and title
  s+= "<h2>"+hero.name+": "+hero.title+"</h2><br />";
  //weapon, color, and movement
  s+= "<img src=\'data/assets/skills/"+hero.color+hero.weapon+".png\'><img src=\'data/assets/skills/"+hero.movetype+".png\'><br />";
  //stats
  s+= "<h3>Stats</h3>";
  s += "<table><tr><th>Rarity/Lvl</th><th>HP</th><th>Atk</th><th>Spd</th><th>Def</th><th>Res</th></tr>";
  //console.log(hero.stats);
  if (hero.hasIV) {
    for (const o of hero.stats) {
      s+="<tr><td>"+o.rank+"</td>";
      s += "<td>" + o.hp[0].$numberInt + ", " + o.hp[1].$numberInt + ", " + o.hp[2].$numberInt+"</td>";
      s += "<td>" + o.atk[0].$numberInt + ", " + o.atk[1].$numberInt + ", " + o.atk[2].$numberInt+"</td>";
      s += "<td>" + o.spd[0].$numberInt + ", " + o.spd[1].$numberInt + ", " + o.spd[2].$numberInt+"</td>";
      s += "<td>" + o.def[0].$numberInt + ", " + o.def[1].$numberInt + ", " + o.def[2].$numberInt+"</td>";
      s += "<td>" + o.res[0].$numberInt + ", " + o.res[1].$numberInt + ", " + o.res[2].$numberInt+"</td></tr>";
    }
  } else {
    for (const o of hero.stats) {
      s += "<tr><td>" + o.rank+"</td>";
      s += "<td>" + o.hp.$numberInt+"</td>";
      s += "<td>" + o.atk.$numberInt+"</td>";
      s += "<td>" + o.spd.$numberInt+"</td>";
      s += "<td>" + o.def.$numberInt+"</td>";
      s += "<td>" + o.res.$numberInt+"</td></tr>";
    }
  }
  s+= "</table>";
  //skills
  s += "<h3>Skills</h3>";
  s += "<table><tr><th>Skill Name</th><th>Rarity</th><th>Skill Type</th></tr>";
  console.log(hero.skills);
  for (const o of hero.skills) {
    s += "<tr><td>"+o.name+"</td>";
    s += "<td><img src=\"data/assets/ui/stars-" + o.rarity+"star.png\"></img></td>";
    s += "<td><img src=\"data/assets/skills/" + o.type+".png\"></td></tr>";
  }
  s+="</table>";
  document.getElementById("hero").innerHTML = s;
}

//------------------------------Skills-----------------------------------------------
var skillsData = new Object();
/* 
 * builds a clickable list of skills found in JSON database in a container called "select"
 */
function displaySkillsList() {
  console.log("Building Skills list...");

  var s = "<ul>";
  for (var i=0; i<skillsData.length; i++) {
    s+="<li><a href=\"javascript:displaySkillData("+i+")\">";
    s+= skillsData[i].name;
    s+="</a></li>";
  }
  s+="</ul>";
  document.getElementById("select").innerHTML = s;
}
/*
 * displays data for a given skill in a container called "skill"
 */
function displaySkillData(skillId) {
  var s = "";
  var p = "";
  var skill = skillsData[skillId];

  console.log("Displaying skill data for skill #", skillId);
  console.log(skillsData[skillId]);

  s += "<h3>" + skill.name + "</h3>";
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
  document.getElementById("skill").innerHTML = s;
}