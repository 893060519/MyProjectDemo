function M(){
	this.defaultoptions = {
		id:"map-container", //地图显示控件id
        level:10, //初始化地图级别
        point:{lng:"113.155177",lat:"23.062506"}, //初始化地图焦点位置的经纬度
		arealimit:{enable:false,bound:[{lng:116.027143, lat:39.772348},{lng:116.832025, lat:40.126349}],level:[7,11]},//区域和等级限制
        scrollwheelzoom:{enable:false},  //滚轮
        scale:{enable:false},   //比例尺
        navctrl:{enable:false},  //平移控件
		drawtool:{enable:false}   //鼠标绘制工具
	};
}

M.prototype = {
	settingWidth: "500",//右侧广播设置宽度
	//初始化地图显示
	init:function(options){
		/*应用传入参数*/
        var o = this.opts = extendObj(this.defaultoptions,options);

		/*建立地图*/
		var m = this.map = new BMap.Map(this.opts.id);

		/*启用滚轮缩放*/
		if(o.scrollwheelzoom.enable){
        	m.enableScrollWheelZoom();
    	}

        /*比例尺*/
        if(o.scale.enable){
        	m.addControl(new BMap.ScaleControl(o.scale.options));
        }

		/*平移控件*/
        if(o.navctrl.enable){
        	m.addControl(new BMap.NavigationControl(o.navctrl.options));
        }

		/*定位(初始化地图显示，此操作不能去掉，不然地图显示不出来)*/
		var initPoint = new BMap.Point(o.point.lng, o.point.lat);
		m.centerAndZoom(initPoint, o.level);

		/*设置范围和缩放级别*/
		if(o.arealimit.enable) {
			// var b = new BMap.Bounds(new BMap.Point(o.arealimit.bound[0].lng, o.arealimit.bound[0].lat),
			// new BMap.Point(o.arealimit.bound[1].lng, o.arealimit.bound[1].lat));
			// BMapLib.AreaRestriction.setBounds(m, b);
			m.setMinZoom(o.arealimit.level[0]);
			m.setMaxZoom(o.arealimit.level[1]);
		}

		/*鼠标绘制工具*/
		if(o.drawtool.enable) {
			var styleOptions = {
				strokeColor: "#5a98de",
				//边线颜色。
				fillColor: "#5a98de",
				//填充颜色。当参数为空时，圆形将没有填充效果。
				strokeWeight: 2,
				//边线的宽度，以像素为单位。
				strokeOpacity: 0.8,
				//边线透明度，取值范围0 - 1。
				fillOpacity: 0.2,
				//填充的透明度，取值范围0 - 1。
				strokeStyle: 'solid'
				//边线的样式，solid或dashed。
			};
			//实例化鼠标绘制工具
			this.drawingManager = new BMapLib.DrawingManager(m, {
				isOpen: false,
				//是否开启绘制模式
				enableDrawingTool: true,
				//是否显示工具栏
				drawingToolOptions: {
					anchor: BMAP_ANCHOR_TOP_RIGHT,
					//位置
					offset: new BMap.Size(360, 0),
					//偏离值
					// drawingModes:[BMAP_DRAWING_MARKER, BMAP_DRAWING_CIRCLE, BMAP_DRAWING_POLYGON, BMAP_DRAWING_RECTANGLE]
					drawingModes:[BMAP_DRAWING_CIRCLE, BMAP_DRAWING_POLYGON, BMAP_DRAWING_RECTANGLE]
				},
				polylineOptions:styleOptions,
				//画的样式
				circleOptions: styleOptions,
				//圆的样式
				polygonOptions: styleOptions,
				//多边形的样式
				rectangleOptions: styleOptions
				//矩形的样式
			});
		}

		this.markers = [];
        $(".BMapLib_Drawing").css("top", "40px");
	}
	//添加控件
	,addControl: function () {
        // 创建控件
        let myZoomCtrl = new ZoomControl();
        let myControl1 = new MyControl();
        let myStatisticsControl = new StatisticsControl();

        // 添加到地图当中
        this.map.addControl(myZoomCtrl);
        this.map.addControl(myControl1);
        this.map.addControl(myStatisticsControl);
    }
	//生成查询结果
	,rebuildResult:function(){

	}

	//右键点击事件
	,rightClickCallback:function(callback){
        this.map.addEventListener("rightclick", callback);
	}
	//画圈
	,overlayCompleteCallback:function(callback){
        if (this.drawingManager) {
            this.drawingManager.addEventListener("overlaycomplete", callback);
        }
    }
    //调整画圈工具条位置
    ,adjustDrawToolPos:function(flag) {
        if (flag) {
        	var sWidth = this.settingWidth + "px";
            $(".BMapLib_Drawing").css("right", sWidth);
            $("#calculate").parent().css("right", sWidth);
        } else {
            $(".BMapLib_Drawing").css("right", "0");
            $("#calculate").parent().css("right", "0");
        }
    }
    ,getPageHeight:function() {
        var yScroll = 0;
        var windowHeight = 0;
        var pageHeight = 0;

        if (window.innerHeight && window.scrollMaxY) {
            yScroll = window.innerHeight + window.scrollMaxY;
        } else {
            if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
                yScroll = document.body.scrollHeight;
            } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
                yScroll = document.body.offsetHeight;
            }
        }

        if (self.innerHeight) { // all except Explorer
            windowHeight = self.innerHeight;
        } else {
            if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
                windowHeight = document.documentElement.clientHeight;
            } else {
                if (document.body) { // other Explorers
                    windowHeight = document.body.clientHeight;
                }
            }
        }

        // for small pages with total height less then height of the viewport
        if (yScroll < windowHeight) {
            pageHeight = windowHeight;
        } else {
            pageHeight = yScroll;
        }
        return pageHeight;
    }
    //工具点击
    , toolClick:function(callbackList) {
		var m = this;
        $("div.w-map").on("click", "span.map-tool", function (e) {
            if ($(e.target).hasClass("full-screen")) {//地图全屏按钮
                $("#map-container").fullScreen({
                    callback: function(state) {
                        var $map = $(".map-show");
                        var $btn = $("span.full-screen");
                        if (state) {
                            $map.css("height", m.getPageHeight() + 'px');
                            $btn.html('退出全屏');
                        } else {
                            $map.css("height", (m.getPageHeight() - 300) + 'px');
                            $btn.html('全屏');
                        }
                    }
                });
            } else {//设备类型按钮
                $(e.target).siblings().removeClass("ant-btn-primary").addClass("ant-btn-default").end().removeClass("ant-btn-default").addClass("ant-btn-primary");
                callbackList.setDeviceType($(e.target).attr("data-index"));
            }
        });
    }
    //统计设备数目
    , statisticsDevices:function(totalNum, onlineNum, hasSelectedDevices) {//统计在线设备数和设备总数
        let scale = ((onlineNum / totalNum) * 100);
        $("#totalnum").text(totalNum);
        $("#onlinenum").text(onlineNum);
        $("#scale").text(scale ? scale.toFixed(2) + "%" : 0);
        $("#totaltext").text(hasSelectedDevices ? '已选个数：' : '终端总数：');
    }
    //调整左侧区域树
    , adjustRegionTreeWidth:function() {
        //插件增加区域div大小可变化功能

        $(".map-region-tree-select").jsplit({
            MaxW: "250px"//设置最大宽度
            , MinW: "10px"//设置最小宽度
            , FloatD: "left"//设置块浮动方向
            , IsClose: false//设置初始状态
            // ,BgUrl:"url(tpImg/sp_bg.gif)"//设置分隔条背景图片地址
            // ,Bg:"right 0 repeat-y"//设置分隔条背景图片position,颜色等
            , Btn: {
                btn: true//是否显示上下按钮 false为不显示
                , oBg: {Out: "0 0", Hover: "-6px 0"}//设置打开状态时候按钮背景：鼠标离开(默认)，经过
                , cBg: {Out: "-12px 0", Hover: "-18px 0"}
            }//设置打开状态时候按钮背景：鼠标离开(默认)，经过
            , Fn: function () {
            }//拖动，点击分隔条时候触发的方法
        });
    }
	//删除指定终端
	,delDevice: function (obj) {
        var allOverlay = this.map.getOverlays();
        for (var i = 0; i < allOverlay.length - 1; i++) {
            if ((allOverlay[i].point.lng === obj.lng)
                && (allOverlay[i].point.lat === obj.lat)) {
                this.map.removeOverlay(allOverlay[i]);
                return false;
            }
        }
    }

	//地图平移
	,mapPanTo:function(log,lat,level){
		var NewPoint=new BMap.Point(log,lat);
		this.map.panTo(NewPoint);
		this.map.setZoom(level);

	}

	//添加终端
	,addDevice:function(obj){
		var Type = "";
		//先生成point对象
		var point = new BMap.Point(obj.lng, obj.lat);

		//根据设备的类型和状态选择图片并生成marker对象
		var marker = new BMap.Marker(point, { icon: this.mapIcon(obj)});
		this.markers.push(marker);
        switch (obj.type) {
            case 2:
                if (obj.subtype === 0) {
                    Type = '音柱';
                }
                if (obj.subtype === 1) {
                    Type = '扩大机';
                }
                if (obj.subtype === 2) {
                    Type = '收扩机';
                }
                break;
            case 1:
                Type = '适配器';
                break;
            default:
                Type = '';
        }

		//建立提示对象
		var opts={
			width:260,
			title:"设备名称："+ obj.name
		};
        var deviceStatus = {1 :"未注册",  2:"正在播放" , 3:"空闲" ,4:"待机",5:"异常"};
		var str = '';

		var content = "<table>";
        content += "<td>所在区域：" + obj.regionname + "</td></tr>";
        content += "<td>设备类型：" + Type + "</td></tr>";
        content += "<tr><td>设备状态：" + (deviceStatus[obj.status] ? deviceStatus[obj.status]  : "空闲") + "</td>";
        content += str + "</table>";
		var infoWindow = new BMap.InfoWindow(content, opts);

		//点击标注显示
		marker.addEventListener("click", function() {
			this.openInfoWindow(infoWindow);
		});

		//添加标注
		this.map.addOverlay(marker);

		//返回标注
		return marker;
	}

	//生成图片对象
	,mapIcon:function(obj){
	    var type = obj.type === 1 ? "1.0" : '' + obj.type + '.' + obj.subtype;
        var mappng="Public/lib/baidumap/images/" + type + "." + obj.status + ".png";

		var mapIcon = new BMap.Icon(mappng, new BMap.Size(30, 30),{
			offset: new BMap.Size(0, -5),imageOffset: new BMap.Size(0, 0)});
		return mapIcon;
	}

	,mar:function(){
	    return this.markers;
	}
	,clearAllMarkers:function(){
		for(var i=0;i<this.markers.length;i++){
            this.map.removeOverlay(this.markers[i]);
        }
        this.markers=[];
	}
};




