(this.webpackJsonpfront_react=this.webpackJsonpfront_react||[]).push([[0],{120:function(e,a,t){},121:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(25),c=t.n(r),o=t(12),m=(t(92),t(68),t(63)),s=t(10),i=t(33),u=t.n(i),E=t(136),p=t(132);function d(){var e=Object(n.useState)("vlad@gmail.com"),a=Object(o.a)(e,2),t=a[0],r=a[1],c=Object(n.useState)("ABCD@1234"),m=Object(o.a)(c,2),s=m[0],i=m[1],d=Object(n.useContext)(w);return l.a.createElement(E.a,null,l.a.createElement(E.a.Group,{className:"mb-3",controlId:"formBasicEmail"},l.a.createElement(E.a.Label,null,"Email address"),l.a.createElement(E.a.Control,{type:"email",placeholder:"Enter email",value:t,onChange:function(e){return r(e.target.value)}}),l.a.createElement(E.a.Text,{className:"text-muted"},"We'll never share your email with anyone else.")),l.a.createElement(E.a.Group,{className:"mb-3",controlId:"formBasicPassword"},l.a.createElement(E.a.Label,null,"Password"),l.a.createElement(E.a.Control,{type:"password",placeholder:"Password",value:s,onChange:function(e){return i(e.target.value)}})),l.a.createElement(E.a.Group,{className:"mb-3",controlId:"formBasicCheckbox"},l.a.createElement(E.a.Check,{type:"checkbox",label:"Check me out"})),l.a.createElement(p.a,{variant:"primary",onClick:function(){console.log({identifier:t,pass:s}),u.a.post("http://localhost:1337/auth/local",{identifier:t,password:s}).then((function(e){var a=e.data;localStorage.setItem("UserData",JSON.stringify(a)),d.setUserData(a)}))}},"Submit"))}t(114);var f=t(134),b=t(133),h=t(135);function v(e){var a,t=Object(n.useContext)(w);return l.a.createElement(f.a,{bg:"light",expand:"lg"},l.a.createElement(b.a,null,l.a.createElement(f.a.Brand,{href:"/"},"Serwis samochodowy"),l.a.createElement(f.a.Toggle,{"aria-controls":"basic-navbar-nav"}),l.a.createElement(f.a.Collapse,{id:"basic-navbar-nav"},l.a.createElement(h.a,{className:"me-auto"},l.a.createElement(h.a.Link,{href:"/"},"Home")),(null===(a=t.userData)||void 0===a?void 0:a.user.confirmed)?l.a.createElement(h.a,null,l.a.createElement(h.a.Link,{onClick:function(){localStorage.clear(),t.setUserData()}},"Exit")):l.a.createElement(h.a,null,l.a.createElement(h.a.Link,{href:"/login"},"Login"),l.a.createElement(h.a.Link,{href:"/register"},"Register")))))}var g=t(53);function C(){return l.a.createElement(E.a,null,l.a.createElement("h3",null,"Sign Up"),l.a.createElement(g.a,{className:"mb-3"},l.a.createElement(E.a.Label,null,"Name"),l.a.createElement(E.a.Control,{type:"text"})),l.a.createElement(g.a,{className:"mb-3"},l.a.createElement(E.a.Label,null,"Email"),l.a.createElement(E.a.Control,{type:"email"})),l.a.createElement(g.a,{className:"mb-3"},l.a.createElement(E.a.Label,null,"Password"),l.a.createElement(E.a.Control,{type:"password"})),l.a.createElement(g.a,{className:"mb-3"},l.a.createElement(E.a.Label,null,"Repeat Password"),l.a.createElement(E.a.Control,{type:"password"})),l.a.createElement(p.a,{variant:"primary",type:"submit"},"Submit"))}var y=t(84),S=t(85);function k(){var e=Object(n.useState)([]),a=Object(o.a)(e,2),t=a[0],r=a[1];return Object(n.useEffect)((function(){u()("http://localhost:1337/posts").then((function(e){r(e.data)}))}),[]),l.a.createElement("div",null,t.map((function(e){return l.a.createElement(y.a,{children:e.forattedText,key:e.id,remarkPlugins:[S.a]})})))}var w=l.a.createContext({});var O=function(){var e=Object(n.useState)(),a=Object(o.a)(e,2),t=a[0],r=a[1],c={userData:t,setUserData:r};return Object(n.useEffect)((function(){var e=localStorage.getItem("UserData");if(null!=e){var a=JSON.parse(e);r(a)}}),[]),l.a.createElement("div",{className:"App"},l.a.createElement(w.Provider,{value:c},l.a.createElement(m.a,null,l.a.createElement(v,null),l.a.createElement(s.c,null,l.a.createElement(s.a,{path:"/",element:l.a.createElement(k,null)}),l.a.createElement(s.a,{path:"/login",element:l.a.createElement(d,null)}),l.a.createElement(s.a,{path:"/register",element:l.a.createElement(C,null)})))))},L=(t(120),function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,137)).then((function(a){var t=a.getCLS,n=a.getFID,l=a.getFCP,r=a.getLCP,c=a.getTTFB;t(e),n(e),l(e),r(e),c(e)}))});c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(O,null)),document.getElementById("root")),L()},87:function(e,a,t){e.exports=t(121)},92:function(e,a,t){}},[[87,1,2]]]);
//# sourceMappingURL=main.f304d656.chunk.js.map