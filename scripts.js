const heroesURL = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/473pockettactician-jcxsp/service/http/incoming_webhook/getHeroes';
const skillsURL = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/473pockettactician-jcxsp/service/http/incoming_webhook/getSkills';
const APP_ID = "473pockettactician-jcxsp";

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

//===========================navbar stuff===============================================
function toggleLogin() {
  var floatingLogin = document.getElementById("floatingLogin");
  if (floatingLogin.className == "shown") {
    floatingLogin.className = "hidden";
  } else if(floatingLogin.className == "hidden") {
   floatingLogin.className = "shown";
  }
}