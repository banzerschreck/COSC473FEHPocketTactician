function genHeroStatsFields() {
  var field = document.getElementById("hRarity");
  var rarity = field.options[field.selectedIndex].value;
  var input = document.getElementById('hIVs');
  var tableBody = document.getElementById("hStatsBody");
  var s = "";
  tableBody.innerHTML = "";
  //console.log(input.value);
  if (input.checked) {
    for (var i = 5; i >= rarity && i > 2; i--) {
      /*//level 1
      var row1 = document.createElement("tr");
      var titleCell1 = document.createElement("td");
      titleCell1.innerHTML = i + " Star Level 1";
      row1.appendChild(titleCell1);
      //hp
      var hpCell1 = document.createElement("td");
      //boon
      var hpBoon1L = document.createElement("label");
      hpBoon1L.innerHTML = "Boon:";
      hpCell1.appendChild(hpBoon1L);
      var hpBoonCell1 = document.createElement("td");
      hpBoonCell1.innerHTML = "Boon:";
      var hpBoon1 = document.createElement("input");
      hpBoon1.id = "hp" + i + "l1boon";
      hpBoon1.type = "number";
      hpBoon1.value = 0;
      hpBoon1.required = true;
      hpCell1.appendChild(hpBoon1);
      hpCell1.appendChild(document.createElement("br"));
      //neutral
      var hpNeut1L = document.createElement("label");
      hpNeut1L.innerHTML = "Neut:";
      hpCell1.appendChild(hpNeut1L);
      var hpNeut1 = document.createElement("input");
      hpNeut1.id = "hp" + i + "l1neut";
      hpNeut1.type = "number";
      hpNeut1.value = 0;
      hpNeut1.required = true;
      hpCell1.appendChild(hpNeut1);
      hpCell1.appendChild(document.createElement("br"));
      //bane
      var hpBane1L = document.createElement("label");
      hpBane1L.innerHTML = "Bane:";
      hpCell1.appendChild(hpBane1L);
      var hpBane1 = document.createElement("input");
      hpBane1.id = "hp" + i + "l1bane";
      hpBane1.type = "number";
      hpBane1.value = 0;
      hpBane1.required = true;
      hpCell1.appendChild(hpBane1);
      row1.appendChild(hpCell1);

      tableBody.appendChild(row1);*/
      //level 40
      s += "<tr><td>" + i + " Star Level 1</td>";
      s += "<td>Bane:<input id=\"hp" + i + "l1bane\" type = \"number\" value = 0 required>";
      s += "Neutral:<input id=\"hp" + i + "l1neut\" type = \"number\" value = 0 required>";
      s += "Boon:<input id=\"hp" + i + "l1boon\" type = \"number\" value = 0 required></td>";
      s += "<td>Bane:<input id=\"atk" + i + "l1bane\" type = \"number\" value = 0 required>";
      s += "Neutral:<input id=\"atk" + i + "l1neut\" type = \"number\" value = 0 required>";
      s += "Boon:<input id=\"atk" + i + "l1boon\" type = \"number\" value = 0 required></td>";
      s += "<td>Bane:<input id=\"spd" + i + "l1bane\" type = \"number\" value = 0 required>";
      s += "Neutral:<input id=\"spd" + i + "l1neut\" type = \"number\" value = 0 required>";
      s += "Boon:<input id=\"spd" + i + "l1boon\" type = \"number\" value = 0 required></td>";
      s += "<td>Bane:<input id=\"def" + i + "l1bane\" type = \"number\" value = 0 required>";
      s += "Neutral:<input id=\"def" + i + "l1neut\" type = \"number\" value = 0 required>";
      s += "Boon:<input id=\"def" + i + "l1boon\" type = \"number\" value = 0 required></td>";
      s += "<td>Bane:<input id=\"res" + i + "l1bane\" type = \"number\" value = 0 required>";
      s += "Neutral:<input id=\"res" + i + "l1neut\" type = \"number\" value = 0 required>";
      s += "Boon:<input id=\"res" + i + "l1boon\" type = \"number\" value = 0 required></td>";
      s += "<tr><td>" + i + " Star Level 40</td>";
      s += "<td>Bane:<input id=\"hp" + i + "l40bane\" type = \"number\" value = 0 required>";
      s += "Neutral:<input id=\"hp" + i + "l40neut\" type = \"number\" value = 0 required>";
      s += "Boon:<input id=\"hp" + i + "l40boon\" type = \"number\" value = 0 required></td>";
      s += "<td>Bane:<input id=\"atk" + i + "l40bane\" type = \"number\" value = 0 required>";
      s += "Neutral:<input id=\"atk" + i + "l40neut\" type = \"number\" value = 0 required>";
      s += "Boon:<input id=\"atk" + i + "l40boon\" type = \"number\" value = 0 required></td>";
      s += "<td>Bane:<input id=\"spd" + i + "l40bane\" type = \"number\" value = 0 required>";
      s += "Neutral:<input id=\"spd" + i + "l40neut\" type = \"number\" value = 0 required>";
      s += "Boon:<input id=\"spd" + i + "l40boon\" type = \"number\" value = 0 required></td>";
      s += "<td>Bane:<input id=\"def" + i + "l40bane\" type = \"number\" value = 0 required>";
      s += "Neutral:<input id=\"def" + i + "l40neut\" type = \"number\" value = 0 required>";
      s += "Boon:<input id=\"def" + i + "l40boon\" type = \"number\" value = 0 required></td>";
      s += "<td>Bane:<input id=\"res" + i + "l40bane\" type = \"number\" value = 0 required>";
      s += "Neutral:<input id=\"res" + i + "l40neut\" type = \"number\" value = 0 required>";
      s += "Boon:<input id=\"res" + i + "l40boon\" type = \"number\" value = 0 required></td>";
    }
    if (rarity <= 2) {
      for (var i = 2; i >= rarity; i--) {
        s += "<tr><td>" + i + " Star Level 1</td>";
        s += "<td><input id=\"hp" + i + "l1\" type=\"number\" value = 0 required></td>";
        s += "<td><input id=\"atk" + i + "l1\" type=\"number\" value = 0 required></td>";
        s += "<td><input id=\"spd" + i + "l1\" type=\"number\" value = 0 required></td>";
        s += "<td><input id=\"def" + i + "l1\" type=\"number\" value = 0 required></td>";
        s += "<td><input id=\"res" + i + "l1\" type=\"number\" value = 0 required></td>";
        s += "<tr><td>" + i + " Star Level 40</td>";
        s += "<td><input id=\"hp" + i + "l40\" type=\"number\" value = 0 required></td>";
        s += "<td><input id=\"atk" + i + "l40\" type=\"number\" value = 0 required></td>";
        s += "<td><input id=\"spd" + i + "l40\" type=\"number\" value = 0 required></td>";
        s += "<td><input id=\"def" + i + "l40\" type=\"number\" value = 0 required></td>";
        s += "<td><input id=\"res" + i + "l40\" type=\"number\" value = 0 required></td>";
      }
    }
  } else {
    for (var i = 5; i >= rarity; i--) {
      s += "<tr><td>" + i + " Star Level 1</td>";
      s += "<td><input id=\"hp" + i + "l1\" type=\"number\" value = 0 required></td>";
      s += "<td><input id=\"atk" + i + "l1\" type=\"number\" value = 0 required></td>";
      s += "<td><input id=\"spd" + i + "l1\" type=\"number\" value = 0 required></td>";
      s += "<td><input id=\"def" + i + "l1\" type=\"number\" value = 0 required></td>";
      s += "<td><input id=\"res" + i + "l1\" type=\"number\" value = 0 required></td>";
      s += "<tr><td>" + i + " Star Level 40</td>";
      s += "<td><input id=\"hp" + i + "l40\" type=\"number\" value = 0 required></td>";
      s += "<td><input id=\"atk" + i + "l40\" type=\"number\" value = 0 required></td>";
      s += "<td><input id=\"spd" + i + "l40\" type=\"number\" value = 0 required></td>";
      s += "<td><input id=\"def" + i + "l40\" type=\"number\" value = 0 required></td>";
      s += "<td><input id=\"res" + i + "l40\" type=\"number\" value = 0 required></td>";
    }
  }
  tableBody.innerHTML = s;
}

