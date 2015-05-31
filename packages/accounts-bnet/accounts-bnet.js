Accounts.oauth.registerService('bnet');

if (Meteor.isClient) {
	Meteor.loginWithBNet = function(options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }
  	var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    console.log(credentialRequestCompleteCallback);
    BNet.requestCredential(options, credentialRequestCompleteCallback);
	};
} else {
	Accounts.addAutopublishFields({
		//ToDo
	});
}