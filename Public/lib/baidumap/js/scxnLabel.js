function ScxnLabel(point, simpletext, text, style, minZoom, maxZoom) {
    this._point = point;
    this._simpletext = simpletext;
    this._text = text;
    this._style = style;
    this.minZoom = minZoom;
    this.maxZoom = maxZoom;
    this._showDiv;
    this._div = document.createElement("div");
    //	this.openInfoWindow=function(infoWindow){
    //		var pil = map.pointToOverlayPixel(this._point);
    //		pil.y = pil.y - this._div.offsetHeight;
    //		var pit = map.overlayPixelToPoint(pil);
    //		this._map.openInfoWindow(infoWindow,pit);
    //	}
    //	this.closeInfoWindow=function(){
    //		this._map.closeInfoWindow();
    //	}
    this._overlaydiv;
    var that = this;
    this.equals = function(point, minZoom, maxZoom) {
        return point.lng == that._point.lng && point.lat == that._point.lat && minZoom == that.minZoom && maxZoom == that.maxZoom;
    }
    this.update = function(simpletext, text) {
        that._simpletext = simpletext;
        that._text = text;
    }
    this.hidediv = function() {
        if (that._showDiv) {
            that._showDiv.style.display = "none";
        }
    }
    this.hide = function() {
        that._div.style.display = "none";
    }

    this.show = function() {
        that._div.style.display = "block";
    }
    this.showdiv = function(div) {
        if (div) {
            that._showDiv = div;
            var pixel = map.pointToOverlayPixel(that._point);
            pixel.y = pixel.y - that._div.offsetHeight;
            div.style.position = "absolute";
            div.style.display = "block";
            //让窗口不超出界面
            var bounds = map.getBounds();
            var sw = map.pointToOverlayPixel(bounds.getSouthWest());
            var minX = sw.x;
            var maxY = sw.y;
            var maxX = map.pointToOverlayPixel(bounds.getNorthEast()).x;
            //添加到面板
            map.getPanes().labelPane.appendChild(div);
            //计算正常显示值
            var left = pixel.x + (that._div.offsetWidth);
            var top = pixel.y+ (that._div.offsetHeight);
            if (left + div.offsetWidth > maxX) {
                left = pixel.x - div.offsetWidth;
            }
            if (top + div.offsetHeight > maxY) {
                top = maxY - div.offsetHeight;
            }
            div.style.left = left + "px";
            div.style.top = top + "px";
        }else{
			that._showDiv.style.display = "block";
		}

    }
    this.addEventListener = function(e, call) {
        if (window.addEventListener) {
            //其它浏览器的事件代码: Mozilla, Netscape, Firefox
            //添加的事件的顺序即执行顺序 //注意用 addEventListener 添加带on的事件，不用加on 
            if (that._call) that._div.removeEventListener(e, that._call, false);
            that._div.addEventListener(e, call, false);
        } else if (window.attachEvent) {
            //IE 的事件代码 在原先事件上添加 add 方法
            if (that._call) that._div.detachEvent('on' + e, that._call);
            that._div.attachEvent('on' + e, call);

        } else {
            that._div["on" + e] = call;
        }
        that._call = call;
    }

    this.showsimpletext = function() {
        this._div.innerHTML = that._simpletext;
    }
    this.showtext = function() {
        this._div.innerHTML = that._text;
    }
}
ScxnLabel.prototype = new BMap.Overlay();
ScxnLabel.prototype.initialize = function(map) {
    this._map = map;
    //var div = this._div = document.createElement("div");
    var div = this._div;
    div.setAttribute("style", this._style);
    div.style.position = "absolute";
    div.innerHTML = this._text;
    //var span = this._span = document.createElement("span");
    //div.appendChild(span);
    //span.appendChild(document.createTextNode(this._text));    
    //div.getElementsByTagName("span")[0].innerHTML = this._text;
    var that = this;
    map.getPanes().labelPane.appendChild(div);
    return div;
}
ScxnLabel.prototype.draw = function() {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top = pixel.y + "px";
}