function hsTableAddNewSkill() {
  var table = document.getElementById('heroSkillsTable');
  var rows = table.getElementsByTagName("tr").length;
  var row = table.insertRow(rows);
  var s = "<tr id=\"hSTRow" + rows + "\"><td><input id=\"hs" + rows + "Name\" type=\"text\" required></td>"
    + "<td><select id=\"hs" + rows + "Rarity\" required>"
    + "<option value=5>5 Stars</option>"
    + "<option value=4>4 Stars</option>"
    + "<option value=3>3 Stars</option>"
    + "<option value=2>2 Stars</option>"
    + "<option value=1>1 Stars</option>"
    + "</select></td>"
    + "<td><select id=\"hs" + rows + "Type\" required>"
    + "<option value=\"Weapon\">Weapon</option>"
    + "<option value=\"Assist\">Assist</option>"
    + "<option value=\"Special\">Special</option>"
    + "<option value=\"A\">A</option>"
    + "<option value=\"B\">B</option>"
    + "<option value=\"C\">C</option>"
    + "</select></td>"
    + "<td><input type=\"button\" value=\"Remove\" onclick=\"hsTableRemoveSkill(this)\"></tr>";
  row.innerHTML += s;
}

function hsTableRemoveSkill(button) {
  var table = document.getElementById('heroSkillsTable');
  var row = button.parentNode.parentNode;
  table.deleteRow(row.rowIndex);
}

