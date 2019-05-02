var heroData = new Object();
window.onload = checkLoggedIn;

function checkLoggedIn() {
  fetch(heroesURL)
  .then(res => res.json())
  .then((res) => {
    console.log(res);
    heroData = res;
    displayHeroesList();
  });
  //hide hero div until user selects a hero
  document.getElementById("hero").className = "hidden";
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

  document.getElementById("heroesList").addEventListener("change", displayHeroData);
}
/*
 * builds list of heroes found in the database
 * items can be clicked to show that hero's data
 */
function displayHeroesList() {
  console.log("Building Heroes list...");
  const heroesList = document.getElementById("heroesList");
  for (var i = 0; i < heroData.length; i++) {
    var option = document.createElement("option");
   
    option.appendChild(document.createTextNode(heroData[i].name + ": " + heroData[i].title));

    heroesList.appendChild(option);
  }
}

/*
 * displays selected hero's data on the page inside of a container with id="hero"
 */
function displayHeroData() {
  document.getElementById("hero").className = "shown";
  //var s = "";
  var hero = heroData[document.getElementById("heroesList").selectedIndex - 1];


  console.log("Displaying hero data", hero);
  //const hero = heroData[heroid];
  //image
  const heroImg = document.getElementById("heroImg");
  heroImg.src = "data/" + hero.assets.main;
  //cropHeroImage(heroData[heroid].assets.main, "heroImg");
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
  const headerRow = document.createElement("tr");
  const thRank = document.createElement("th");
  thRank.innerHTML = "Rank and Level";
  const thHP = document.createElement("th");
  thHP.innerHTML = "HP";
  const thAtk = document.createElement("th");
  thAtk.innerHTML = "Atk";
  const thSpd = document.createElement("th");
  thSpd.innerHTML = "Spd";
  const thDef = document.createElement("th");
  thDef.innerHTML = "Def";
  const thRes = document.createElement("th");
  thRes.innerHTML = "Res";
  headerRow.appendChild(thRank);
  headerRow.appendChild(thHP);
  headerRow.appendChild(thAtk);
  headerRow.appendChild(thSpd);
  headerRow.appendChild(thDef);
  headerRow.appendChild(thRes);
  heroStatsTable.appendChild(headerRow);

  for (const o of hero.stats) {
    const tr = document.createElement("tr");
    const tdRank = document.createElement("td");
    tdRank.innerHTML = o.rank;
    const tdHP = document.createElement("td");
    const tdAtk = document.createElement("td");
    const tdSpd = document.createElement("td");
    const tdDef = document.createElement("td");
    const tdRes = document.createElement("td");
    if (hero.hasIV) {
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
