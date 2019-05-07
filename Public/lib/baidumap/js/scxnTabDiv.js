var scxnlabeldiv;
var showdetail = false;
function ScxnLabelDiv(icon,title, image, content,tabarr,tabinfocall) {
    this._icon = icon;
	this._title = title;
    this._image = image;
    this._content = content;
	this._tabarr = tabarr;
	this._tabinfocall = tabinfocall;
	this._maindiv = document.createElement("div");
	this._icondiv = document.createElement("div");
	this._titlediv = document.createElement("div");
	this._closediv = document.createElement("div");
	this._imagediv = document.createElement("div");
	this._contentdiv = document.createElement("div");
	this._tabmaindiv = document.createElement("div");
	this._tabdiv = document.createElement("div");
	this._showhidediv = document.createElement("div");
	this._tabinfodiv = document.createElement("div");

	this.seletetab = 0;
	this.tab_class = 'a10 wrap';
	var that = this;
	scxnlabeldiv = this;
	
	this.getdiv = function(){
		return that._maindiv;
	}
	//init style
	this._maindiv.setAttribute("style","width:420px;min-height:190px;BACKGROUND: #f0f6f9;BORDER: #b7c5d9 1px solid;background-image:url('images/showDivBgImage.png');background-repeat:no-repeat;background-position: -1px -1px;");
	this._icondiv.setAttribute("style","width:30px;height:30px;padding:5px 5px 5px 5px;float:left;");
	this._titlediv.setAttribute("style","width:320px;height:30px;text-align:center;padding:10px 5px 5px 5px;float:left;");
	this._closediv.setAttribute("style","width:40px;height:30px;text-align:center;padding:10px 5px 5px 5px;float:left;CURSOR: hand;");
	this._imagediv.setAttribute("style","width:100px;height:130px;text-align:center;float:left;BORDER-bottom: #b7c5d9 1px solid;");
	this._contentdiv.setAttribute("style","width:320px;height:130px;text-align:center;float:left;BORDER-bottom: #b7c5d9 1px solid;");
	this._showhidediv.setAttribute("style","width:75px;height:30px;display:inline;text-align:right;float:right;line-height:30px;");
	this._tabmaindiv.setAttribute("class","");
	this._tabmaindiv.setAttribute("style","");
	this._tabdiv.setAttribute("class","md-head");
	this._tabdiv.setAttribute("style","display:none;float:left;width:345px;height:30px;");
	this._tabinfodiv.setAttribute("class","md-body");
	this._tabinfodiv.setAttribute("style","width:420px;padding:0;display:none;");
	//init content
	this._icondiv.innerHTML = "<img src="+icon+" width='25px' height='25px'/>";
	this._titlediv.innerHTML = "<font style='color:#fff;'><b>"+title+"</b></font>";
	this._closediv.innerHTML =  "<img src='images/iw_close1d3.gif'/>";
	this._imagediv.innerHTML = "<img src='"+image+"' width='100px' height='130px'/>";
	this._contentdiv.innerHTML = content;
	this._showhidediv.innerHTML = "<a class='a10' href='javascript:;'>ÏêÏ¸</a>";
	if(tabarr){
		for(var i=0;i<tabarr.length;i++){
			this._tabdiv.innerHTML += "<A class='a10 wrap' hideFocus onClick='tabclick("+i+");return false;' href='javascript:;'>"+getTabName(tabarr[i])+"</A>";
		}
		tabclick(0);
	}
	this._maindiv.appendChild(this._icondiv);
	this._maindiv.appendChild(this._titlediv);
	this._maindiv.appendChild(this._closediv);
	this._maindiv.appendChild(this._imagediv);
	this._maindiv.appendChild(this._contentdiv);
	this._tabmaindiv.appendChild(this._tabdiv);
	this._tabmaindiv.appendChild(this._showhidediv);
	this._tabmaindiv.appendChild(this._tabinfodiv);
	this._maindiv.appendChild(this._tabmaindiv);
	//init handler
	this._closediv.setAttribute("onClick","hidemain()");
	this._showhidediv.setAttribute("onClick","changeShowHide(this)");
	
}
//function
	function getTabName(name){
		if(name.length>3){
			return name.substr(0,2)+"..";
		}
		return name;
	}
	function hidemain(){
		scxnlabeldiv._maindiv.style.display='none';
		showdetail = true;
		changeShowHide(scxnlabeldiv._showhidediv);
	}
	function setTabinfo(divhtml){
		scxnlabeldiv._tabinfodiv.innerHTML = divhtml;
	}
	function tabclick(index){
		if(index!=null&&index<scxnlabeldiv._tabarr.length){
			var st = scxnlabeldiv.seletetab;
			var tablist = scxnlabeldiv._tabdiv.getElementsByTagName('a');
			tablist[st].className = scxnlabeldiv.tab_class;
			tablist[st].innerHTML = getTabName(scxnlabeldiv._tabarr[st]);
			tablist[index].className = scxnlabeldiv.tab_class + ' cur wid';
			tablist[index].innerHTML = scxnlabeldiv._tabarr[index];
			scxnlabeldiv.seletetab = index;
			scxnlabeldiv._tabinfocall(index,setTabinfo);
		}
	}
	function changeShowHide(div){
		showdetail = !showdetail;
		if(showdetail){
			div.innerHTML = "<a class='a10' href='javascript:;'>Òþ²Ø</a>";
			scxnlabeldiv._tabdiv.style.display = "block";
			scxnlabeldiv._tabinfodiv.style.display = "block";
		}else{
			div.innerHTML = "<a class='a10' href='javascript:;'>ÏêÏ¸</a>";
			scxnlabeldiv._tabdiv.style.display = "none";
			scxnlabeldiv._tabinfodiv.style.display = "none";
		}
	}