function sRefineStatsTableEffect() {
  var table = document.getElementById("sRefineStatsTable");
  var rows = table.getElementsByTagName("tr").length;
  if (rows == 5 && document.getElementById("sHasEffectRefine").checked) {
    var row = table.insertRow(rows);
    var s = "<td>Eff</td>"
      + "<td><input type=\"number\" id=\"sEffRefineHPStat\" value=\"0\"/></td>"
      + "<td><input type=\"number\" id=\"sEffRefineAtkStat\" value=\"0\"/></td>"
      + "<td><input type=\"number\" id=\"sEffRefineSpdStat\" value=\"0\"/></td>"
      + "<td><input type=\"number\" id=\"sEffRefineDefStat\" value=\"0\"/></td>"
      + "<td><input type=\"number\" id=\"sEffRefineResStat\" value=\"0\"/></td>"
      + "<td>Effect:<input type=\"text\" id=\"sEffRefineEffect\"/></td>";
    row.innerHTML = s;
  } else if (rows == 6) {
    table.deleteRow(rows - 1);
  }
}

 function sendHeroData (e) {
  e.preventDefault();
  //alert("Send Hero Data: Doesn't work yet, sorry :(");
  var data = "{";
  data += "\"name\":\"" + document.getElementById('hName').value + "\",";
  data += "\"title\":\"" + document.getElementById('hTitle').value + "\",";
  data += "\"color\":\"" + document.getElementById('hColor').value + "\",";
  data += "\"weapon\":\"" + document.getElementById('hWeaponType').value + "\",";
  data += "\"movetype\":\"" + document.getElementById('hMoveType').value + "\",";
  data += "\"rarity\":" + document.getElementById('hRarity').value + ",";
  data += "\"assets\":{";
  data += "\"portrait\":\"" + document.getElementById('hPortrait').value + "\",";
  data += "\"main\":\"" + document.getElementById('hMain').value + "\"},";
  data += "\"stats\":[";
  for (var i = 5; i >= document.getElementById('hRarity').value; i--) {
    if (document.getElementById('hIVs').checked) {
      data += "{\"rank\":\"" + i + " Star Level 1\",";
      data += "\"hp\":[" + document.getElementById('hp' + i + 'l1bane').value + "," +
        document.getElementById('hp' + i + 'l1neut').value + "," +
        document.getElementById('hp' + i + 'l1boon').value + "],";
      data += "\"atk\":[" + document.getElementById('atk' + i + 'l1bane').value + "," +
        document.getElementById('atk' + i + 'l1neut').value + "," +
        document.getElementById('atk' + i + 'l1boon').value + "],";
      data += "\"spd\":[" + document.getElementById('spd' + i + 'l1bane').value + "," +
        document.getElementById('spd' + i + 'l1neut').value + "," +
        document.getElementById('spd' + i + 'l1boon').value + "],";
      data += "\"def\":[" + document.getElementById('def' + i + 'l1bane').value + "," +
        document.getElementById('def' + i + 'l1neut').value + "," +
        document.getElementById('def' + i + 'l1boon').value + "],";
      data += "\"res\":[" + document.getElementById('res' + i + 'l1bane').value + "," +
        document.getElementById('res' + i + 'l1neut').value + "," +
        document.getElementById('res' + i + 'l1boon').value + "]},";
      data += "{\"rank\":\"" + i + " Star Level 40\",";
      data += "\"hp\":[" + document.getElementById('hp' + i + 'l40bane').value + "," +
        document.getElementById('hp' + i + 'l40neut').value + "," +
        document.getElementById('hp' + i + 'l40boon').value + "],";
      data += "\"atk\":[" + document.getElementById('atk' + i + 'l40bane').value + "," +
        document.getElementById('atk' + i + 'l40neut').value + "," +
        document.getElementById('atk' + i + 'l40boon').value + "],";
      data += "\"spd\":[" + document.getElementById('spd' + i + 'l40bane').value + "," +
        document.getElementById('spd' + i + 'l40neut').value + "," +
        document.getElementById('spd' + i + 'l40boon').value + "],";
      data += "\"def\":[" + document.getElementById('def' + i + 'l40bane').value + "," +
        document.getElementById('def' + i + 'l40neut').value + "," +
        document.getElementById('def' + i + 'l40boon').value + "],";
      data += "\"res\":[" + document.getElementById('res' + i + 'l40bane').value + "," +
        document.getElementById('res' + i + 'l40neut').value + ",";
      if (i == document.getElementById('hRarity').value) {
        data += document.getElementById('res' + i + 'l40boon').value + "]}";
      } else {
        data += document.getElementById('res' + i + 'l40boon').value + "]},";
      }
    } else {
      data += "{\"rank\":\"" + i + " Star Level 1\",";
      data += "\"hp\":" + document.getElementById('hp' + i + 'l1').value + ",";
      data += "\"atk\":" + document.getElementById('atk' + i + 'l1').value + ",";
      data += "\"spd\":" + document.getElementById('spd' + i + 'l1').value + ",";
      data += "\"def\":" + document.getElementById('def' + i + 'l1').value + ",";
      data += "\"res\":" + document.getElementById('res' + i + 'l1').value + "},";
      data += "{\"rank\":\"" + i + " Star Level 40\",";
      data += "\"hp\":" + document.getElementById('hp' + i + 'l40').value + ",";
      data += "\"atk\":" + document.getElementById('atk' + i + 'l40').value + ",";
      data += "\"spd\":" + document.getElementById('spd' + i + 'l40').value + ",";
      data += "\"def\":" + document.getElementById('def' + i + 'l40').value + ",";
      if (i == document.getElementById('hRarity').value) {
        data += "\"res\":" + document.getElementById('res' + i + 'l40').value + "}";
      } else {
        console.log("i: " + i + " hRarity: " + document.getElementById('hRarity'));
        data += "\"res\":" + document.getElementById('res' + i + 'l40').value + "},";
      }
    }
  }
  data += "],";
  data += "\"skills\":[";
  var numSkills = document.getElementById("heroSkillsTable").getElementsByTagName("tr").length;
  for (var i = 1; i < numSkills; i++) {
    rowCells = document.getElementById("heroSkillsTable").getElementsByTagName("tr")[i].getElementsByTagName("td");
    data += "{\"name\":\"" + rowCells[0].childNodes[0].value + "\",";
    data += "\"rarity\":\"" + rowCells[1].childNodes[0].value + "\",";
    if (i == numSkills - 1) {
      data += "\"type\":\"" + rowCells[2].childNodes[0].value + "\"}";
    } else {
      data += "\"type\":\"" + rowCells[2].childNodes[0].value + "\"},";
    }
  }
  data += "],";
  data += "\"hasIV\":" + document.getElementById("hIVs").checked;
  data += "}";
  console.log(JSON.parse(data));
  //alert("Sending Hero data to database: \n" + data);
  //const client = stitch.Stitch.initializeDefaultAppClient('473pockettactician-jcxsp');
  const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('PocketTactician');
  //login with anonymous credentials (we'll change this next iteration)
  db.collection('Heroes').insertOne(JSON.parse(data))
    .then(db.collection('Heroes').find({ name: document.getElementById('hName').value }).asArray())
    .then(found => {
      //return success message to user
      if (found) {
        alert("Successfully added to collection!"),
          location.reload()
      } else {
        alert("Failed to add to collection, but no error was returned. Please check Stitch logs for more info")
      }
    })
    .catch(err => {
      //return failure message to user
      alert("Failed to add Hero, check console for details");
      console.error(err);
    });
}


