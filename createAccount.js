import Stitch from "mongodb-stitch-browser-sdk";

let appId = "<473pockettactician-jcxsp>";

const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

EmailPassClient.registerWithEmail("<user-email>", "<user-password>").then(() => {
    console.log("Successfully sent account confirmation email");
})
.catch(err => {
    console.log("Error registering new user:", err);
});