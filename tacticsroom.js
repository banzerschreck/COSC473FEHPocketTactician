window.onload = function () {
  //check if logged in
  if(Stitch.defaultAppClient.auth.user) {
    document.getElementById("loggedIn").className = "shown";
    document.getElementById("notLoggedIn").className = "hidden";
  } else {
    document.getElementById("loggedIn").className = "hidden";
    document.getElementById("notLoggedIn").className = "shown";
  }
  //get hero data
  fetch(heroesURL)
    .then(res => res.json())
    .then((res) => {
      console.log("Fetched Heroes list: ", res);
      heroData = res;
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
  const hero1 = document.getElementById("hero1");
  const hero2 = document.getElementById("hero2");
  const hero3 = document.getElementById("hero3");
  const hero4 = document.getElementById("hero4");
  const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('PocketTactician');
  db.collection('Users').find().asArray()
    .then(res => {
      for (i in res) {
        const yourHero1 = document.createElement("option");
        yourHero1.innerHTML = res[i].name + ": " + res[i].title;
        hero1.add(yourHero1);
        const yourHero2 = document.createElement("option");
        yourHero2.innerHTML = res[i].name + ": " + res[i].title;
        hero2.add(yourHero2);
        const yourHero3 = document.createElement("option");
        yourHero3.innerHTML = res[i].name + ": " + res[i].title;
        hero3.add(yourHero3);
        const yourHero4 = document.createElement("option");
        yourHero4.innerHTML = res[i].name + ": " + res[i].title;
        hero4.add(yourHero4);
      }
    });
}