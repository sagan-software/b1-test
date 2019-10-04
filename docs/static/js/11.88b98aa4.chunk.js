(window["webpackJsonpb1-test"]=window["webpackJsonpb1-test"]||[]).push([[11],{106:function(e,a,t){"use strict";var n=t(53),c=t(237),r=t(0),l=t.n(r),o=t(34),i=t(10);a.a=function(e){var a=e.to,t=e.children,r=Object(n.a)(e,["to","children"]),s=l.a.useMemo((function(){return l.a.forwardRef((function(e,t){return l.a.createElement(o.b,Object.assign({to:Object(i.j)(a)},e,{innerRef:t}))}))}),[a]);return l.a.createElement(c.a,Object.assign({component:s},r),t)}},115:function(e,a,t){"use strict";var n;t.d(a,"b",(function(){return r})),t.d(a,"c",(function(){return l})),t.d(a,"a",(function(){return i})),function(e){e.Mainnet="MAINNET",e.Testnet="TESTNET"}(n||(n={}));var c=[{id:"aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",name:"EOS Mainnet",env:n.Mainnet,url:new URL("https://api.eosnewyork.io"),logo:"eos.jpg"},{id:"4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",name:"Telos Mainnet",env:n.Mainnet,url:new URL("https://api.tlos.goodblock.io"),logo:"telos.png"},{id:"73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f",name:"Worbli Mainnet",env:n.Mainnet,url:new URL("https://api.worbli.io"),logo:"worbli.jpg"},{id:"1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",name:"WAX Mainnet",env:n.Mainnet,url:new URL("https://wax.greymass.com"),logo:"wax.png"},{id:"d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86",name:"BOS Mainnet",env:n.Mainnet,url:new URL("https://api.bossweden.org"),logo:"bos.png"},{id:"cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422",name:"MEET.ONE Mainnet",env:n.Mainnet,url:new URL("https://fullnode.meet.one"),logo:"meetone.png"},{id:"e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",name:"Jungle Testnet",env:n.Testnet,url:new URL("https://api.jungle.alohaeos.com"),logo:"jungle.png"},{id:"5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",name:"Kylin Testnet",env:n.Testnet,url:new URL("https://kylin.eossweden.org"),logo:"kylin.webp"},{id:"1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f",name:"Telos Testnet",env:n.Testnet,url:new URL("https://testnet.eos.miami"),logo:"telos.png"},{id:"0fea517bbfb5b51c564b5c59bcf7f02cf934cfff895f59d0d5cd7079c06fd978",name:"Lynx Testnet",env:n.Testnet,url:new URL("https://lynxtestnet.greymass.com"),logo:"lynx.jpg"},{id:"33cc2426f1b258ef8c798c34c0360b31732ea27a2d7e35a65797850a86d1ba85",name:"BOS Testnet",env:n.Testnet,url:new URL("https://bos-test.eospacex.com"),logo:"bos.png"},{id:"7136e3e32a458bb99cf6973ab5055869d25830607b9e78593769e1be52fb6f20",name:"MEET.ONE Testnet",env:n.Testnet,url:new URL("https://sidechain-test-history.meet.one"),logo:"meetone.png"}],r=c.filter((function(e){return e.env===n.Mainnet})),l=c.filter((function(e){return e.env===n.Testnet})),o=(c.reduce((function(e,a){return e[a.id]=a,e}),{}),c.reduce((function(e,a){return e[a.url.hostname]=a,e}),{}));function i(e){return o[e]}},130:function(e,a,t){"use strict";var n=t(98),c=t(236),r=t(99),l=t(103),o=t(235),i=t(142),s=t.n(i),m=t(0),u=t.n(m),f=t(106),d=t(10);a.a=function(e){var a=e.message;return u.a.createElement(n.a,{in:!0},u.a.createElement(c.a,{maxWidth:"md"},u.a.createElement(r.a,{container:!0,justify:"center",spacing:4,direction:"column"},u.a.createElement(r.a,{item:!0},u.a.createElement(l.a,{pt:6},u.a.createElement(o.a,{variant:"h4",align:"center",color:"error"},a))),u.a.createElement(r.a,{item:!0},u.a.createElement(o.a,{align:"center"},u.a.createElement(s.a,{style:{fontSize:250},color:"error"}))),u.a.createElement(r.a,{item:!0},u.a.createElement(o.a,{align:"center"},u.a.createElement(f.a,{to:Object(d.l)()},"Back to the home page"))))))}},131:function(e,a,t){"use strict";var n=t(99),c=t(0),r=t.n(c);a.a=function(e){var a=e.children;return r.a.createElement(n.a,{container:!0,spacing:2},a)}},132:function(e,a,t){"use strict";var n=t(98),c=t(236),r=t(0),l=t.n(r);a.a=function(e){var a=e.children;return l.a.createElement(n.a,{in:!0},l.a.createElement(c.a,{maxWidth:"md"},a))}},136:function(e,a,t){"use strict";var n=t(235),c=t(103),r=t(525),l=t(99),o=t(0),i=t.n(o),s=t(115),m=t(497),u=function(e){var a=e.url,t=e.preset,r=t?t.name:"Unknown Chain",o=t?i.a.createElement(m.a,{src:"/".concat(t.logo),style:{width:60,height:60}}):i.a.createElement(i.a.Fragment,null);return i.a.createElement(l.a,{container:!0,justify:"center",alignItems:"center"},i.a.createElement(l.a,{item:!0},i.a.createElement(c.a,{pr:2},o)),i.a.createElement(l.a,{item:!0},i.a.createElement(n.a,{variant:"h5"},r),i.a.createElement(n.a,{variant:"subtitle1",color:"textSecondary"},a.host)))},f=t(106),d=t(10);a.a=function(e){var a=e.url,t=e.crumb,o=e.children,m=s.a(a.host),b=m?m.name:"Unknown Chain";return i.a.createElement(l.a,{container:!0,spacing:2},i.a.createElement(l.a,{item:!0},i.a.createElement(c.a,{pt:2},i.a.createElement(r.a,null,i.a.createElement(f.a,{to:Object(d.l)()},"Home"),i.a.createElement(f.a,{to:Object(d.i)(a.host)},b),i.a.createElement(n.a,null,t)))),i.a.createElement(l.a,{item:!0,xs:12,container:!0,justify:"space-between",alignItems:"center"},i.a.createElement(l.a,{item:!0},i.a.createElement(u,{url:a,preset:m})),i.a.createElement(l.a,{item:!0},o)))}},517:function(e,a,t){"use strict";t.r(a);var n=t(235),c=t(103),r=t(526),l=t(518),o=t(528),i=t(519),s=t(99),m=t(499),u=t(481),f=t.n(u),d=t(0),b=t.n(d),E=t(401),h=t.n(E),p=t(5),g=t(52),v=t(130),w=t(131),y=t(136),T=t(132),M=t(10),j=function(e){var a=e.label,t=e.title,s=e.body,m=e.color,u=e.hash,d=s?b.a.createElement(n.a,{component:"div"},b.a.createElement(h.a,{source:s,escapeHtml:!0})):b.a.createElement(c.a,{py:2,style:{width:"100%"}},b.a.createElement(n.a,{variant:"body2",align:"center",color:"textSecondary"},"No ricardian contract")),E=Object(M.m)(t);return b.a.createElement(r.a,{defaultExpanded:u==="#"+E,id:E},b.a.createElement(l.a,{expandIcon:b.a.createElement(f.a,null),"aria-controls":"".concat(E,"-content"),id:"".concat(E,"-header")},b.a.createElement(c.a,{pr:1},b.a.createElement(o.a,{size:"small",label:a,color:m})),b.a.createElement(n.a,null,t)),b.a.createElement(i.a,null,d))},x=function(e){var a=e.action,t=e.hash;return b.a.createElement(j,{label:"Action",title:a.name,body:a.ricardian_contract,color:"primary",hash:t})},L=function(e){var a=e.actions,t=e.hash,n=a.map((function(e){return b.a.createElement(x,{key:e.name,action:e,hash:t})}));return b.a.createElement(b.a.Fragment,null,n)},R=function(e){var a=e.clause,t=e.hash;return b.a.createElement(j,{label:"Clause",title:a.id,body:a.body,color:"secondary",hash:t})},U=function(e){var a=e.clauses,t=e.hash,n=a.map((function(e){return b.a.createElement(R,{key:e.id,clause:e,hash:t})}));return b.a.createElement(b.a.Fragment,null,n)},O=function(e){var a=e.hash,t=g.useSelector(g.getSelectedAccount);if(t&&t.abi){if(p.k(t.abi)){var r=t.abi.data;return r.abi?b.a.createElement(s.a,{container:!0,item:!0,direction:"column",xs:12},b.a.createElement(L,{actions:r.abi.actions,hash:a}),b.a.createElement(U,{clauses:r.abi.ricardian_clauses,hash:a})):b.a.createElement(s.a,{item:!0,xs:12},b.a.createElement(m.a,null,b.a.createElement(c.a,{p:10},b.a.createElement(n.a,{variant:"body2",color:"textSecondary",align:"center"},"Not a contract. Basic account information could be placed here."))))}return b.a.createElement(b.a.Fragment,null,"Error")}return b.a.createElement(b.a.Fragment,null,"Loading")};a.default=function(e){var a,t=e.match,r=e.location;try{a=new URL("https://".concat(t.params.host))}catch(o){}var l=g.useDispatch();return b.a.useEffect((function(){a&&l(g.createSelectAccount(a,t.params.account))}),[l,a,t.params.account]),a?b.a.createElement(T.a,null,b.a.createElement(y.a,{url:a,crumb:t.params.account},b.a.createElement(c.a,{p:1},b.a.createElement(n.a,{variant:"h3",align:"right"},t.params.account))),b.a.createElement(w.a,null,b.a.createElement(O,{hash:r.hash}))):b.a.createElement(v.a,{message:"Invalid Hostname"})}}}]);
//# sourceMappingURL=11.88b98aa4.chunk.js.map