(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{17:function(e,n,t){e.exports=t(40)},39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(15),c=t.n(u),o=t(16),i=t(2),l=function(e){return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:e.nameToSearch,onChange:e.handleSearch}))},m=function(e){return r.a.createElement("form",{onSubmit:e.handleSubmit},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleName})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumber})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.filteredPersons,t=e.handleDelete;return n.map((function(e){return r.a.createElement("div",{key:e.id}," ",e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return t(e.id)}}," delete "))}))},f=t(4),s=t.n(f),h="/api/persons",b=function(){return s.a.get(h).then((function(e){return e.data}))},p=function(e){return s.a.post(h,e).then((function(e){return e.data}))},v=function(e,n){return s.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return s.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},w=function(e){var n=e.message,t=e.styleName;return null===n?null:r.a.createElement("div",{className:t},n)},j=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),f=Object(i.a)(c,2),s=f[0],h=f[1],j=Object(a.useState)(""),O=Object(i.a)(j,2),S=O[0],N=O[1],g=Object(a.useState)(""),k=Object(i.a)(g,2),C=k[0],T=k[1],y=Object(a.useState)([]),D=Object(i.a)(y,2),P=D[0],J=D[1],L=Object(a.useState)(null),x=Object(i.a)(L,2),A=x[0],B=x[1],I=Object(a.useState)(!1),q=Object(i.a)(I,2),z=q[0],F=q[1];Object(a.useEffect)((function(){b().then((function(e){u(e),J(e)}))}),[]);var G={nameToSearch:C,handleSearch:function(e){var n=e.target.value,a=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));T(n),J(Object(o.a)(a))}},H={handleSubmit:function(e){if(e.preventDefault(),t.map((function(e){return e.name})).includes(s)){var n=window.confirm("".concat(s," is already added to phonebook, replace the old number with new a new one?")),a=t.find((function(e){return e.name===s})).id;n&&v(a,{name:s,number:S}).then((function(e){B("Changed ".concat(e.name,"'s number")),setTimeout((function(){B(null)}),5e3),u(t.map((function(n){return n.id!==a?n:e}))),J(t.map((function(n){return n.id!==a?n:e})))})).catch((function(e){B(e.response.data.error),setTimeout((function(){B(null)}),5e3),F(!0),u(t.filter((function(e){return e.id!==a}))),J(t.filter((function(e){return e.id!==a})))}))}else p({name:s,number:S}).then((function(e){B("Added ".concat(e.name)),setTimeout((function(){B(null)}),5e3),u(t.concat(e)),J(t.concat(e))})).catch((function(e){B(e.response.data.error),setTimeout((function(){B(null)}),5e3),F(!0)}));h(""),N("")},handleName:function(e){var n=e.target.value;h(n)},handleNumber:function(e){var n=e.target.value;N(n)},newName:s,newNumber:S};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:A,styleName:z?"error":"success"}),r.a.createElement(l,G),r.a.createElement("h2",null,"add a new"),r.a.createElement(m,H),r.a.createElement("h2",null,"Numbers"),r.a.createElement(d,{filteredPersons:P,handleDelete:function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("delete ".concat(n," ?"))&&E(e).then((function(a){B("removed ".concat(n)),setTimeout((function(){B(null)}),5e3),F(!0),u(t.filter((function(n){return n.id!==e})))}))}}))};t(39);c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.4c4d38ed.chunk.js.map