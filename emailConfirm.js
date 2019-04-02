import Stitch from "mongodb-stitch-browser-sdk";

Stitch.initializeDefaultAppClient("<473pockettactician-jcxsp>");
//Parse the URL query parameters
const url = window.location.search;
const params = new URLSearchParams(url);
const token = params.get('token');
const tokenId = params.get('tokenId');

// Confirm the user's email/password account
const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

return emailPassClient.confirmUser(token, tokenId);