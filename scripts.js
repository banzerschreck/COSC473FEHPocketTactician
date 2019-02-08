/* 
 * TODO:
 *  add logic to skill data to avoid undefined effect for stone refined weapons
 */
const heroesURL = 'data/heroes.json';
const skillsURL = 'data/skills.json';

var heroData = new Object();
/*
 * sends an AJAX XMLHttpRequest to our JSON data to load it into the page
 * calls displayHeroesList() to show list of heroes on the page
 */
function buildHeroesList() {
  var request = new XMLHttpRequest();
  console.log("Attempting to load heroes from JSON...");
  request.onload = () => {
    if(request.status===200) {
      try {
        heroData = JSON.parse(request.responseText);
        console.log("Parsed JSON file!");
        console.log(heroData);
        displayHeroesList();
      } catch (e) {
        console.warn(e);
        alert("Something broke! Press F12 to check console");
      }
    } else {
      console.warn("Failed to retrieve hero data, got response code ", request.status);
    }
  };
  request.open('GET', heroesURL);
  request.send();
}
/*
 * builds list of heroes found in the database
 * items can be clicked to show that hero's data
 */
function displayHeroesList() {
  console.log("Building Heroes list...");
  
  var s = "<ul>";
  for (var i=0; i<heroData.length; i++) {
    s+="<li><a href=\"javascript:displayHeroData("+heroData[i].id+")\">";
    s+=heroData[i].name+": "+heroData[i].title+"</a></li>";
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

  s += "<img src=\"data/" + hero.assets.portrait + "\"/><br />";
  //name and title
  s+= hero.name+": "+hero.title+"<br />";
  //weapon, color, and movement
  s+= hero.color+" "+hero.weapon+" "+hero.movetype+"<br />";
  //stats
  s+= "<h3>Stats</h3>";
  s+= "<table><tr><th>Rarity/Lvl</th><th>HP</th><th>Atk</th><th>Spd</th><th>Def</th><th>Res</th></tr>";
  for (const o of hero.stats) {
    s+="<tr><td>"+o.rank+"</td><td>"+o.hp+"</td><td>"+o.atk+"</td><td>"+o.spd+"</td><td>"+o.def+"</td><td>"+o.res+"</td></tr>";
  }
  s+= "</table>";
  //skills
  s+= "<h3>Skills</h3>";
  s+= "<table><tr><th>Skill Name</th><th>Rarity</th><th>Skill Type</th></tr>";
  for (const o of hero.skills) {
    s+= "<tr><td>"+o.name+"</td><td>"+o.rarity+"</td><td>"+o.type+"</td></tr>";
  }

  document.getElementById("hero").innerHTML = s;
}

//------------------------------Skills-----------------------------------------------
var skillsData = new Object();
/*
 * sends AJAX request to skills JSON database
 * calls displaySkillsList() to display list of skills on page
 */
function buildSkillsList() {
  var request = new XMLHttpRequest();
  console.log("Loading skills from JSON...");
  request.onload = () => {
    if (request.status===200) {
      try {
        skillsData = JSON.parse(request.responseText);
        console.log("Parsed JSON file!");
        console.log(skillsData);
        displaySkillsList();
      } catch (e) {
        console.warn(e);
        alert("Something broke! Press F12 to check console");
      }
    } else {
      console.warn("Failed to retrieve skills data, got response code ", request.status);
    }
  };
  request.open('GET', skillsURL);
  request.send();
}
/* 
 * builds a clickable list of skills found in JSON database in a container called "select"
 */
function displaySkillsList() {
  console.log("Building Skills list...");

  var s = "<ul>";
  for (var i=0; i<skillsData.length; i++) {
    s+="<li><a href=\"javascript:displaySkillData("+skillsData[i].id+")\">";
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

  console.log("Displaying skill data for id = ", skillId);

  s += "<h3>" + skill.name + "</h3>";
  s += "<img src=\"data/" + skill.assets + "\"><br />";
  s += "Stats: " + skill.stats + "<br />";
  skill.effect ? p = skill.effect : p = "";
  s += "Effect: " + p + "<br />";
  s += "SP: " + skill.sp + "<br />";
  skill.prf ? p = "No" : p = "Yes";
  s += "Can be inherited?: " + p + "<br />";
  if (skill.refines) {
    //Refines
    s += "Refines: <br />";
    s += "<table><tr><th>Refine</th><th>Stats</th><th>Effect</th></tr>";
    skill.refines.neweffect ? p = skill.refines.neweffect : p = "";
    //Eff refine
    if (skill.refines.eff) {
      s += "<tr><td>Effect</td><td>" + skill.refines.eff.stats + "</td><td>" + p + "<br /><span>" + skill.refines.eff.effect + "</span></td></tr>";
    }
    //atk refine
    s += "<tr><td>Attack</td><td>" + skill.refines.atk.stats + "</td><td>" + p + "</td></tr>";
    //spd refine
    s += "<tr><td>Speed</td><td>" + skill.refines.spd.stats + "</td><td>" + p + "</td></tr>";
    //def refine
    s += "<tr><td>Defense</td><td>" + skill.refines.def.stats + "</td><td>" + p + "</td></tr>";
    //res refine
    s += "<tr><td>Resistance</td><td>" + skill.refines.res.stats + "</td><td>" + p + "</td></tr>";
    s += "</table>";
    s += "Refine Type: " + skill.refines.type + "<br />";
  }

  document.getElementById("skill").innerHTML = s;
}