function sendSkillData() {
  //alert("Send Hero Data: Doesn't work yet, sorry :(");
  var form = document.getElementById("skillForm");
  form.onsubmit = function (e) {
    e.preventDefault();

    var data = "{\"name\":\"" + document.getElementById("sName").value + "\",";
    data += "\"class\":\"" + document.getElementById("sClass").value + "\",";
    data += "\"effect\":\"" + document.getElementById("sEffect").value + "\",";
    data += "\"sp\":" + document.getElementById("sSP").value + ",";
    data += "\"inheritable\":" + document.getElementById("sCanInherit").checked;
    if (document.getElementById("sClass").value == "weapon") {
      data += ",\"color\":\"" + document.getElementById("sColor").value + "\",";
      data += "\"type\":\"" + document.getElementById("sType").value + "\",";
      data += "\"range\":";
      var type = document.getElementById("sType").value
      if (type == "melee" || type == "beast" || type == "dragon") {
        data += "1,";
      } else {
        data += "2,";
      }
      data += "\"stats\":[";
      data += document.getElementById("sHP").value + ",";
      data += document.getElementById("sAtk").value + ",";
      data += document.getElementById("sSpd").value + ",";
      data += document.getElementById("sDef").value + ",";
      data += document.getElementById("sRes").value;
      data += "]";
      if (document.getElementById("sRefineable").checked) {
        data += ",\"refines\":{";
        if (document.getElementById("sHasNewEffect").checked) {
          data += "\"neweffect\":\"" + document.getElementById("sNewEffect").value + "\",";
        }
        data += "\"type\":\"" + document.getElementById("sRefineType").value + "\",";
        data += "\"cost\":" + document.getElementById("sRefineCost").value + ",";
        data += "\"sp\":" + document.getElementById("sRefineSP").value + ",";
        data += "\"atk\":{\"stats\":[" + document.getElementById("sAtkRefineHPStat").value + ","
          + document.getElementById("sAtkRefineAtkStat").value + ","
          + document.getElementById("sAtkRefineSpdStat").value + ","
          + document.getElementById("sAtkRefineDefStat").value + ","
          + document.getElementById("sAtkRefineResStat").value + "]},";
        data += "\"spd\":{\"stats\":[" + document.getElementById("sSpdRefineHPStat").value + ","
          + document.getElementById("sSpdRefineAtkStat").value + ","
          + document.getElementById("sSpdRefineSpdStat").value + ","
          + document.getElementById("sSpdRefineDefStat").value + ","
          + document.getElementById("sSpdRefineResStat").value + "]},";
        data += "\"def\":{\"stats\":[" + document.getElementById("sDefRefineHPStat").value + ","
          + document.getElementById("sDefRefineAtkStat").value + ","
          + document.getElementById("sDefRefineSpdStat").value + ","
          + document.getElementById("sDefRefineDefStat").value + ","
          + document.getElementById("sDefRefineResStat").value + "]},";
        data += "\"res\":{\"stats\":[" + document.getElementById("sResRefineHPStat").value + ","
          + document.getElementById("sResRefineAtkStat").value + ","
          + document.getElementById("sResRefineSpdStat").value + ","
          + document.getElementById("sResRefineDefStat").value + ","
          + document.getElementById("sResRefineResStat").value + "]}";
        if (document.getElementById("sHasNewEffect").checked) {
          data += ",\"eff\":{\"stats\":[" + document.getElementById("sEffRefineHPStat").value + ","
            + document.getElementById("sEffRefineAtkStat").value + ","
            + document.getElementById("sEffRefineSpdStat").value + ","
            + document.getElementById("sEffRefineDefStat").value + ","
            + document.getElementById("sEffRefineResStat").value + "],";
          data += "\"effect\":\"" + document.getElementById("sEffRefineEffect").value + "\"}";
        }
        data += "}";
      }
      data += "}";
    } else if (document.getElementById("sClass").value == "special") {
      data += ",\"cooldown\":" + document.getElementById("sCooldown").value + "}";
    } else if (document.getElementById("sClass").value == "assist") {
      data += ",\"range\":" + document.getElementById("sRange").value + "}";
    } else {
      data += "}";
    }
    console.log("Skill Data:\n" + data);

    //const client = stitch.Stitch.initializeDefaultAppClient('473pockettactician-jcxsp');
    const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('PocketTactician');
    //login with anonymous credentials (we'll change this next iteration)//insert skill into collection
    db.collection('Skills').insertOne(JSON.parse(data))
      .then(db.collection('Skills').find({ name: document.getElementById('sName').value }).asArray())
      .then(found => {//return success message to user
        if (found) {
          alert("Successfully added to collection!"),
            location.reload()
        } else {
          alert("Failed to add to collection, but no error was returned. Please check Stitch logs for more info")
        }
      })
      .catch(err => {//return failure message to user
        alert("Failed to add Skill, check console for details"),
          console.error(err)
      });
  }
}

