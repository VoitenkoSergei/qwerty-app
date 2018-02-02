(function(){
	var log = document.getElementById('upload');
	var logSub = document.getElementById('login_sub');
	var button = document.getElementById('sidebarCollapse');
	var sidebar =document.getElementById('sidebar');
	
	log.onclick =function(){
		logSub.classList.toggle('sub');
	}

	button.onclick = function(){
		sidebar.classList.toggle('active');
	}
})();