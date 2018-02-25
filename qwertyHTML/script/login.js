(function(){
	'use strict';
	let formLog = document.querySelector('#login_sub > form'),
	    authLogin = document.getElementById('auth_login'),
	    authPassword = document.getElementById('auth_password'),
	    subLogin = document.getElementById('login_sub'),
	    errLogin = document.getElementById('errLogin');
	let login = document.getElementById('login'),
	    logout = document.getElementById('logout'),
	    out = document.getElementById('out'),
	    span = document.createElement('span');
	let objStorage;
	let objStatus;

	formLog.onsubmit = function(e){
		e.preventDefault();
		if(compare()){
			objStatus = {status:true};
			let serial = JSON.stringify(objStatus);
			localStorage.setItem('status',serial);
			showError('Ok, successfully entered the system',true);
			showSideBar()
			setTimeout(closeLogin,1000);
		}
	}
	function compare(){
		if(!compareLogin(authLogin,authPassword))
			return false;
		return true;
	}
	function showError(txt, success, element=errLogin){
		if(success)
			element.innerHTML='<span style="color:green">'+txt+'</span>';
		else
			element.innerHTML='<span style="color:red">'+txt+'</span>';
	}
	function compareLogin(login,password){
		if(localStorage.length>0){
			for(let i=0; i<localStorage.length; i++){
				let key=localStorage.key(i);
				if(key.indexOf('user_')==0){
					objStorage = JSON.parse(localStorage.getItem(key));
					if(objStorage.login==login.value && objStorage.password==password.value){
						let user = JSON.stringify(objStorage);
						localStorage.setItem('currentUser', user)
						renderName();
						return true;
					}
					else{
						showError('Login or Password do not match',false);
					}
				}
			}
		}
		else{
			showError('Your not a registered user. Press Register!',false);
			return false;
		}
	}
	function showSideBar(){
		document.getElementById('burger').style.visibility='visible';
		document.getElementById('sidebar').style.display='block'; 
	}
	function hideSidebar(){
		document.getElementById('burger').style.visibility='hidden';
		document.getElementById('sidebar').style.display='none'; 
	}
	function closeLogin(){
		subLogin.classList.toggle('sub');
	}
	function renderName(user = 'currentUser'){
		objStorage = JSON.parse(localStorage.getItem(user));
		span.style.color = 'gray';
		span.innerHTML ='Hello: <b style="color:orange">'+objStorage.firstName+' '+objStorage.lastName+'</b>';
		logout.appendChild(span);
		logout.style.display = 'block';
		login.style.display = 'none';
	}
	function renderLogout(){
		logout.style.display = 'none';
		login.style.display = 'block';
	}
	function renderSetting(key = 'setting'){
		let setting = JSON.parse(localStorage.getItem(key));
		let section = document.getElementsByTagName('section');
		if(setting!==null){
			for(let i=0; i<section.length; i++){
				let elem = section[i].getElementsByTagName('p');
				section[i].style.fontFamily=setting.fontFamily;
				for(let j=0; j<elem.length; j++){
					elem[j].style.fontSize = setting.fontSize;
				}
			}
		}
		return;
	}
	function renderStatus(){
		if(localStorage.status){
			let obj = JSON.parse(localStorage.getItem('status'));
			if(obj.status){
				showSideBar();
				renderName();
				renderSetting();
			}
			else{
				hideSidebar();
				renderLogout();
				localStorage.removeItem('setting');
			}
		}
	}	
	out.onclick = function(){
		objStatus = {status:false};
		let serial = JSON.stringify(objStatus);
		localStorage.setItem('status',serial);
		location.reload();
		renderStatus();
	}	
	renderStatus();
})();