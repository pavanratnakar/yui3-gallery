YUI.add("gallery-dynamic-dialog",function(H){var E,D=H.Panel,C=H.Lang,B=C.sub,G=C.isValue,A=C.isString,F=H.Object.each;E=H.Base.create("dynamicDialog",H.Base,[],{container:H.one(document.body),panels:{},DEFAULT_EVENTS:{"a.open-dialog":"click","a.remote-dialog":"click"},initializer:function(){this.publish("submit",{defaultFn:this._defSubmitFn,preventable:true});this.publish("getSuccess",{defaultFn:this._triggerEventFn,preventable:true});this.publish("getFailure",{defaultFn:this._triggerEventFn,preventable:true});this.publish("show",{preventable:false});},setupDelegates:function(){var I=this.container,J=this.DEFAULT_EVENTS,K=H.bind(this._triggerEventFn,this);F(J,function(M,L){I.delegate(M,K,L);});},_fetchDialogContent:function(O){var N=O.currentTarget,M=N.get("tagName")==="A"?N.get("href"):N.get("target"),L=N.getAttribute("data-async")==="true",P=(N.getAttribute("title")||""),K=this,J=K.get("remoteFailureText"),I={method:"GET",arguments:{dialog:K},on:{success:function(T,S,R){O.args=R;O.response=S;var Q=H.one(H.config.doc.createDocumentFragment());Q.append("<div>"+S.responseText+"</div>");Q=Q.one("div");Q.setAttribute("data-async",L);Q.setAttribute("title",P);O.dialogId=N.get("id");O.template=Q;O.domTarget=O.currentTarget;K.fire("getSuccess",O);},failure:function(T,S,R){O.args=R;O.response=S;var Q=H.one(H.config.doc.createDocumentFragment());Q.append("<div>"+J+"</div>");Q=Q.one("div");Q.setAttribute("data-async",L);Q.setAttribute("title",P);O.dialogId=N.get("id");O.template=Q;O.domTarget=O.currentTarget;K.fire("getFailure",O);}}};H.io(M,I);},open:function(I){var J=H.one(I),K={currentTarget:J,preventDefault:function(){},halt:function(){}};this._dialogFromNode(K);},_triggerEventFn:function(I){this._dialogFromNode(I);},_dialogFromNode:function(P){var Q=P.domTarget?P.domTarget:P.currentTarget,I=Q.get("tagName")==="A"?Q.get("href"):Q.get("target"),T={},K=P.dialogId||I.substr(I.indexOf("#")),S=P.template||H.one(K),M=S?S.getAttribute("data-async")==="true":false,N=this.panels[K],O=Q.get("attributes"),R=[];if(Q.hasClass(this.get("remoteClass"))&&!S){P.preventDefault();return this._fetchDialogContent(P);}O.each(function(V){var U=V.get("name");if(U.match(/^data-/)){var W=Q.getAttribute(U);if(W!==null){T[U.substr(5)]=W;}}});if(N||S){P.preventDefault();if(!N){N=this._setupDialog(Q,S,T);}else{if(S){N.setStdModContent(H.WidgetStdMod.BODY,B(S.getContent(),T));}}var J=N.get("contentBox").one("form");if(J){var L=H.bind(this._defSubmitButtonFn,this);if(N.formListener){N.formListener.detach();}N.formListener=J.on("submit",function(U){U.preventDefault();U.async=M;U.dialog=this;U.trigger=Q;U.form=this.get("contentBox").one("form");if(!U.form){throw"Form disappeared, was the dialog content replaced incorrectly?";}L(U);},N);}N.trigger=Q;N.show();this.fire("show",{dialog:N,trigger:Q});}},_setupDialog:function(J,Y,R){var P=this,Z=J.getAttribute("title")||Y.getAttribute("title")||"",S=B(Y.getContent(),R),V=J.getAttribute("data-modal")||Y.getAttribute("data-modal")||this.get("modal"),Q=J.getAttribute("data-zindex")||this.get("zIndex"),N=null,K=Y.getAttribute("data-async")==="true",W=H.bind(this._defSubmitButtonFn,this),X=this.get("closeLabel"),O=null,I=null;N=new D({headerContent:Z,bodyContent:S,modal:V,centered:true,zIndex:Q,buttons:[{value:X,section:H.WidgetStdMod.HEADER,classNames:["closer"],action:function(a){this.hide();}}]});N.render(this.container);N.get("boundingBox").addClass("yui3-dynamic-dialog");var M=Y.getAttribute("data-dialog-class");if(M){N.get("boundingBox").addClass(M.split(" "));}O=N.get("contentBox");I=O.one("form");if(I){var U=Y.getAttribute("data-cancel-class")||"";N.addButton({value:Y.getAttribute("data-cancel-label")||this.get("cancelLabel"),classNames:["yui3-dynamic-dialog-cancel",U.split(" ")],action:function(a){a.preventDefault();this.hide();},section:H.WidgetStdMod.FOOTER});var L=Y.getAttribute("data-submit-class")||"";N.addButton({value:Y.getAttribute("data-submit-label")||this.get("submitLabel"),classNames:["yui3-dynamic-dialog-submit",L.split(" ")],action:function(a){a.preventDefault();a.async=K;a.dialog=this;a.trigger=this.trigger;a.form=this.get("contentBox").one("form");if(!a.form){throw"Form disappeared, was the dialog content replaced incorrectly?";}W(a);},section:H.WidgetStdMod.FOOTER});}else{var T=Y.getAttribute("data-ok-class")||"";N.addButton({value:Y.getAttribute("data-ok-label")||this.get("okLabel"),classNames:["yui3-dynamic-dialog-ok",T.split(" ")],action:function(a){a.preventDefault();this.hide();},section:H.WidgetStdMod.FOOTER});}N.on("visibleChange",function(a){this.fire("visibleChange",{event:a,panel:N});},this);this.panels["#"+Y.get("id")]=N;return N;},_defSubmitButtonFn:function(I){this.fire("submit",{dialog:I.dialog,trigger:I.trigger,form:I.form,async:I.async||false});},_defSubmitFn:function(O){var K=O.dialog,M=O.form,L=O.async,J=O.trigger||K.trigger,N=M.getAttribute("action"),P=M.getAttribute("method")||"POST",I={};if(!L){K.hide();M.submit();return;}I.method=P.toUpperCase();I.form={id:M};I.context=this;I.arguments={dialog:K,form:M,trigger:J,preventDefault:O.preventDefault};I.on={success:this._ioSuccess,failure:this._ioFailure};H.io(N,I);},_ioSuccess:function(K,J,I){I.dialog.hide();I.response=J;this.fire("ioSuccess",I);},_ioFailure:function(O,M,I){var J=I.dialog,L=I.form,N=J.get("boundingBox"),K=this.get("ioFailureClass");I.response=M;this.fire("ioFailure",I);N.addClass(K);this._shakeNode(N,H.bind(function(){this.removeClass(K);},N));if(M.responseText){J.setStdModContent(H.WidgetStdMod.BODY,M.responseText);}},_shakeNode:function(L,N){var K=L.getX(),J=L.getY(),I=K+5,M;L.get("clientX");M=new H.Anim({node:L,to:{xy:[I,J]},duration:0.01,iterations:10,direction:"alternate"});if(N&&typeof N==="function"){M.on("end",N);}M.run();return M;}},{ATTRS:{modal:{value:false},zIndex:{value:1},closeLabel:{value:"\u2715"},okLabel:{value:"OK"},cancelLabel:{value:"Cancel"},submitLabel:{value:"Submit"},remoteFailureText:{value:"<p>There was a problem fetching the dialog content. Sorry.</p>"},dialogClass:{value:"open-dialog"},remoteClass:{value:"remote-dialog"},ioFailureClass:{value:"yui3-dynamic-dialog-io-failure"}}});
H.DynamicDialog=E;},"@VERSION@",{requires:["anim","substitute","widget","base","panel","io","io-form","event-delegate"],optional:["anim","substitute","widget","base","panel","io","io-form","event-delegate"],supersedes:["anim","substitute","widget","base","panel","io","io-form","event-delegate"]});