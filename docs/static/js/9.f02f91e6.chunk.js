(window["webpackJsonpb1-test"]=window["webpackJsonpb1-test"]||[]).push([[9],{106:function(e,a,t){"use strict";var n=t(53),r=t(237),l=t(0),c=t.n(l),o=t(34),i=t(10);a.a=function(e){var a=e.to,t=e.children,l=Object(n.a)(e,["to","children"]),u=c.a.useMemo((function(){return c.a.forwardRef((function(e,t){return c.a.createElement(o.b,Object.assign({to:Object(i.j)(a)},e,{innerRef:t}))}))}),[a]);return c.a.createElement(r.a,Object.assign({component:u},l),t)}},115:function(e,a,t){"use strict";var n;t.d(a,"b",(function(){return l})),t.d(a,"c",(function(){return c})),t.d(a,"a",(function(){return i})),function(e){e.Mainnet="MAINNET",e.Testnet="TESTNET"}(n||(n={}));var r=[{id:"aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",name:"EOS Mainnet",env:n.Mainnet,url:new URL("https://api.eosnewyork.io"),logo:"eos.jpg"},{id:"4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",name:"Telos Mainnet",env:n.Mainnet,url:new URL("https://api.tlos.goodblock.io"),logo:"telos.png"},{id:"73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f",name:"Worbli Mainnet",env:n.Mainnet,url:new URL("https://api.worbli.io"),logo:"worbli.jpg"},{id:"1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",name:"WAX Mainnet",env:n.Mainnet,url:new URL("https://wax.greymass.com"),logo:"wax.png"},{id:"d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86",name:"BOS Mainnet",env:n.Mainnet,url:new URL("https://api.bossweden.org"),logo:"bos.png"},{id:"cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422",name:"MEET.ONE Mainnet",env:n.Mainnet,url:new URL("https://fullnode.meet.one"),logo:"meetone.png"},{id:"e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",name:"Jungle Testnet",env:n.Testnet,url:new URL("https://api.jungle.alohaeos.com"),logo:"jungle.png"},{id:"5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",name:"Kylin Testnet",env:n.Testnet,url:new URL("https://kylin.eossweden.org"),logo:"kylin.webp"},{id:"1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f",name:"Telos Testnet",env:n.Testnet,url:new URL("https://testnet.eos.miami"),logo:"telos.png"},{id:"0fea517bbfb5b51c564b5c59bcf7f02cf934cfff895f59d0d5cd7079c06fd978",name:"Lynx Testnet",env:n.Testnet,url:new URL("https://lynxtestnet.greymass.com"),logo:"lynx.jpg"},{id:"33cc2426f1b258ef8c798c34c0360b31732ea27a2d7e35a65797850a86d1ba85",name:"BOS Testnet",env:n.Testnet,url:new URL("https://bos-test.eospacex.com"),logo:"bos.png"},{id:"7136e3e32a458bb99cf6973ab5055869d25830607b9e78593769e1be52fb6f20",name:"MEET.ONE Testnet",env:n.Testnet,url:new URL("https://sidechain-test-history.meet.one"),logo:"meetone.png"}],l=r.filter((function(e){return e.env===n.Mainnet})),c=r.filter((function(e){return e.env===n.Testnet})),o=(r.reduce((function(e,a){return e[a.id]=a,e}),{}),r.reduce((function(e,a){return e[a.url.hostname]=a,e}),{}));function i(e){return o[e]}},130:function(e,a,t){"use strict";var n=t(98),r=t(236),l=t(99),c=t(103),o=t(235),i=t(142),u=t.n(i),m=t(0),s=t.n(m),E=t(106),f=t(10);a.a=function(e){var a=e.message;return s.a.createElement(n.a,{in:!0},s.a.createElement(r.a,{maxWidth:"md"},s.a.createElement(l.a,{container:!0,justify:"center",spacing:4,direction:"column"},s.a.createElement(l.a,{item:!0},s.a.createElement(c.a,{pt:6},s.a.createElement(o.a,{variant:"h4",align:"center",color:"error"},a))),s.a.createElement(l.a,{item:!0},s.a.createElement(o.a,{align:"center"},s.a.createElement(u.a,{style:{fontSize:250},color:"error"}))),s.a.createElement(l.a,{item:!0},s.a.createElement(o.a,{align:"center"},s.a.createElement(E.a,{to:Object(f.l)()},"Back to the home page"))))))}},131:function(e,a,t){"use strict";var n=t(99),r=t(0),l=t.n(r);a.a=function(e){var a=e.children;return l.a.createElement(n.a,{container:!0,spacing:2},a)}},132:function(e,a,t){"use strict";var n=t(98),r=t(236),l=t(0),c=t.n(l);a.a=function(e){var a=e.children;return c.a.createElement(n.a,{in:!0},c.a.createElement(r.a,{maxWidth:"md"},a))}},136:function(e,a,t){"use strict";var n=t(235),r=t(103),l=t(525),c=t(99),o=t(0),i=t.n(o),u=t(115),m=t(497),s=function(e){var a=e.url,t=e.preset,l=t?t.name:"Unknown Chain",o=t?i.a.createElement(m.a,{src:"/".concat(t.logo),style:{width:60,height:60}}):i.a.createElement(i.a.Fragment,null);return i.a.createElement(c.a,{container:!0,justify:"center",alignItems:"center"},i.a.createElement(c.a,{item:!0},i.a.createElement(r.a,{pr:2},o)),i.a.createElement(c.a,{item:!0},i.a.createElement(n.a,{variant:"h5"},l),i.a.createElement(n.a,{variant:"subtitle1",color:"textSecondary"},a.host)))},E=t(106),f=t(10);a.a=function(e){var a=e.url,t=e.crumb,o=e.children,m=u.a(a.host),d=m?m.name:"Unknown Chain";return i.a.createElement(c.a,{container:!0,spacing:2},i.a.createElement(c.a,{item:!0},i.a.createElement(r.a,{pt:2},i.a.createElement(l.a,null,i.a.createElement(E.a,{to:Object(f.l)()},"Home"),i.a.createElement(E.a,{to:Object(f.i)(a.host)},d),i.a.createElement(n.a,null,t)))),i.a.createElement(c.a,{item:!0,xs:12,container:!0,justify:"space-between",alignItems:"center"},i.a.createElement(c.a,{item:!0},i.a.createElement(s,{url:a,preset:m})),i.a.createElement(c.a,{item:!0},o)))}},158:function(e,a,t){"use strict";var n=t(528),r=t(509),l=t(510),c=t(235),o=t(483),i=t(499),u=t(511),m=t(512),s=t(513),E=t(201),f=t.n(E),d=t(0),b=t.n(d),g=t(5),h=t(106),v=t(10),p=function(e){e.url;var a=e.transaction,t=g.h(a),i=a.trx,u=g.i(i)?"N/A":i.transaction.expiration,m=b.a.createElement(n.a,{size:"small",label:a.status,avatar:"executed"===a.status?b.a.createElement(f.a,null):b.a.createElement(b.a.Fragment,null)});return b.a.createElement(r.a,null,b.a.createElement(l.a,null,b.a.createElement(h.a,{to:Object(v.l)()},b.a.createElement(c.a,{noWrap:!0,style:{maxWidth:150},variant:"body2",color:"inherit"},t))),b.a.createElement(l.a,null,u),b.a.createElement(o.a,{smDown:!0},b.a.createElement(l.a,{align:"center"},m)),b.a.createElement(o.a,{xsDown:!0},b.a.createElement(l.a,{align:"right"},a.cpu_usage_us.toLocaleString()," \u03bcs"),b.a.createElement(l.a,{align:"right"},a.net_usage_words.toLocaleString()," bytes")),b.a.createElement(o.a,{smDown:!0},b.a.createElement(l.a,{align:"right"},g.g(a))))};a.a=function(e){var a=e.url,t=e.transactions.map((function(e){var t=g.h(e);return b.a.createElement(p,{key:t,url:a,transaction:e})}));return b.a.createElement(i.a,null,b.a.createElement(u.a,{stickyHeader:!0},b.a.createElement(m.a,null,b.a.createElement(r.a,null,b.a.createElement(l.a,null,"Transaction ID"),b.a.createElement(l.a,null,"Expiration"),b.a.createElement(o.a,{smDown:!0},b.a.createElement(l.a,{align:"center"},"Status")),b.a.createElement(o.a,{xsDown:!0},b.a.createElement(l.a,{align:"right"},"CPU Usage"),b.a.createElement(l.a,{align:"right"},"Net Usage")),b.a.createElement(o.a,{smDown:!0},b.a.createElement(l.a,{align:"right"},"Actions")))),b.a.createElement(s.a,null,t)))}},185:function(e,a,t){"use strict";var n=t(152),r=t(527),l=t(503),c=t(523),o=t(504),i=t(505),u=t(506),m=t(507),s=t(508),E=t(235),f=t(483),d=t(509),b=t(510),g=t(499),h=t(511),v=t(512),p=t(513),w=t(199),k=t.n(w),y=t(0),x=t.n(y),T=t(5),j=t(52),D=t(106),O=t(189),M=t.n(O),L=t(198),S=t.n(L),B=new M.a,U=function(e){var a=e.text,t=e.data,n=S.a.render(B.render(a),t);return x.a.createElement(E.a,{component:"div",dangerouslySetInnerHTML:{__html:n}})},C=t(10),R=function(e){var a,t=e.url,E=e.action,f=x.a.useState(!1),d=Object(n.a)(f,2),b=d[0],g=d[1],h=x.a.useCallback((function(){return g(!0)}),[g]),v=x.a.useCallback((function(){return g(!1)}),[g]),p=j.useSelector(j.getSelectedAccount),w=p&&p.name===E.account,y=j.useDispatch();if(x.a.useEffect((function(){b&&!w&&y(j.createSelectAccount(t,E.account))}),[t,E.account,w,y,b]),p&&p.abi)if(T.j(p.abi))a="Error fetching ABI";else if(p.abi.data.abi)for(var D=p.abi.data.abi,O=D.actions.length;O--;){var M=D.actions[O];if(M.name===E.name){a=M.ricardian_contract?x.a.createElement(U,{text:M.ricardian_contract,data:E.data}):"No ricardian contract";break}}else a="Not a smart contract";else a="Loading";return x.a.createElement(x.a.Fragment,null,x.a.createElement(r.a,{title:"View ricardian contract",placement:"top-end"},x.a.createElement(l.a,{size:"small",onClick:h},x.a.createElement(k.a,null))),x.a.createElement(c.a,{open:b,onClose:v,"aria-labelledby":"scroll-dialog-title"},x.a.createElement(o.a,{id:"scroll-dialog-title"},E.account," / ",E.name),x.a.createElement(i.a,{dividers:!0},x.a.createElement(u.a,{component:"div"},a)),x.a.createElement(m.a,null,x.a.createElement(s.a,{onClick:v,color:"primary"},"Close"))))},W=function(e){var a=e.url,t=e.action,n=t.authorization.map((function(e){var a=e.actor+e.permission;return x.a.createElement(E.a,{noWrap:!0,key:a,variant:"body2"},e.actor,x.a.createElement(f.a,{smDown:!0}," @ ",e.permission))}));return x.a.createElement(d.a,null,x.a.createElement(f.a,{xsDown:!0},x.a.createElement(b.a,null,x.a.createElement(E.a,{noWrap:!0,style:{maxWidth:100},variant:"body2",color:"inherit"},t.id))),x.a.createElement(b.a,null,x.a.createElement(D.a,{to:Object(C.g)(a.host,t.account)},t.account)),x.a.createElement(b.a,null,x.a.createElement(D.a,{to:Object(C.g)(a.host,t.account,t.name)},t.name)),x.a.createElement(f.a,{xsDown:!0},x.a.createElement(b.a,null,n)),x.a.createElement(f.a,{smDown:!0},x.a.createElement(b.a,null,x.a.createElement(E.a,{noWrap:!0,variant:"body2",style:{maxWidth:150}},JSON.stringify(t.data)))),x.a.createElement(b.a,null,x.a.createElement(R,{url:a,action:t})))};a.a=function(e){var a=e.url,t=e.actions.map((function(e){var t="".concat(e.id,"-").concat(e.account,"-").concat(e.name,"-").concat(e.hex_data);return x.a.createElement(W,{key:t,url:a,action:e})}));return x.a.createElement(g.a,null,x.a.createElement(h.a,{stickyHeader:!0},x.a.createElement(v.a,null,x.a.createElement(d.a,null,x.a.createElement(f.a,{xsDown:!0},x.a.createElement(b.a,null,"Transaction ID")),x.a.createElement(b.a,null,"Contract"),x.a.createElement(b.a,null,"Action"),x.a.createElement(f.a,{xsDown:!0},x.a.createElement(b.a,null,"Authorization")),x.a.createElement(f.a,{smDown:!0},x.a.createElement(b.a,null,"Data")),x.a.createElement(b.a,null))),x.a.createElement(p.a,null,t)))}},294:function(e,a,t){"use strict";var n=t(109);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(t(0)),l=(0,n(t(113)).default)(r.default.createElement("path",{d:"M6 19h4V5H6v14zm8-14v14h4V5h-4z"}),"Pause");a.default=l},295:function(e,a,t){"use strict";var n=t(109);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(t(0)),l=(0,n(t(113)).default)(r.default.createElement("path",{d:"M8 5v14l11-7z"}),"PlayArrow");a.default=l},529:function(e,a,t){"use strict";t.r(a);var n=t(152),r=t(508),l=t(99),c=t(499),o=t(103),i=t(235),u=t(522),m=t(515),s=t(483),E=t(294),f=t.n(E),d=t(295),b=t.n(d),g=t(0),h=t.n(g),v=t(5),p=t(52),w=t(185),k=t(509),y=t(510),x=t(511),T=t(512),j=t(513),D=t(514),O=t(106),M=t(10),L=function(e){var a,t,n,r,l=e.block,c=e.url,o=l.result,u=Object(M.h)(c.host,l.num);if(o&&v.k(o)){var m=o.data;a=m.producer,t=v.f(m).toLocaleString(),n=m.timestamp,r=m.id}else a=h.a.createElement(D.a,null),t=h.a.createElement(D.a,null),n=h.a.createElement(D.a,null),r=h.a.createElement(D.a,null);return h.a.createElement(k.a,null,h.a.createElement(y.a,{component:"th",scope:"row"},h.a.createElement(O.a,{to:u},l.num.toLocaleString())),h.a.createElement(s.a,{smDown:!0},h.a.createElement(y.a,{align:"right"},h.a.createElement(O.a,{to:u},h.a.createElement(i.a,{variant:"body2",noWrap:!0,style:{maxWidth:250}},r)))),h.a.createElement(y.a,{align:"center"},a),h.a.createElement(y.a,{align:"right"},t),h.a.createElement(s.a,{xsDown:!0},h.a.createElement(y.a,{align:"right"},n)))},S=function(e){var a=e.url,t=e.blocks.map((function(e){return h.a.createElement(L,{key:e.num,block:e,url:a})}));return h.a.createElement(c.a,null,h.a.createElement(x.a,{stickyHeader:!0},h.a.createElement(T.a,null,h.a.createElement(k.a,null,h.a.createElement(y.a,null,"Block #"),h.a.createElement(s.a,{smDown:!0},h.a.createElement(y.a,null,"Block Id")),h.a.createElement(y.a,{align:"center"},"Producer"),h.a.createElement(y.a,{align:"right"},"Actions"),h.a.createElement(s.a,{xsDown:!0},h.a.createElement(y.a,{align:"right"},"Timestamp")))),h.a.createElement(j.a,null,t)))},B=t(130),U=t(131),C=t(136),R=t(132),W=t(158),A=function(e){var a=e.url,t=p.useDispatch(),n=p.useSelector(p.getIsPlaying),l=Object(g.useCallback)((function(){t(n?p.createPauseBlocks():p.createPlayBlocks(a))}),[t,a,n]),c=n?h.a.createElement(f.a,null):h.a.createElement(b.a,null),o=n?"Pause":"Play";return h.a.createElement(r.a,{variant:"contained",endIcon:c,onClick:l,color:"primary",size:"large"},o)},P=20;var _=function(e){var a=e.url,t=e.tab,n=p.useSelector(p.getChainState);if(!n)return h.a.createElement(h.a.Fragment,null,"Loading");if(!v.k(n))return h.a.createElement(l.a,{item:!0,xs:12},h.a.createElement(c.a,null,h.a.createElement(o.a,{p:10},h.a.createElement(i.a,{variant:"body2",color:"error",align:"center"},"Error fetching chain info"))));switch(t){case M.b.Transactions:var r=function(e){for(var a=[],t=0,n=e.latestBlocks.length;t<n;t++){var r=e.latestBlocks[t];if(r&&r.result&&v.k(r.result)){var l=P-a.length;if((a=a.concat(r.result.data.transactions.slice(0,l))).length>=P)break}}return a}(n.data);return h.a.createElement(W.a,{url:a,transactions:r});case M.b.Actions:var u=function(e){for(var a=[],t=0,n=e.latestBlocks.length;t<n;t++){var r=e.latestBlocks[t];if(r&&r.result&&v.k(r.result))for(var l=r.result.data,c=0,o=l.transactions.length;c<o;c++){var i=l.transactions[c],u=P-a.length;if((a=a.concat(v.c(i).slice(0,u))).length>=P)break}}return a}(n.data);return h.a.createElement(w.a,{url:a,actions:u});case M.b.Blocks:default:return h.a.createElement(S,{url:a,blocks:n.data.latestBlocks})}},I=function(e){var a=e.url,t=h.a.useState(M.b.Blocks),r=Object(n.a)(t,2),o=r[0],i=r[1],s=Object(g.useCallback)((function(e,a){i(a)}),[i]);return h.a.createElement(h.a.Fragment,null,h.a.createElement(l.a,{item:!0,xs:12},h.a.createElement(c.a,null,h.a.createElement(u.a,{value:o,onChange:s,variant:"fullWidth"},h.a.createElement(m.a,{label:"Blocks"}),h.a.createElement(m.a,{label:"Actions"}),h.a.createElement(m.a,{label:"Transactions"})))),h.a.createElement(l.a,{item:!0,xs:12},h.a.createElement(_,{url:a,tab:o})))};a.default=function(e){var a,t=e.match;try{a=new URL("https://".concat(t.params.host))}catch(l){}var n=p.useDispatch();if(Object(g.useEffect)((function(){return a&&n(p.createPlayBlocks(a)),function(){n(p.createPauseBlocks())}}),[n,a]),!a)return h.a.createElement(B.a,{message:"Invalid Host"});var r=h.a.createElement(h.a.Fragment,null,"Live ",h.a.createElement(s.a,{xsDown:!0},"Transactions"));return h.a.createElement(R.a,null,h.a.createElement(C.a,{url:a,crumb:r},h.a.createElement(A,{url:a})),h.a.createElement(U.a,null,h.a.createElement(I,{url:a})))}}}]);
//# sourceMappingURL=9.f02f91e6.chunk.js.map