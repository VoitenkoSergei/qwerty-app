(function(){
	'use strict';
	let form = document.getElementById('register_form'),
	    firstName = document.getElementById('firstName'),
	    lastName = document.getElementById('lastName'),
	    email = document.getElementById('email'),
	    registerLogin = document.getElementById('register_login'),
	    password = document.getElementById('register_password'),
	    confirm = document.getElementById('register_confirmation'),
	    error = document.getElementById('result');
	let day = document.getElementById('day'),
	    month = document.getElementById('month'),
	    year = document.getElementById('year');   
	let outline = registerLogin.style.outline;
	let obj = {};

	form.onsubmit = function(e){
		e.preventDefault();
		if(validateForm() && stringifyObj()){
			showError('You have successfully registered',true);
			setTimeout(function(){
				location.href = '../index.html';
			},1000);
		}
	}
	function validateForm(){
		if(!validateName(firstName, lastName))
			return false;
		if(!validateLogin(registerLogin)){
			inputError(registerLogin,false);
			return false;
		}
		if(!validatePassword(password,confirm))
			return false;
		obj.birthd = {
			day: day.value,
			month: month.options[month.selectedIndex].value,
			year: year.value
		}
		obj.email = email.value;
		parseGender();
		return true;
	}
	function inputError(input, success=true){
		if(success){
			input.style.boxShadow = 'none';
			input.style.outline = outline;
		}
		else{
			input.style.boxShadow = '0 0 0 1px red';
			input.style.outline = 'none';
		}
	}
	function showError(txt, success, element=error){
		if(success)
			element.innerHTML='<span style="color:green">'+txt+'</span>';
		else
			element.innerHTML='<span style="color:red">'+txt+'</span>';
	}
	function validateName(name, surname){
		name.value = name.value.trim();
		surname.value = surname.value.trim();
		if(name.value.length<2){
			showError('Name is short',false);
			inputError(name,false);
			inputError(surname);
			return false;
		}
		else if(surname.value.length<2){
			showError('Surname is short',false);
			inputError(surname,false);
			inputError(name);
			return false;
		}
		else if(name.value.match(/[^\A-Z]/gi)){
			showError('Name can consist only of letters A-Z',false);
			inputError(name,false);
			inputError(surname);
			return false;
		}
		else if(surname.value.match(/[^\A-Z]/gi)){
			showError('Surname can consist only of letters A-Z',false);
			inputError(surname,false);
			inputError(name);
			return false;
		}
		else{
			inputError(name);
			inputError(surname);
			obj.firstName = name.value;
			obj.lastName = surname.value;
			return true;
		}
	}
	function validateLogin(input){
		input.value = input.value.trim();
		let value = input.value;
		if(value.length<2){
			showError('The length of the value must be greater than one character',false);
			return false;
		}
		else if(value.length>20){
			showError('The length of the value must be no more than 20 characters',false);
			return false;
		}
		else if(value.match(/[^\d\A-Z\_]/gi)){
			showError('In the login you can use the symbol A-z 0-9 or "_"',false);
			return false;
		}
		else{
			obj.login = value;
			inputError(input);
			return true;
		}
	}
	function validatePassword(inputPassword, inputConfirm){
		let password = inputPassword.value;
		let confirm = inputConfirm.value;
		if(password.length<1){
			showError('Enter password',false);
			inputError(inputPassword,false);
			inputError(inputConfirm);
			return false;
		}
		else if(confirm.length<1){
			showError('Confirm password', false);
			inputError(inputConfirm,false);
			inputError(inputPassword);
			return false;
		}
		else if(password!==confirm){
			showError('Passwords do not match',false);
			inputError(inputPassword,false);
			inputError(inputConfirm,false);
			return false;
		}
		else{
			obj.password = password;
			inputError(inputPassword);
			inputError(inputConfirm);
			return true;
		}
	}
	function parseGender(){
		let gender = document.querySelectorAll('input[name="gender"]');
		for(let i=0; i<gender.length; i++){
			if(gender[i].checked) obj.gender = gender[i].value;
		}
	}
	function stringifyObj(){
		let serial = JSON.stringify(obj);
		let key = "user_";
		let count = 1;
		for(let i=0; i<localStorage.length; i++){
			let key = localStorage.key(i);
			if(key.indexOf('user_')==0){
				count++;
				let objStorage = JSON.parse(localStorage.getItem(key));
				if(obj.login === objStorage.login){
					showError('User with such login exists',false);
					inputError(registerLogin,false);
					return false
				}
			}
		}
		localStorage.setItem(key+count,serial);
		inputError(registerLogin);
		return true;
	}
})();