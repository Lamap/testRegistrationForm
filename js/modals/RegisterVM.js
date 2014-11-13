define(["jquery", "ko"], function($, ko) {
	return function createRegisterVM() {
		var SELECT_NATION_CAPTION = "Select nationality";
		var SAVED_CAPTION = "Saved";
		var SEND_BUTTON_CAPTION = "Sign up";
		var sendButtonCaption = ko.observable(SEND_BUTTON_CAPTION);
		
		var passwordOnFocus = ko.observable(false);
		var inputs = {
			name: {
				value: ko.observable(),
				validState: ko.observable(false)
			},
			email: {
				value: ko.observable(),
				validState: ko.observable(false)
			},
			password: {
				value: ko.observable(),
				validState: ko.observable(false),
				focused: ko.observable(true)
			},
			passwordCheck: {
				value: ko.observable(),
				validState: ko.observable(false)
			},
			birth: {
				value: ko.observable(),
				validState: ko.observable(false)
			},
			nationality: {
				value: ko.observable(SELECT_NATION_CAPTION),
				validState: ko.observable(false)
			},
		};
		var nationalities = ko.observableArray([
			SELECT_NATION_CAPTION,
			"Hungarian",
			"Dutch",
			"Czech"
		]);
		
		var canSend = ko.computed(function()  {
			var nameValid = inputs.name.validState();
			var emailValid = inputs.email.validState();
			var passwValid = inputs.password.validState();
			var passw2Valid = inputs.passwordCheck.validState();
			var birthValid = inputs.birth.validState();
			var natValid = inputs.nationality.validState();
			
			return nameValid && emailValid && passwValid && passw2Valid && birthValid && natValid;
		});
		
		var checkName = ko.computed(function() {
			var val = inputs.name.value();
			if(!val) {
				return false;
			}
			var state = val.length > 4;
			inputs.name.validState(state);		
			return state;
		});
		var checkEmail = ko.computed(function() {
			var val = inputs.email.value();
			if(!val) {
				return false;
			}
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			var state = re.test(val);
			inputs.email.validState(state);		
			return state;
		});
		var checkPassword = ko.computed(function() {
			var val = inputs.password.value();
			if(!val) {
				inputs.password.validState(false);
				return 0;
			}
			
			var state = 0;
			
			if(val.length > 4) {
				state = 1;
			}
			var hasNumbers = /\d/;
			var hasLowerUpper = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
			if(hasNumbers.test(val) && hasLowerUpper.test(val)) {
				state = 2;
			}
			var hasSpecielChar = /[^a-zA-Z0-9]/;
			if(hasSpecielChar.test(val) && val.length > 7) {
				state = 3;
			}
			
			inputs.password.validState(state);		
			return state;
		});
		var comparePassword = ko.computed(function() {
			var val = inputs.passwordCheck.value();
			if(!val) {
				return false;
			}
			var valToCompare = inputs.password.value();
			var state = val === valToCompare;
			inputs.passwordCheck.validState(state);		
			return state;
		});
		var checkBirth = ko.computed(function() {
			var val = inputs.birth.value();
			if(!val) {
				return false;
			}
			val = val.replace(/\s+/g, "");
			var state = false;
			var parts = val.split("/");
			if(parts.length !== 3) {
				inputs.birth.validState(false);		
				return false;
			}
			var year = parseInt(parts[0], 10);
			var month = parseInt(parts[1], 10);
			var day = parseInt(parts[2], 10);
			var thisYear = new Date().getFullYear();
			
			state = (year < thisYear && year > 1910);		
			state = (month > 0 && month < 13);	
			state = (day > 0 && day < 32);
			
			inputs.birth.validState(state);		
			return state;
		});
		var checkNation = ko.computed(function() {
			var val = inputs.nationality.value();
			if(!val) {
				return false;
			}
			var state = val !== SELECT_NATION_CAPTION;
			inputs.nationality.validState(state);		
			return state;
		});
		

		
		function send() {
			if(!canSend || sendButtonCaption() === SAVED_CAPTION) {
				return false;
			}
			var data = {
				name: inputs.name.value(),
				email: inputs.email.value(),
				password: inputs.password.value(),
				birth: inputs.birth.value(),
				nationality: inputs.nationality.value() 
			};
			$.ajax({
				url: "routes/registration.php",
				data: data,
				type: "POST"
			}).always(feedBackArrived);
		}
		
		
		function feedBackArrived(data) {
			// only temp hack for local testing:
			try {
				data = JSON.parse(data);
			} catch(err) {
				
			}
			
			if(!data.registrationSaved) {
				var err = data.status;
				return window.alert("There is some problem with saving your data: " + err + ". Please try again later.");
			}
			sendButtonCaption(SAVED_CAPTION);
		}
		
		function init() {
			console.log("Register modal initialized");
		}

		return {
			init: init,
			
			inputs: inputs,
			nationalities: nationalities,
			send: send,
			canSend: canSend,
			sendButtonCaption: sendButtonCaption,
			
			passwordOnFocus: passwordOnFocus
		};
	};
});