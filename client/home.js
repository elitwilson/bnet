

Template.home.helpers({
	test: function() {
		console.log(Accounts.loginServicesConfigured());
		return;
	}
});

Template.home.events({
	"click #signIn": function() {
		options = {loginStyle: 'redirect'};
		Meteor.loginWithBNet(options, function(res) {
			console.log(res);
		}); //ToDo
	}
});