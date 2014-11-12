require.config({
	paths: {
		"jquery": "libs/jquery-2.1.1.min",
		"ko" : "libs/knockout-3.2.0",
		"infuser" : "libs/infuser-amd",
		"koext" : "libs/koExternalTemplateEngine-amd",
		"trafficCop" : "libs/TrafficCop"
	},
	waitSeconds : 15
});

require(["jquery", "ko", "trafficCop", "infuser", "modals/RegisterVM"], function($, ko, trafficCop, infuser, createRegisterVM) {
	var mainApp = {
		modals: {
			register: ko.observable(null)
		}
	};
	
	 if(!window.console) {
        window.console  = {log: function(){}};
    }
	
	require(["trafficCop"], function() {
		require(["infuser", "koext"], function(infuser, koext){
			infuser.defaults.templateUrl= "templates";
			$(document).ready(function(){
				ko.applyBindings(mainApp);
				mainApp.modals.register(createRegisterVM());
			});
		});
	});
});