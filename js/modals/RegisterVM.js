define(["jquery", "ko"], function($, ko) {
	return function createRegisterVM() {
		var SELECT_NATION_CAPTION = "Select nationality";
		var sendButtonCaption = ko.observable("Sign up");
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
				return false;
			}
			
			var state = 0;
			
			if(val.length > 2) {
				state = 1;
			}
			var hasNumbers = /\d/;
			var hasLowerUpper = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
			if(hasNumbers.test(val) && hasLowerUpper.test(val)) {
				state = 2;
			}
			var hasSpecielChar = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
			if(hasSpecielChar.test(val) && val.length > 7) {
				stat = 3;
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
		var compareBirth = ko.computed(function() {
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
			var year = parts[0].parseInt(10);
			var month = parts[1].parseInt(10);
			var day = parts[2].parseInt(10);
			
			if(year < thisYear && year > 1910) {
				state = true;
			}
			if(month > 0 && month < 13) {
				state = true;
			} else {
				state = false;
			}
			
			if(day > 0 && day < 32) {
				state = true;
			} else {
				state = false;
			}
			
			inputs.birth.validState(state);		
			return state;
		});
		var checkNation = ko.computed(function() {
			if(!val) {
				return false;
			}
			var val = inputs.nation.value();
			var state = val !== SELECT_NATION_CAPTION;
			inputs.nation.validState(state);		
			return state;
		});
		

		
		function send() {
			
		}
		
		
		function feedBackArrived(data) {
			
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
			sendButtonCaption: sendButtonCaption
		};
	};
});