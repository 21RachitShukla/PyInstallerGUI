class GUICtrl{
	constructor(e){
		this.languagePack = '';
	}

	newBtn(id, actType){
		var btnId = id + '_' + actType + 'Btn';
		var btnParent = document.getElementById(id + '_option');
		var btn = document.createElement("div");
		btn.setAttribute("id", btnId);
		btn.setAttribute("class", "cBtn");
		switch(actType){
			case 'add':
				btn.innerHTML = '+';
				btn.style.color = 'rgb(33, 215, 137)';
				btn.onclick= function(){ getPath(id, actType) };
				break;
			case 'del':
				btn.innerHTML = '&#10799';
				btn.style.color = 'rgb(255, 0, 0)';
				btn.onclick= function(){ delPath(id) };
				break;
			case 'edit':
				btn.innerHTML = '&#9998';
				btn.style.color = 'rgb(248, 198, 57)';
				btn.onclick= function(){ getPath(id, actType) };
				break;
		}
		btnParent.appendChild(btn);
	}

	reLayout(id, action){
		var dom = new DOMCtrl();
		var idGroup = id.split('_')[0];
		this._layoutBtn(id, action);
		if( idGroup=='iImportPath' || idGroup=='iDataPath' || idGroup=='iFolderPath' ){
			var frameId = id.split('_')[0] + '_' + 0;
			if( action=='add'){
    			var timeInMilliseconds = new Date();
    			var UID = timeInMilliseconds.getTime();
    			var newId = idGroup + '_' + UID;
				dom.createPath(frameId+'_list', newId);
				dom.createOption(frameId+'_list', newId);
	        	this.newBtn(newId, 'add');
			}else if( action=='del' ){
				document.getElementById(frameId + '_list').removeChild(document.getElementById(id + '_path'));
				document.getElementById(frameId + '_list').removeChild(document.getElementById(id + '_option'));
			}
		}
	}

	showInfo(InfoType, id, languagePack){
		this._showFrame(InfoType);
		this._showContent(InfoType, id, languagePack);
	}

	hideInfo(){
		document.getElementById('iInfoFrame').classList.add('hideTranslate');
	}

	_showFrame(InfoType){
		var colorStyle = '';
		switch(InfoType){
			case 'tips':
				colorStyle = 'rgb(214, 163, 7)';
				break;

			case 'error':
				colorStyle = 'rgb(255, 0, 0)';
				break;

			case 'about':
				colorStyle = 'rgb(28, 179, 115)';
				break;
		}
		document.getElementById('iInfo').style.color = colorStyle;
		document.getElementById('iInfo').style.border = '5px solid ' + colorStyle;
		document.getElementById('iInfoTitle').style.color = colorStyle;
		document.getElementById('iInfoTitle').style.border = '5px solid ' + colorStyle;
		document.getElementById('iInfoTitle').style.borderBottom = 'none';
		document.getElementById('iInfoFrame').classList.remove('hideTranslate');
		document.getElementById('iInfoFrame').style.display = 'inline-block';
	}

	_showContent(InfoType, id, languagePack){
		switch(InfoType){
			case 'tips':
				this._showTips(id, languagePack);
				break;

			case 'error':
				this._showError(id, languagePack);
				break;

			case 'about':
				this._showAbout(languagePack);
				break;
		}
	}

	_showTips(id, languagePack){
		document.getElementById('iInfoTitle').innerHTML = languagePack['content_iInfoTitle_tips'];
		var idGroup = id.split('_')[0];
		var tips = '';
		switch(idGroup){
			case 'iMainPath':
				tips = languagePack['content_iMainPath_tips'];
				break;
			case 'iImportPath':
				tips = languagePack['content_iImportPath_tips'];
				break;
			case 'iDataPath':
				tips = languagePack['content_iDataPath_tips'];
				break;
			case 'iFolderPath':
				tips = languagePack['content_iFolderPath_tips'];
				break;
			case 'iAdvanced':
				tips = languagePack['content_iAdvanced'];
				break;
		}
		document.getElementById('iInfo').innerHTML = tips;
	}

	_showError(msg, languagePack){
		document.getElementById('iInfoTitle').innerHTML = languagePack['content_iInfoTitle_error'];
		switch(msg){
			case 'noMainPath':
				document.getElementById('iInfo').innerHTML = languagePack['content_noMainPath'];
				break;

			case 'overLapping':
				document.getElementById('iInfo').innerHTML = languagePack['content_overLapping'];
				break;
		}
		$('#iInfoFrame').effect('shake', { times:3, distance:5 }, 50);
	}

	_showAbout(infoData){
		document.getElementById('iInfoTitle').innerHTML = infoData[0];
		document.getElementById('iInfo').innerHTML = infoData[1];
	}

	_layoutBtn(id, action){
		this._clrAllBtn(id);
		if( action=='add' || action=='edit' ){
        	this.newBtn(id, 'del');
        	this.newBtn(id, 'edit');
		}else if( action=='del' ){
			this.newBtn(id, 'add');
		}
	}

	_clrAllBtn(id){
		if( document.getElementById(id + '_option') ){
			document.getElementById(id + '_option').innerHTML = '';
		}
	}
}
