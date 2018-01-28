(function(){
	var log = document.getElementById('upload');
	var logSub = document.getElementById('login_sub');
	console.log(log); 
	console.log(logSub);
	log.onclick =function(){
		logSub.classList.toggle('sub');
	}
})();