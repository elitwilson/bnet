BNet = {};

// Need to figure out a way to determine region of user requesting data
// Just hardcoding "us" for testing.
var region = "us";


var getTokenResponse = function (query) {
	var config = ServiceConfiguration.configurations.findOne({ service: 'bnet'});
	if (!config)
		throw new ServiceConfiguration.ConfigError();
	console.log('ServiceConfiguration.configurations object: ')
	console.log(config);

	var responseContent;
	try {

		//Request access token
		responseContent = HTTP.post(
			"https://" + region + ".battle.net/oauth/authorize", {
				params: {
					client_id: config.clientId,
					scope: 'wow.profile', //no idea if this is right
					state: 'lina097235hsgl',
					redirect_uri: 'localhost:3000',
					response_type: 'code' // For the authorization code server flow, this should be code(???)
				}
			}
		).content;
		console.log(responseContent);

		/*
		Params(?):
		client_id		The client id given to you upon registration.
		scope			The space separated scope values you wish to request from the player.
		state			A semi-random data blob to be sent back along with the player when completing authorization.
		redirect_uri	The location to redirect the user to. Should either be https://localhost for testing or the redirect_uri configured when signing up.
		response_type	The code type being requested. For the authorization code server flow, this should be code
		*/

	} catch(err) {
		throw _.extend(new Error("Failed to complete OAuth handshake with BNet. " + err.message),
	                   {response: err.response});
	}

	//Success!
};

OAuth.registerService('bnet', 2, null, function(query) {
	var response; //ToDo
	var accessToken; //ToDo
	var identity; //ToDo

	var x = ServiceConfiguration.configurations.upsert(
		{ service: "bnet" },
		{ $set: { clientId: "kpvryrqwnhgjxbn5ys4adtb8vbqvsfz7", secret: "dcBStpG4CuZT6rsXvPjJWrEXWduW5jbF" } }
	);

	console.log(x);

});

/*
	NOTES: (From BNet API documentation)
	- Tokens last for 30 days. Always check the response and request a new access token if your current one fails to work.
	- Understand that the only time the client secret 
		should be sent to us is as part of exchanging the authorization 
		code for an access token, and should always be sent as part of a POST operation
*/