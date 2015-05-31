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

//https://us.battle.net/oauth/authorize?scope=wow.profile&response_type=code&redirect_uri=http://localhost:3000&state=s89234uinga9asasdf823523&client_id=kpvryrqwnhgjxbn5ys4adtb8vbqvsfz7
//https://us.battle.net/oauth/authorize?scope=wow.profile&response_type=code&redirect_uri=https%3A%2F%2Fwww.wowhead.com%2Faccount%3Dbattlenet&state=00KuPZ-QQogSR9NQtQ6RYHfJ7_rQbCxH6F&client_id=cs4ed6e7eju22q7pfd4erzkxs2vqzwzg
	var state = 's89234uinga9asasdf823523'; // BNet says state should be a reasonably random token. Implement this later?
	var loginUrl =
		'https://us.battle.net/oauth/authorize' +
		'?scope=' + 'wow.profile' +
		'&response_type=' + 'code' +
		'&redirect_uri=' + 'https://bnet.meteor.com' + //Battle.net requires https
		//'&redirect_uri=' + 'https://dev.battle.net/' +
		'&state=' + state +
		'&client_id=' + config.clientId;
		
	OAuth.launchLogin({
		loginService: "bnet",
		loginStyle: OAuth._loginStyle('bnet', config, options),
		loginUrl: loginUrl,
		credentialRequestCompleteCallback: credentialRequestCompleteCallback,
		credentialToken: '123', //This is supposed to be something random I think
		popupOptions: {width: 900, height: 450}
	});
};
