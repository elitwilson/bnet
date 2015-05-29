BNet = {};
BNet.requestCredential = function (options, credentialRequestCompleteCallback) {
	// support both (options, callback) and (callback).
	if (!credentialRequestCompleteCallback && typeof options === 'function') {
		credentialRequestCompleteCallback = options;
		options = {};
	} else if (!options) {
		options = {};
	}

	var config = ServiceConfiguration.configurations.findOne({service: 'bnet'});
	if (!config) {
		credentialRequestCompleteCallback && credentialRequestCompleteCallback(
			new ServiceConfiguration.ConfigError());
		return;		
	}

	var state = 's89234uinga9asasdf823523'; // BNet says state should be a reasonably random token. Implement this later?

	var loginUrl =
		'https://us.battle.net/login/oauth/authorize' +
		'?client_id=' + config.clientId +
		'&scope=' + 'wow.profile' +
		'&redirect_uri=' + 'localhost:3000' +
		'&state=' + state;
	console.log(loginUrl);

	OAuth.launchLogin({
		loginService: "bnet",
		loginStyle: loginStyle,
		loginUrl: loginUrl,
		credentialRequestCompleteCallback: credentialRequestCompleteCallback,
		credentialToken: credentialToken,
		popupOptions: {width: 900, height: 450}
	});
};
