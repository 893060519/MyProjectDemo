
var _setTabinfo;
var _flashparacall;
var _currTabId;
var _currTabIndex;
var _tabarr;
var _startDate;
var _endDate;
//var _tabId;//tabbar所属对象id
//得到自定义Label的内容展示
function getScxnLabelClickDiv(id, icon, title, image, content, tabarr, flashparacall) {
    //id:操作对象的id;tab:点击的tabbar;setTabinfo:设置tabbar显示的内容
	_flashparacall = flashparacall;
	_tabarr = tabarr;
	_currTabId = id;
    var tabinfocall = function(index, setTabinfo) {
		_setTabinfo = setTabinfo;
		_currTabIndex = index;
		_startDate=formatDate(getDate('d',-1));
		_endDate=formatDate(getDate());
		
		if(_tabarr[_currTabIndex].name=="断面图"){
			_startDate=formatDate(getDate());
		}
		//_flashparacall(_tabarr[_currTabIndex],_startDate,_endDate);
        //setTabinfo(getFlashHtml(tabarr[index].swfUrl, flashparacall(id, tabarr[index],formatDate(getDate('d',-1)),formatDate(getDate())), 400, 200));
		//setTimeout('refreshTabinfo(formatDate(getDate("d",-4)),formatDate(getDate()));',3000);
		
    };
	var tabarrs = new Array();
	for(var i = 0;i<tabarr.length;i++){
		tabarrs.push(tabarr[i].name);
	}
    var d = new ScxnLabelDiv(icon, title, image, content, tabarrs, tabinfocall).getdiv();

    return d;
}
function getLabelValue(id){
	var type = getTypeId('水文站');
	var dataInfos = dataMap.get(type);
	for(var i=0;i<dataInfos.length;i++){
		if(dataInfos[i].id==id){
			var sct = dataInfos[i].simpleContent;
			var ct = dataInfos[i].content;
			var unit = getUnitByType(type);
			return ct.substring(sct.length+1,ct.indexOf(unit));
		}
	}
}

//设置tabbar内容
function setTabbarInfo(para){
	var mpd = getDataPointMap().get(_currTabId);
	var tbb = mpd.tabbars[_currTabIndex];
	var unit = tbb.unit.split(",");
	var chartUnit = tbb.chartUnit.split(",");
	var chartType = tbb.chartType.split(",");
	var left = "";
	var right = "";
	if(unit.length==2){
		left = "left,linear,"+chartUnit[0]+","+unit[0]+","+chartType[0]+",v1";
		right = "@right,linear,"+chartUnit[1]+","+unit[1]+","+chartType[1]+",v2";
	}else{
		
		left = "left,linear,"+chartUnit.join("#")+","+unit[0]+","+chartType.join("#")+","+chartUnit.join("#");
	}
	var p;
	if(para!="")
	{
		 p = mpd.title+";"+_startDate+","+_endDate+";"+left+right+";bottom,datatime,时间,(小时),tm;100,0,20@100,0,20@2014-01-04 17:00:00,2014-01-03 17:00:00,4;"+para[0];
	}else{
		 p = mpd.title+";"+_startDate+","+_endDate+";"+left+right+";bottom,datatime,时间,(小时),tm;100,0,20@100,0,20@2014-01-04 17:00:00,2014-01-03 17:00:00,4;";
	}
	_setTabinfo(getFlashHtml(_tabarr[_currTabIndex].swfUrl, p, 420, 210));
}

