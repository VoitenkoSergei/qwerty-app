(function(){
	'use strict';
	let upload = document.getElementById('upload'),
	    log = document.getElementById('login_sub'),
	    button = document.getElementById('burger'),
	    sidebar = document.getElementById('sidebar'),
	    form = document.querySelector('#changeView > form'),
	    section = document.getElementsByTagName('section'),
	    fontSize = document.querySelector('input[name="size"]'),
	    select = document.querySelector('select[name="family"'),
	    color = document.querySelector('input[name="color"]'),
	    remove = document.querySelector('input[name="button"]'),
	    status = document.getElementById('status'),
	    error = document.getElementById('error');   
	let obj = {};

	form.onsubmit = function(e){
		e.preventDefault();
		changeFontSize(fontSize, error);
	}
	function changeFontSize(size, err){
		size = size.value.trim();
		size = parseInt(size);
		if(size>7 && size<25 && size!=null && !isNaN(size)){
			err.innerHTML='<span>Ok! Your font size: '+size+'px</span>';
			obj.fontSize = size+'px';
			stringifyObj();
			for(let i=0; i<section.length; i++){
				let elem = section[i].getElementsByTagName('p');
				for(let j=0; j<elem.length; j++){
					elem[j].style.fontSize = size+'px';
				}
			}
		}
		else err.innerHTML='<span style="color:red;">Enter coorect value please!</span>';
	}
	function changeFontFamily(select){
		let option = select.getElementsByTagName('option');
		for(let i=0; i<option.length;i++){
			option[i].value=i;
		}
	}
	select.onchange = function(){
		let index = parseInt(select.options[select.selectedIndex].value);
		let initial = document.body.style.fontFamily;
		let value;
		switch(index){
			case 1: value = 'Cardo-Regular';
			break;
			case 2: value = 'IndieFlower';
			break;
			case 3: value = 'NovaFlat';
			break;
			case 4: value = 'Courgette-Regular';
			break;
			default: value = initial;
			break;
		}
		for(let j=0; j<section.length; j++){
			section[j].style.fontFamily=value;
		}
		obj.fontFamily = value;
		stringifyObj();
	}
	function changeColorBg(color){
		color.onchange=function(){
			let index = color.value;
			document.body.style.backgroundColor = index;
		}
	}
	remove.onclick = function(){
		let item = document.getElementsByTagName('p');
		let index = item.length-1;
		let parent = item[index].parentElement;
		let newEl = document.createElement('div');
		newEl.classList.add('status');
		newEl.innerHTML='<span>This text has been deleted</span>';
		status.innerHTML='<span>Last paragraph "'+(index-1)+'" is deleted</span>';
		(index>1)?parent.replaceChild(newEl, item[index]):status.innerHTML='<span style="color:red;">All paragraphs deleted</span>';
	}
	upload.onclick = function(){
		log.classList.toggle('sub');
	}
	button.onclick = function(){
		sidebar.classList.toggle('active');
		form.classList.toggle('hide');
	}
	changeFontFamily(select);
	changeColorBg(color);

	function stringifyObj(){
		let serial = JSON.stringify(obj);
		let key = 'setting';
		localStorage.setItem('setting', serial);
	}
})();