function showSkillSubForms() {
  const weaponForm = document.getElementById("sIsWeapon");
  const specialForm = document.getElementById("sIsSpecial");
  const skillClass = document.getElementById("sClass");
  weaponForm.style.display = "none";
  specialForm.style.display = "none";
  document.getElementById("sIsRefineable").style.display = "none";
  document.getElementById("sRefineNewEffect").style.display = "none";
  document.getElementById("sHasRange").style.display = "none";
  if (skillClass.value == "weapon") {
    weaponForm.style.display = "block";
    if (document.getElementById("sColor").value == "multicolor") {
      var s = "<option value=\"beast\">Beast</option>"
        + "<option value=\"dragon\">Dragon</option>"
        + "<option value=\"bow\">Bow</option>"
        + "<option value=\"dagger\">Dagger</option>";
    } else if (document.getElementById("sColor").value == "colorless") {
      var s = "<option value=\"staff\">Staff</option>";
    } else {
      var s = "<option value=\"melee\">Melee</option>"
        + "<option value=\"tome\">Tome</option>";
    }
    document.getElementById("sType").innerHTML = s;
    if (document.getElementById("sRefineable").checked) {
      document.getElementById("sIsRefineable").style.display = "block";
    }
    if (document.getElementById("sHasNewEffect").checked) {
      document.getElementById("sRefineNewEffect").style.display = "block";
    }
  } else if (skillClass.value == "special") {
    specialForm.style.display = "block";
  } else if (skillClass.value == "assist") {
    document.getElementById("sHasRange").style.display = "block";
  }
}

function hide() {
  document.getElementById("addHero").className = "hidden";
  document.getElementById("editHeroes").className = "hidden";
  document.getElementById("addSkill").className = "hidden";
  document.getElementById("editSkills").className = "hidden";
  document.getElementById("addStage").className = "hidden";
  document.getElementById("editStages").className = "hidden";
}
function show(id) {
  hide();
  document.getElementById(id).className = "shown";
}

window.onload = function () {
  //console.log(Stitch.defaultAppClient.auth.user);
  if (checkUserIsAdmin()) {
    show("addHero");
    genHeroStatsFields();
  } else {
    hide();
    document.getElementById("buttons").innerHTML = "You must be logged in as an administrator to view this page.";
  }

  document.getElementById("heroForm").onsubmit = sendHeroData;
  document.getElementById("hIVs").onclick = genHeroStatsFields;
  document.getElementById("hRarity").onchange = genHeroStatsFields;
}