//得到河道展示的div
function getStreamClickDiv(content) {
    var d = document.createElement("div");
	d.setAttribute("style","white-space:nowrap;color:#ffffff;font-size:10;width:125px;height:28px;text-align:center;background:url('images/tishikuang.png') repeat;padding:10px 27px 10px 28px;");
	d.innerHTML = content;
    return d;
}
//得到flash对象
function getFlashHtml(src, content, width, height) {
    var flash = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='" + width + "' height='" + height + "' id='flexChartObject' align='middle'> <param name='allowScriptAccess' value='sameDomain' /> <param name='allowFullScreen' value='false' /> <PARAM NAME='flashvars' VALUE='"+content+"'> <param name='movie' value='"+src+"' /><param name='quality' value='high' /><param name='bgcolor' value='#ffffff' />	<embed src='"+src+"' mce_src='" + src + "' flashvars='" + content + "' quality='high' bgcolor='#ffffff' width='"+width+"' height='"+height+"' id='flexChartEmbed' align='middle' allowScriptAccess='sameDomain' allowFullScreen='false' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' /> </object> ";
    return flash;
}
//刷新图形
function refreshTabinfo(startDate,endDate){
	if(_setTabinfo&&_flashparacall&&_currTabIndex!=null&&_tabarr){
		_startDate = startDate;
		_endDate = endDate;
		_flashparacall(_tabarr[_currTabIndex],startDate,endDate);
		//_setTabinfo(getFlashHtml(_tabarr[_currTabIndex].swfUrl, _flashparacall(_currTabId, _tabarr[_currTabIndex],startDate,endDate), 400, 200));
	}
}
//得到时间
function getDate(strInterval, nb) {   
    var dtTmp = new Date();
	if(strInterval!=null&&nb!=null){
		switch (strInterval) {   
			case 's' :return new Date(dtTmp.getTime() + (1000 * nb));  
			case 'n' :return new Date(dtTmp.getTime() + (1000 * nb * 60));  
			case 'h' :return new Date(dtTmp.getTime() + (1000 * nb * 60 * 60));  
			case 'd' :return new Date(dtTmp.getTime() + (1000 * nb * 60 * 60 * 24));  
			case 'w' :return new Date(dtTmp.getTime() + (1000 * nb * 60 * 60 * 24 * 7));  
			case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + nb*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
			case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + nb, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
			case 'y' :return new Date((dtTmp.getFullYear() + nb), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
		} 
	}
	return dtTmp;
}  
function formatDate(dt){
	if(dt instanceof Date){
		var y = dt.getFullYear();
		var m = (dt.getMonth()+1)>9?(dt.getMonth()+1):"0"+(dt.getMonth()+1);
		var d = dt.getDate()>9?dt.getDate():"0"+dt.getDate();
		var hh = dt.getHours(); //截取小时 
		var mm = dt.getMinutes(); //截取分钟
		
		return y+"-"+m+"-"+d+" "+hh+":"+mm;
	}
}
//调用Flex的方法,返回方法返回值
function callFlex(id,call,para){
	if(id==null||call==null||(document.getElementById(id+"Object")==null&&document.getElementById(id+"Embed")==null)){
		alert("错误,没有找到flash对象,请重试."+id+","+call);
		return "";
	}
	if(call in document.getElementById(id+"Object")){
		if(para==null){
			return document.getElementById(id+"Object")[call]();
		}else{
			return document.getElementById(id+"Object")[call](para);
		}
	}else if(call in document.getElementById(id+"Embed")){
		if(para==null){
			return document.getElementById(id+"Embed")[call]();
		}else{
			return document.getElementById(id+"Embed")[call](para);
		}
	}
}
//添加覆盖物块,并返回覆盖物
function mapAddPolygon(map, points, lineOpacity, lineColor, fillOpacity, fillColor, strokeWeight) {
    if (strokeWeight == null) {
        strokeWeight = 1;
    }
        var ply = new BMap.Polygon(points, {
            strokeWeight: strokeWeight,
            strokeColor: fillColor
        });
        ply.setFillOpacity(fillOpacity);
        ply.setFillColor(fillColor);
        ply.setStrokeOpacity(lineOpacity);
        map.addOverlay(ply);
		return ply;
}
//添加多个覆盖物快
function mapAddPolygons(map, points, lineOpacity, lineColor, fillOpacity, fillColor, strokeWeight) {
    if (strokeWeight == null) {
        strokeWeight = 1;
    }
    for (var i = 0; i < points.length; i++) {
		mapAddPolygon(map, points[i], lineOpacity, lineColor, fillOpacity, fillColor, strokeWeight);
    }
}
//添加覆盖物线,并返回覆盖物
function mapAddPolyline(map, points, lineColor, lineOpacity, strokeWeight) {
    if (strokeWeight == null) {
        strokeWeight = 1;
    }
        var pl = new BMap.Polyline(points, {
            strokeColor: lineColor,
            strokeOpacity: lineOpacity,
            strokeWeight: strokeWeight
        });
        map.addOverlay(pl);
		return pl;
}
//添加多个覆盖物线
function mapAddPolylines(map, points, lineColor, lineOpacity, strokeWeight) {
    if (strokeWeight == null) {
        strokeWeight = 1;
    }
    for (var i = 0; i < points.length; i++) {
		mapAddPolyline(map, points[i], lineColor, lineOpacity, strokeWeight);
    }
}
//得到视野并覆盖其他区域
function getBoundary(map, linecolor, fillcolor, fillopacity, callback, strokeWeight) {
    if (strokeWeight == null) {
        strokeWeight = 1;
    }
    var boundary = new BMap.Boundary();
	var fx = 0;
	var fy = 0;
    //boundary.get(address,
    //function(rs) { //获取行政区域
        //var count = rs.boundaries.length; //行政区域的点集合有多少个
        //for (var i = 0; i < count; i++) {
			//document.getElementById("info_div").innerHTML += "<br/>"+i+"个:"+rs.boundaries[i];
			var boundariesArray = getBoundaries();//rs.boundaries[i]
            var ply = new BMap.Polyline(boundariesArray, {	
                strokeWeight: strokeWeight,
                strokeColor: linecolor,
				strokeStyle: "dashed"
            }); //建立多边形覆盖物
            map.addOverlay(ply); //添加覆盖物
            //if (i == 0) {
                map.setViewport(ply.getPath()); //调整视野
                map.setZoom(map.getZoom() - 2);
                //计算东南西北四个顶点经纬度
                var bs = map.getBounds(); //获取可视区域
                var north = bs.getNorthEast().lat; //北
                var south = bs.getSouthWest().lat; //南
                var west = bs.getSouthWest().lng; //西
                var east = bs.getNorthEast().lng; //东
                var mapMaxX = east > west ? east: west;
                var mapMinX = east > west ? west: east;
                //计算最大边界
                var boundaries = boundariesArray.split(";");
                var maxX;
                var maxXIndex = 0;
                var minX;
                var minXIndex = 0;
                var maxY;
                var minY;
                for (var k = 0; k < boundaries.length; k++) {
                    var point = boundaries[k].split(",");
                    if (!maxX) {
                        maxX = point[0];
                        minX = point[0];
                        maxY = point[1];
                        minY = point[1];
                    } else {
                        if (maxX * 1 < point[0] * 1) {
                            maxX = point[0];
                            maxXIndex = k;
                        } else if (minX * 1 > point[0] * 1) {
                            minX = point[0];
                            minXIndex = k;
                        }
                        maxY = maxY * 1 > point[1] * 1 ? maxY: point[1];
                        minY = minY * 1 < point[1] * 1 ? minY: point[1];
                    }
                }
                var start = maxXIndex > minXIndex ? minXIndex: maxXIndex;
                var end = maxXIndex > minXIndex ? maxXIndex: minXIndex;
                var polygonA = [180 + "," + 180 ,0 + "," + 180, 0 + "," + 0];
                var polygonB = [ 0 + "," + 0, 180 + "," + 0,180 + "," + 180];
                var polygonA = polygonA.concat(boundaries.slice(start, end + 1));
                var polygonB = polygonB.concat(boundaries.slice(end, boundaries.length).concat(boundaries.slice(0, start + 1)));
                mapAddPolygon(map, polygonA.join(";"), 0.01, fillcolor, fillopacity, fillcolor);
                mapAddPolygon(map, polygonB.join(";"), 0.01, fillcolor, fillopacity, fillcolor);
            //}
            map.setViewport(ply.getPath()); //调整视野
            //限制拖动区域
			if (isAreaRestriction()) {
				BMapLib.AreaRestriction.setBounds(map, map.getBounds());
            }
            if (callback) {
                callback();
            }
        //}
    //});
}

function addlog(v) {
    document.getElementById("info_div").innerHTML += v;
}