!function(t){var i={};function a(e){if(i[e])return i[e].exports;var s=i[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=t,a.c=i,a.d=function(t,i,e){a.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:e})},a.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},a.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(i,"a",i),i},a.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},a.p="",a(a.s=0)}([function(t,i){!function(){"use strict";function t(i){return this instanceof t?(this._canvas=i="string"==typeof i?document.getElementById(i):i,this._ctx=i.getContext("2d"),this._width=i.width,this._height=i.height,this._max=1,void this.clear()):new t(i)}t.prototype={defaultRadius:25,defaultGradient:{.4:"blue",.6:"cyan",.7:"lime",.8:"yellow",1:"red"},data:function(t,i){return this._data=t,this},max:function(t){return this._max=t,this},add:function(t){return this._data.push(t),this},clear:function(){return this._data=[],this},radius:function(t,i){i=i||15;var a=this._circle=document.createElement("canvas"),e=a.getContext("2d"),s=this._r=t+i;return a.width=a.height=2*s,e.shadowOffsetX=e.shadowOffsetY=200,e.shadowBlur=i,e.shadowColor="black",e.beginPath(),e.arc(s-200,s-200,t,0,2*Math.PI,!0),e.closePath(),e.fill(),this},gradient:function(t){var i=document.createElement("canvas"),a=i.getContext("2d"),e=a.createLinearGradient(0,0,0,256);for(var s in i.width=1,i.height=256,t)e.addColorStop(s,t[s]);return a.fillStyle=e,a.fillRect(0,0,1,256),this._grad=a.getImageData(0,0,1,256).data,this},draw:function(t){this._circle||this.radius(this.defaultRadius),this._grad||this.gradient(this.defaultGradient);var i=this._ctx;i.clearRect(0,0,this._width,this._height);for(var a,e=0,s=this._data.length;s>e;e++)a=this._data[e],i.globalAlpha=Math.max(a[2]/this._max,t||.05),i.drawImage(this._circle,a[0]-this._r,a[1]-this._r);var n=i.getImageData(0,0,this._width,this._height);return this._colorize(n.data,this._grad),i.putImageData(n,0,0),this},_colorize:function(t,i){for(var a,e=3,s=t.length;s>e;e+=4)(a=4*t[e])&&(t[e-3]=i[a],t[e-2]=i[a+1],t[e-1]=i[a+2])}},window.simpleheat=t}(),L.HeatLayer=(L.Layer?L.Layer:L.Class).extend({initialize:function(t,i){this._latlngs=t,L.setOptions(this,i)},setLatLngs:function(t){return this._latlngs=t,this.redraw()},addLatLng:function(t){return this._latlngs.push(t),this.redraw()},setOptions:function(t){return L.setOptions(this,t),this._heat&&this._updateOptions(),this.redraw()},redraw:function(){return!this._heat||this._frame||this._map._animating||(this._frame=L.Util.requestAnimFrame(this._redraw,this)),this},onAdd:function(t){this._map=t,this._canvas||this._initCanvas(),t._panes.overlayPane.appendChild(this._canvas),t.on("moveend",this._reset,this),t.options.zoomAnimation&&L.Browser.any3d&&t.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._canvas),t.off("moveend",this._reset,this),t.options.zoomAnimation&&t.off("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},_initCanvas:function(){var t=this._canvas=L.DomUtil.create("canvas","leaflet-heatmap-layer leaflet-layer"),i=L.DomUtil.testProp(["transformOrigin","WebkitTransformOrigin","msTransformOrigin"]);t.style[i]="50% 50%";var a=this._map.getSize();t.width=a.x,t.height=a.y;var e=this._map.options.zoomAnimation&&L.Browser.any3d;L.DomUtil.addClass(t,"leaflet-zoom-"+(e?"animated":"hide")),this._heat=simpleheat(t),this._updateOptions()},_updateOptions:function(){this._heat.radius(this.options.radius||this._heat.defaultRadius,this.options.blur),this.options.gradient&&this._heat.gradient(this.options.gradient),this.options.max&&this._heat.max(this.options.max)},_reset:function(){var t=this._map.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this._canvas,t);var i=this._map.getSize();this._heat._width!==i.x&&(this._canvas.width=this._heat._width=i.x),this._heat._height!==i.y&&(this._canvas.height=this._heat._height=i.y),this._redraw()},_redraw:function(){var t,i,a,e,s,n,o,h,r,l=[],d=this._heat._r,_=this._map.getSize(),m=new L.Bounds(L.point([-d,-d]),_.add([d,d])),u=void 0===this.options.max?1:this.options.max,c=void 0===this.options.maxZoom?this._map.getMaxZoom():this.options.maxZoom,f=1/Math.pow(2,Math.max(0,Math.min(c-this._map.getZoom(),12))),p=d/2,g=[],v=this._map._getMapPanePos(),y=v.x%p,w=v.y%p;for(t=0,i=this._latlngs.length;i>t;t++)if(a=this._map.latLngToContainerPoint(this._latlngs[t]),m.contains(a)){s=Math.floor((a.x-y)/p)+2,n=Math.floor((a.y-w)/p)+2,r=(void 0!==this._latlngs[t].alt?this._latlngs[t].alt:void 0!==this._latlngs[t][2]?+this._latlngs[t][2]:1)*f,g[n]=g[n]||[],(e=g[n][s])?(e[0]=(e[0]*e[2]+a.x*r)/(e[2]+r),e[1]=(e[1]*e[2]+a.y*r)/(e[2]+r),e[2]+=r):g[n][s]=[a.x,a.y,r]}for(t=0,i=g.length;i>t;t++)if(g[t])for(o=0,h=g[t].length;h>o;o++)(e=g[t][o])&&l.push([Math.round(e[0]),Math.round(e[1]),Math.min(e[2],u)]);this._heat.data(l).draw(this.options.minOpacity),this._frame=null},_animateZoom:function(t){var i=this._map.getZoomScale(t.zoom),a=this._map._getCenterOffset(t.center)._multiplyBy(-i).subtract(this._map._getMapPanePos());L.DomUtil.setTransform?L.DomUtil.setTransform(this._canvas,a,i):this._canvas.style[L.DomUtil.TRANSFORM]=L.DomUtil.getTranslateString(a)+" scale("+i+")"}}),L.heatLayer=function(t,i){return new L.HeatLayer(t,i)}}]);
//# sourceMappingURL=leaflet-heat-prod.js.map