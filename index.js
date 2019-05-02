window.onload = checkLoggedIn;

function checkLoggedIn() {
  if (!Stitch.defaultAppClient.auth.user) {//user is not logged in
    document.getElementById("indexLogin").className = "shown";
    document.getElementById("navbarLogin").className = "shown";
    document.getElementById("admin").className = "hidden";
    document.getElementById("manageHeroes").className = "hidden";
    document.getElementById("navbarLogout").className = "hidden";
    document.getElementById("tacticsRoom").className = "hidden";
    document.getElementById("navbarAdminLoggedIn").className = "hidden";
    document.getElementById("navbarLoggedInTactics").className = "hidden";
    document.getElementById("navbarLoggedInManage").className = "hidden";

  } else {//user is logged in
    if (!checkUserIsAdmin()) {//user is logged in, but not an admin
      document.getElementById("admin").className = "hidden";
      document.getElementById("navbarAdminLoggedIn").className = "hidden";
    } else {
      document.getElementById("admin").className = "shown items";
      document.getElementById("navbarAdminLoggedIn").className = "shown, navbar";
    }
    document.getElementById("manageHeroes").className = "shown items";
    document.getElementById("navbarLogout").className = "shown";
    document.getElementById("tacticsRoom").className = "shown items";
    document.getElementById("indexLogin").className = "hidden";
    document.getElementById("navbarLogin").className = "hidden";
    document.getElementById("floatingLogin").className = "hidden";
    document.getElementById("navbarLogoutAnchor").innerHTML = "Log out of " + Stitch.defaultAppClient.auth.user.profile.data.email;
    document.getElementById("navbarLoggedInTactics").className = "shown, navbar";
    document.getElementById("navbarLoggedInManage").className = "shown, navbar";

    //console.log(Stitch.defaultAppClient.auth.user);
  }
  
  document.getElementById("navbarLogout").addEventListener("click", logout);
  document.getElementById("navbarLogin").addEventListener("click", toggleLogin);
  //document.getElementById("floatingLogin").addEventListener("submit", login(flEmail.value, flPassword.value));
}