YUI.add("gallery-imagecropper",function(b){var f=b.Lang,j=f.isNumber,g=b.Array,d=b.ClassNameManager.getClassName,i="imagecropper",c="resize",h="mask",a="knob",e={cropMask:d(i,h),resizeKnob:d(i,c,a),resizeMask:d(i,c,h)},k=b.ImageCropper=b.Base.create("imagecropper",b.Widget,[],{CONTENT_TEMPLATE:"<img/>",_moveResizeKnob:function(r){r.preventDefault();var z=r.target,s=this.get("contentBox"),q=r.shiftKey?this.get("shiftKeyTick"):this.get("keyTick"),v=r.direction,t=v.indexOf("w")>-1?-q:v.indexOf("e")>-1?q:0,n=v.indexOf("n")>-1?-q:v.indexOf("s")>-1?q:0,w=z.getX()+t,u=z.getY()+n,p=s.getX(),o=s.getY(),m=p+s.get("offsetWidth")-z.get("offsetWidth"),l=o+s.get("offsetHeight")-z.get("offsetHeight");if(w<p){w=p;}else{if(w>m){w=m;}}if(u<o){u=o;}else{if(u>l){u=l;}}z.setXY([w,u]);this._syncResizeMask();},_defCropMaskValueFn:function(){return b.Node.create(k.CROP_MASK_TEMPLATE);},_defResizeKnobValueFn:function(){return b.Node.create(k.RESIZE_KNOB_TEMPLATE);},_defResizeMaskValueFn:function(){return b.Node.create(k.RESIZE_MASK_TEMPLATE);},_renderCropMask:function(l){var m=this.get("cropMask");if(!m.inDoc()){l.append(m);}},_renderResizeKnob:function(l){var m=this.get("resizeKnob");if(!m.inDoc()){l.append(m);}m.setStyle("backgroundImage","url("+this.get("source")+")");},_renderResizeMask:function(){var l=this.get("resizeMask");if(!l.inDoc()){this.get("resizeKnob").append(l);}},_handleSrcChange:function(l){this.get("contentBox").set("src",l.newVal);this.get("cropResizeMask").setStyle("backgroundImage","url("+l.newVal+")");},_syncResizeKnob:function(){var l=this.get("initialXY");this.get("resizeKnob").setStyles({left:l[0],top:l[1],width:this.get("initWidth"),height:this.get("initHeight")});},_syncResizeMask:function(){var l=this.get("resizeKnob");l.setStyle("backgroundPosition",(-l.get("offsetLeft"))+"px "+(-l.get("offsetTop"))+"px");},_syncResizeAttr:function(l){if(this._resize){this._resize.con.set(l.attrName,l.newVal);}},_icEventProxy:function(p,o,n){var m=o+":"+n,l=this.get("resizeKnob");p.on(m,function(q){var r={coords:{width:l.get("offsetWidth"),height:l.get("offsetHeight"),left:l.get("offsetLeft"),top:l.get("offsetTop")}};r[o+"Event"]=q;this.fire(m,r);r.sourceEvent=m;this.fire("crop:"+(n==o?"crop":n),r);},this);},_bindResize:function(m,l){var n=this._resize=new b.Resize({node:m});n.on("resize:resize",this._syncResizeMask,this);n.plug(b.Plugin.ResizeConstrained,{constrain:l,minHeight:this.get("minHeight"),minWidth:this.get("minWidth"),preserveRatio:this.get("preserveRatio")});g.each(k.RESIZE_EVENTS,b.bind(this._icEventProxy,this,n,"resize"));},_bindDrag:function(m,l){var n=this._drag=new b.DD.Drag({node:m,handles:[this.get("resizeMask")]});n.on("drag:drag",this._syncResizeMask,this);n.plug(b.Plugin.DDConstrained,{constrain2node:l});g.each(k.DRAG_EVENTS,b.bind(this._icEventProxy,this,n,"drag"));},initializer:function(){this.set("initialXY",this.get("initialXY")||[10,10]);this.set("initWidth",this.get("initWidth"));this.set("initHeight",this.get("initHeight"));this.after("srcChange",this._handleSrcChange);this._icHandlers=[];g.each(k.RESIZE_ATTRS,function(l){this.after(l+"Change",this._syncResizeAttr);},this);},renderUI:function(){var l=this.get("boundingBox");this._renderCropMask(l);this._renderResizeKnob(l);this._renderResizeMask();},bindUI:function(){var m=this.get("contentBox"),l=this.get("resizeKnob");this._icHandlers.push(l.on("focus",this._attachKeyBehavior,this),l.on("blur",this._detachKeyBehavior,this),l.on("arrow",this._moveResizeKnob,this));this._bindResize(l,m);this._bindDrag(l,m);},syncUI:function(){this.get("contentBox").set("src",this.get("source"));this._syncResizeKnob();this._syncResizeMask();},getCropCoords:function(){var l=this.get("resizeKnob");return{left:l.get("offsetLeft"),top:l.get("offsetTop"),width:l.get("offsetWidth"),height:l.get("offsetHeight")};},destructor:function(){if(this._resize){this._resize.destroy();}if(this._drag){this._drag.destroy();}g.each(this._icHandlers,function(l){l.detach();});this._drag=this._resize=null;}},{CROP_MASK_TEMPLATE:'<div class="'+e.cropMask+'"></div>',RESIZE_KNOB_TEMPLATE:'<div class="'+e.resizeKnob+'" tabindex="0"></div>',RESIZE_MASK_TEMPLATE:'<div class="'+e.resizeMask+'"></div>',RESIZE_EVENTS:["start","resize","end"],RESIZE_ATTRS:["minWidth","minHeight","preserveRatio"],DRAG_EVENTS:["start","drag","end"],HTML_PARSER:{source:function(l){return l.get("src");},cropMask:"."+e.cropMask,resizeKnob:"."+e.resizeKnob,resizeMask:"."+e.resizeMask},ATTRS:{source:{value:""},resizeMask:{setter:function(l){l=b.one(l);if(l){l.addClass(e.resizeMask);}return l;},valueFn:"_defResizeMaskValueFn"},resizeKnob:{setter:function(l){l=b.one(l);if(l){l.addClass(e.resizeKnob);}return l;},valueFn:"_defResizeKnobValueFn"},cropMask:{setter:function(l){l=b.one(l);if(l){l.addClass(e.cropMask);}return l;},valueFn:"_defCropMaskValueFn"},initialXY:{validator:f.isArray},keyTick:{value:1,validator:j},shiftKeyTick:{value:10,validator:j},useKeys:{value:true,validator:f.isBoolean},status:{value:true,validator:f.isBoolean},minHeight:{value:50,validator:j},minWidth:{value:50,validator:j},preserveRatio:{value:false,validator:f.isBoolean},initHeight:{value:0,validator:j,setter:function(m){var l=this.get("minHeight");return m<l?l:m;}},initWidth:{value:0,validator:j,setter:function(m){var l=this.get("minWidth");return m<l?l:m;}}}});},"@VERSION@",{requires:["widget","resize","gallery-event-arrow"]});