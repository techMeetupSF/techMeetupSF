(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{113:function(e,t,a){},115:function(e,t,a){},191:function(e,t,a){},214:function(e,t,a){},237:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(27),i=a.n(o),c=(a(90),a(15)),l=a(16),s=a(19),u=a(17),p=a(20),m=(a(92),a(76)),d=a.n(m),h=a(77),f=(a(113),a(115),a(80)),g=a.n(f),v=a(81),y=a.n(v),b=a(82),E=a.n(b),x=a(18),O=a(78),j=a.n(O);var N=Object(x.withStyles)(function(e){return{root:{display:"flex",justifyContent:"center",flex:1},chip:{margin:e.spacing.unit,fontWeight:600,fontSize:"15px",cursor:"pointer",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",color:"white",lineHeight:"32px",paddingLeft:"12px",paddingRight:"12px",userSelect:"none",whiteSpace:"nowrap"}}})(function(e){var t=e.classes,a=e.tag,n=e.color;return r.a.createElement("div",{className:t.root},r.a.createElement(j.a,{label:a.toUpperCase(),color:n,className:t.chip}))}),S=a(48),w=a.n(S);var k=Object(x.withStyles)({groupName:{color:"rgba(0,0,0,.54)",fontSize:"15px",fontWeight:600,lineHeight:2},bigText:{fontSize:"24px",lineHeight:1.25,fontWeight:600},subDetails:{color:"rgba(0,0,0,.54)",fontSize:"16px",paddingBottom:"7px"}})(function(e){var t=e.classes,a=e.text,n=e.styleName;return r.a.createElement(w.a,{component:"h5",className:t[n]},a)}),_=(a(191),function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.event,t=e.group.name,a=e.name,n=e.yes_rsvp_count+" "+e.group.who+" going at "+e.timeStamp,o=(e.venue||"").name||null,i=null,c="primary";return e.hasCateredDinner?(i="CATERED DINNER",c="secondary"):e.hasPizza?i="PIZZA":e.hasFood&&(i="FOOD"),r.a.createElement("a",{href:e.event_url,target:"_blank",rel:"noopener noreferrer",className:"not_link padded"},r.a.createElement(g.a,{className:"material_card"},r.a.createElement(y.a,{className:"material_height"},r.a.createElement(E.a,null,r.a.createElement(k,{text:t.toUpperCase(),styleName:"groupName"}),r.a.createElement(k,{text:a,styleName:"bigText"}),r.a.createElement(k,{text:o,styleName:"groupName"}),r.a.createElement(k,{text:n,styleName:"subDetails"})),r.a.createElement("div",{className:"food_chips"},i&&r.a.createElement(N,{tag:i,color:c}),e.hasDrinks&&r.a.createElement(N,{tag:"DRINKS",color:c})))))}}]),t}(n.Component)),D=function(e){var t=e.dateStamp;return r.a.createElement("div",{className:"date_header"},t.toUpperCase())},C=function(e){return e.events.map(function(e,t){if(e.showEvent)return r.a.createElement(_,{key:t,event:e})})},z=function(e){var t=e.events;return r.a.createElement("div",null,console.log(t[0]),r.a.createElement(D,{dateStamp:t[0].dateStamp}),r.a.createElement("div",{className:"event_parent max_width"},r.a.createElement(C,{events:t,className:"max_width"})))},T=function(e){for(var t=e.eventsByDate,a=Object.keys(t),n=[],o=0;o<a.length;o++){var i=a[o];t[i].some(function(e){return 1==e.showEvent})&&n.push(i)}return t=t||[],r.a.createElement("div",null,n.map(function(e,a){return r.a.createElement(z,{key:a,events:t[e]})}))},F=(a(72),function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"intro-bar typewriter"},"Networking Opportunity.  Tech Conversation \xa0",r.a.createElement("img",{alt:"",src:"https://res.cloudinary.com/dlpclqzwk/image/upload/c_scale,h_40/v1541614769/heartEyes_p55hqc.png"}),"\xa0 Free Catered Dinner \xa0",r.a.createElement("img",{alt:"",src:"https://res.cloudinary.com/dlpclqzwk/image/upload/c_scale,h_40/v1541614769/heartEyes_p55hqc.png"}))}}]),t}(n.Component)),R=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"mobile-intro"},"TECH MEETUP SF \xa0",r.a.createElement("img",{alt:"",src:"https://res.cloudinary.com/dlpclqzwk/image/upload/c_scale,h_40/v1541614769/heartEyes_p55hqc.png"}))}}]),t}(n.Component),B=a(28),L=a(83),M=a.n(L),P=a(49),W=a.n(P),q=a(24),I=a.n(q),U=(a(214),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={value:0},a.handleFoodChange=function(e,t){},a.handleFoodChange=function(e,t){},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state.value;return r.a.createElement("div",{className:e.root},r.a.createElement(M.a,{position:"static",primary:!0,className:e.appBar},r.a.createElement("div",{className:"left-logo"},r.a.createElement("div",{className:e.logo}," TECH MEETUP SF "),r.a.createElement(W.a,{value:t,onChange:this.handleRsvpChange},r.a.createElement(I.a,{className:e.filterText,label:"0-30 RSVPs"}),r.a.createElement(I.a,{className:e.filterText,label:"Only 30+ RSVPs"}))),r.a.createElement(W.a,{className:e.rightLogo,value:t,onChange:this.handleFoodChange},r.a.createElement(I.a,{className:e.filterText,label:"Include No Food"}),r.a.createElement(I.a,{className:e.filterText,label:"Catered Dinner"}),r.a.createElement(I.a,{className:e.filterText,label:"Any Food"}))))}}]),t}(r.a.Component)),A=Object(x.withStyles)(function(e){var t;return{root:{backgroundColor:e.palette.background.paper,paddingBottom:"20px"},appBar:(t={flexDirection:"column",justifyContent:"space-between",paddingLeft:"20px"},Object(B.a)(t,e.breakpoints.up("sm"),{flexDirection:"row",paddingLeft:"0px"}),Object(B.a)(t,"padding","10px 0"),t),logo:Object(B.a)({fontFamily:"Roboto",fontWeight:"bold",fontStyle:"normal",fontSize:"22px",letterSpacing:"1px",padding:"10px 30px 0px 30px",display:"none"},e.breakpoints.up("lg"),{display:"block"}),filterText:{fontSize:"17px",fontWeight:"bold"},rightLogo:Object(B.a)({},e.breakpoints.up("lg"),{paddingRight:"200px"})}})(U),H=a(84),J=a.n(H),V=function(e){return!1},Z=["food","not pizza","dinner","not just pizza"],K=function(e){for(var t=0;t<Z.length;t++){var a=Z[t];if(e.description.includes(a))return!0}return!1},G=function(e){return e.description.includes("pizza")},Q=function(e){return e.description.includes("drink")},X=function(e){return e.yes_rsvp_count>30},Y=function(e){var t,a=new Date(e);return{dayofWeek:(t=a,t.toLocaleDateString([],{weekday:"long"}).toUpperCase()),MMDD:function(e){return e.toLocaleDateString([],{month:"2-digit",day:"2-digit"})}(a),timeStamp:function(e){return e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}(a),dateStamp:function(e){return e.toLocaleDateString([],{weekday:"long",month:"long",day:"2-digit"})}(a)}},$=Object(x.createMuiTheme)({palette:{primary:{main:"#1976d2"},secondary:{main:"#80deea"},drinks:"#80deea"}}),ee=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).componentDidMount=function(){d.a.get("https://api.meetup.com/2/open_events?key=".concat(h.API,"&photo-host=public&category=34&status=upcoming&page=30&zip=94102&radius=5&only=name,group.who,group.name,time,event_url,yes_rsvp_count,venue.name,description,venue.address_1,group.id"),{crossdomain:!0}).then(function(e){var t=function(e){var t=e.data.results,a={},n=!0,r=!1,o=void 0;try{for(var i,c=t[Symbol.iterator]();!(n=(i=c.next()).done);n=!0){var l=i.value,s=Y(l.time),u=s.MMDD,p=s.dayofWeek,m=s.timeStamp,d=s.dateStamp;l.dayofWeek=p,l.timeStamp=m,l.dateStamp=d,a[u]=a[u]||[],l.description=l.description.toLowerCase(),l.hasCateredDinner=V(l),l.hasFood=K(l),l.hasPizza=G(l),l.hasDrinks=Q(l),l.hasThirtyRsvp=X(l),l.showEvent=l.hasThirtyRsvp,a[u].push(l)}}catch(h){r=!0,o=h}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}return a}(e);a.setState({eventsByDate:t})})},a.state={eventsByDate:[]},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"sf_tech"},r.a.createElement(x.MuiThemeProvider,{theme:$},r.a.createElement(J.a,null),r.a.createElement(R,null),r.a.createElement(F,null),r.a.createElement(A,null),r.a.createElement(T,{eventsByDate:this.state.eventsByDate})))}}]),t}(n.Component);i.a.render(r.a.createElement(ee,null),document.getElementById("root"))},72:function(e,t,a){},77:function(e,t,a){e.exports=a.p+"static/media/env.d41d8cd9.bin"},85:function(e,t,a){e.exports=a(237)},90:function(e,t,a){},92:function(e,t,a){}},[[85,2,1]]]);
//# sourceMappingURL=main.f4fec5d4.chunk.js.map