function cloneObj(oldObj) { //复制对象方法
	if (typeof(oldObj) != 'object') return oldObj;
	if (oldObj == null) return oldObj;
	var newObj = new Object();
	for (var i in oldObj)
		newObj[i] = cloneObj(oldObj[i]);
	return newObj;
}

function extendObj() { //扩展对象
	var args = arguments;
	if (args.length < 2) return;
	var temp = cloneObj(args[0]); //调用复制对象方法
	for (var n = 1; n < args.length; n++) {
		for (var i in args[n]) {
			temp[i] = args[n][i];
		}
	}
	return temp;
}

//全屏控件
function MyControl(){
	this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
	this.defaultOffset = new BMap.Size(10, 10);
}

MyControl.prototype = new BMap.Control();

MyControl.prototype.initialize = function(m){
    var div = document.createElement("div");
    //目前这个全屏有问题，先去掉
    return div;
    /*
	$(div).html('<span class="ant-btn ant-btn-primary ant-btn-sm map-tool full-screen" data-index=1>全屏</span>');
	m.getContainer().appendChild(div);
	return div;*/
};
// 定义一个控件类,即function
function ZoomControl(){
	// 默认停靠位置和偏移量
	this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
	this.defaultOffset = new BMap.Size(180, 10);
}

// 通过JavaScript的prototype属性继承于BMap.Control
ZoomControl.prototype = new BMap.Control();

// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
ZoomControl.prototype.initialize = function(m){

 	// 创建一个DOM元素
	var div = document.createElement("div");
	var baseUrl = "Public/lib/baidumap/images/";
	//添加内容
	$(div).html('<span class="ant-btn ant-btn-primary ant-btn-sm map-tool" data-index=0>全选</span>'+
  		'<span class="ant-btn ant-btn-default ant-btn-sm map-tool" data-index="2-0">'+
  		'<span style="padding-left:25px;margin-left:-15px;background:url(' + baseUrl + '1.1.png) no-repeat;">音柱</span></span>'+
  		'<span class="ant-btn ant-btn-default ant-btn-sm map-tool" data-index="2-2">'+
  		'<span style="padding-left:25px;margin-left:-15px;background:url(' + baseUrl + '2.1.png) no-repeat;">收扩机</span></span>'+
  		//'<span class="ant-btn ant-btn-default ant-btn-sm map-tool" data-index="2-1">'+
  		//'<span style="padding-left:35px;margin-left:-15px;background:url(' + baseUrl + '3.1.png) no-repeat;">扩大机</span></span>'+
  		//'<span class="ant-btn ant-btn-default ant-btn-sm map-tool" data-index=4>'+
  		//'<span style="padding-left:35px;margin-left:-10px;background:url(' + baseUrl + '4.1.png) no-repeat;">机顶盒</span></span>'+
  		'<span class="ant-btn ant-btn-default ant-btn-sm map-tool" data-index=1>'+
  		'<span style="padding-left:35px;margin-left:-10px;background:url(' + baseUrl + '5.1.png) no-repeat;">适配器</span></span>'
  		);

	// 添加DOM元素到地图中
	m.getContainer().appendChild(div);

	// 将DOM元素返回
	return div;
};

// 定义一个控件类,即function
function  StatisticsControl(){
	// 默认停靠位置和偏移量
	this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
	this.defaultOffset = new BMap.Size(370, 10);
}

// 通过JavaScript的prototype属性继承于BMap.Control
StatisticsControl.prototype = new BMap.Control();

// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
StatisticsControl.prototype.initialize = function(m){

 	// 创建一个DOM元素
	var div = document.createElement("div");

	$(div).addClass("btn-group").html('<div class="btn" id="calculate" style="background-color:#e6e6e6"><span id="totaltext">终端总数：</span><span id="totalnum">0</span>'+
        '<span style="padding-left:15px">在线个数：</span><span id="onlinenum">0</span>'+
        '<span style="padding-left:15px">在线率：</span><span id="scale">0</span></div>');
	m.getContainer().appendChild(div);
	return div;
};

